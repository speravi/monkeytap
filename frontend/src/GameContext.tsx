import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { changeTheme } from "./utils/ThemeSwitcher";
import { calculateAverageCPM } from "./utils/CPMCalculator";
import { createGameHistoryRecord } from "./utils/gameUtils";
import {
  GameHistoryRecord,
  GameState,
  LayoutTypes,
  MouseButtonOption,
} from "./types/types";

type GameAction =
  | { type: "RESET_TO_DEFAULT" }
  // changing game states
  | { type: "START_GAME" }
  | { type: "END_GAME" }
  | { type: "RESET_GAME" }
  // changing config
  | { type: "SET_GRID_SIZE"; payload: number }
  | { type: "SET_GRID_TILE_GAP"; payload: number }
  | { type: "SET_ACTIVE_TILE_COUNT"; payload: number }
  | { type: "SET_LAYOUT_TYPE"; payload: LayoutTypes }
  | { type: "SET_GAME_MODE"; payload: "continuous" | "batch" }
  | { type: "SET_ACTIVE_THEME"; payload: string }
  | { type: "SET_GAPS_COUNT_AS_FAIL"; payload: boolean }
  | { type: "SET_GAME_OVER_ON_INACTIVE_CLICK"; payload: boolean }
  | { type: "SET_ALLOWED_MOUSE_BUTTON"; payload: MouseButtonOption }
  // sounds
  | { type: "SET_CLICK_SOUND"; payload: string }
  | { type: "SET_CLICK_SOUND_VOLUME"; payload: number }
  // timer
  | { type: "SET_TIMER_DURATION"; payload: number }
  | { type: "SET_TIME_LEFT"; payload: number }
  // handling scores
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_BEST_SCORE"; payload: number }
  | { type: "ADD_SCORE"; payload: number }
  | { type: "INCREMENT_MISSED_CLICKS" }
  // click tracking
  | { type: "RECORD_CLICK"; payload: number }
  // game history
  | { type: "SAVE_GAME_HISTORY"; payload: GameHistoryRecord }
  | { type: "CLEAR_GAME_HISTORY" };

const initialState: GameState = {
  // game states
  timerExpired: false,
  gameStarted: false,
  gameOver: false,
  // config
  gridSize: 4,
  gridTileGap: 3,
  activeTileCount: 3,
  layoutType: "grid",
  gameMode: "continuous",
  activeTheme: "serika_dark",
  gapsCountAsFail: false,
  gameOverOnInactiveClick: true,
  allowedMouseButton: "left",
  // sounds
  clickSound: "none",
  clickSoundVolume: 40,
  // timer
  timerDuration: 15,
  timeLeft: 15,
  // scores
  score: 0,
  bestScore: 0,
  avgCPM: 0,
  lastFiveScores: [],
  missedClicks: 0,
  // click tracking
  clickTimes: [],
  startTime: 0,
  endTime: 0,
  testDuration: 0,
  // game history
  gameHistory: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "RESET_TO_DEFAULT":
      changeTheme(initialState.activeTheme);
      return { ...initialState, bestScore: state.bestScore };
    // game state change
    case "RESET_GAME":
      return {
        ...state,
        timeLeft: state.timerDuration,
        score: 0,
        gameStarted: false,
        gameOver: false,
        timerExpired: false,
        clickTimes: [],
        startTime: 0,
        missedClicks: 0,
      };
    case "START_GAME":
      return { ...state, gameStarted: true, startTime: performance.now() };
    case "END_GAME":
      const endTime = performance.now();
      const testDuration = Math.floor((endTime - state.startTime) / 1000);
      // TODO: y not just pass state instead?
      const avgCPM = calculateAverageCPM(
        state.clickTimes,
        state.startTime,
        endTime,
        testDuration,
        state.timerDuration
      );
      // TODO: y not pass the whole state?
      const historyRecord = createGameHistoryRecord(
        state,
        avgCPM,
        testDuration
      );
      return {
        ...state,
        lastFiveScores: [...state.lastFiveScores, state.score].slice(-5),
        gameOver: true,
        avgCPM,
        endTime,
        testDuration,
        gameHistory: [historyRecord, ...state.gameHistory].slice(0, 50),
      };

    case "CLEAR_GAME_HISTORY":
      return { ...state, gameHistory: [] };

    // config change
    case "SET_GRID_SIZE":
      return { ...state, gridSize: action.payload };
    case "SET_GRID_TILE_GAP":
      return { ...state, gridTileGap: action.payload };
    case "SET_ACTIVE_TILE_COUNT":
      return { ...state, activeTileCount: action.payload };
    case "SET_LAYOUT_TYPE":
      return { ...state, layoutType: action.payload };
    case "SET_GAME_MODE":
      return { ...state, gameMode: action.payload };
    case "SET_ACTIVE_THEME":
      return { ...state, activeTheme: action.payload };
    case "SET_GAPS_COUNT_AS_FAIL":
      return { ...state, gapsCountAsFail: action.payload };
    case "SET_TIMER_DURATION":
      return {
        ...state,
        timerDuration: action.payload,
        timeLeft: action.payload,
      };
    case "SET_GAME_OVER_ON_INACTIVE_CLICK":
      return { ...state, gameOverOnInactiveClick: action.payload };
    case "SET_ALLOWED_MOUSE_BUTTON":
      return { ...state, allowedMouseButton: action.payload };
    // sounds
    case "SET_CLICK_SOUND":
      console.log("setting active sound theme");
      return { ...state, clickSound: action.payload };
    case "SET_CLICK_SOUND_VOLUME":
      const newVolume = Math.max(0, Math.min(100, action.payload));
      return { ...state, clickSoundVolume: newVolume };
    // timer & scores
    case "SET_TIME_LEFT":
      return { ...state, timeLeft: action.payload };

    case "SET_SCORE":
      return { ...state, score: action.payload };

    case "SET_BEST_SCORE":
      return { ...state, bestScore: action.payload };
    case "ADD_SCORE":
      const newScore = state.score + action.payload;
      const newBestScore = Math.max(state.bestScore, newScore);
      return {
        ...state,
        score: newScore,
        bestScore: newBestScore,
      };
    case "RECORD_CLICK":
      return {
        ...state,
        clickTimes: [...state.clickTimes, action.payload],
      };
    case "INCREMENT_MISSED_CLICKS":
      return { ...state, missedClicks: state.missedClicks + 1 };
    default:
      return state;
  }
}

const GameContext = createContext<
  | {
      state: GameState;
      dispatch: React.Dispatch<GameAction>;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    // Load initial state & history from localStorage
    const storedConfig = localStorage.getItem("gameConfig");
    const storedHistory = localStorage.getItem("gameHistory");
    const loadedState = storedConfig
      ? { ...initial, ...JSON.parse(storedConfig) }
      : initial;
    changeTheme(loadedState?.activeTheme);
    return {
      ...loadedState,
      gameHistory: storedHistory ? JSON.parse(storedHistory) : [],
    };
  });

  //TODO: me no likey this
  useEffect(() => {
    const { gameHistory, ...config } = state;
    localStorage.setItem("gameConfig", JSON.stringify(config));
  }, [
    state.gridSize,
    state.gridTileGap,
    state.activeTileCount,
    state.layoutType,
    state.gameMode,
    state.activeTheme,
    state.gapsCountAsFail,
    state.timerDuration,
    state.allowedMouseButton,
    state.clickSound,
    state.clickSoundVolume,
  ]);

  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(state.gameHistory));
  }, [state.gameHistory]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
