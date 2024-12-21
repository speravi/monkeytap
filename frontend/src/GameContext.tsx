import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { changeTheme } from "./utils/ThemeSwitcher";

export type LayoutTypes = "grid" | "rows" | "columns";

type GameState = {
  // game states
  gameStarted: boolean;
  gameOver: boolean;
  // config
  gridSize: number;
  gridTileGap: number;
  activeTileCount: number;
  layoutType: LayoutTypes;
  activeTheme: string;
  gapsCountAsFail: boolean;
  // timer
  timerDuration: number;
  timeLeft: number;
  timerExpired: boolean;
  // scores
  score: number;
  bestScore: number;
  lastFiveScores: number[];
};

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
  | { type: "SET_ACTIVE_THEME"; payload: string }
  | { type: "SET_GAPS_COUNT_AS_FAIL"; payload: boolean }
  // timer
  | { type: "SET_TIMER_DURATION"; payload: number }
  | { type: "SET_TIME_LEFT"; payload: number }
  // handling scores
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_BEST_SCORE"; payload: number }
  | { type: "ADD_SCORE"; payload: number };

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
  activeTheme: "",
  gapsCountAsFail: false,
  // timer
  timerDuration: 15,
  timeLeft: 15,
  // scores
  score: 0,
  bestScore: 0,
  lastFiveScores: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  const saveAndReturn = (newState: GameState) => {
    const {
      gameStarted,
      gameOver,
      timerExpired,
      timeLeft,
      score,
      lastFiveScores,
      ...config
    } = newState;
    localStorage.setItem("gameConfig", JSON.stringify(config));
    return newState;
  };

  switch (action.type) {
    case "RESET_TO_DEFAULT":
      changeTheme(initialState.activeTheme);
      return saveAndReturn({ ...initialState, bestScore: state.bestScore });
    // game state change
    case "RESET_GAME":
      return {
        ...state,
        timeLeft: state.timerDuration,
        score: 0,
        gameStarted: false,
        gameOver: false,
        timerExpired: false,
      };
    case "START_GAME":
      return { ...state, gameStarted: true };
    case "END_GAME":
      return {
        ...state,
        lastFiveScores: [...state.lastFiveScores, state.score].slice(-5),
        gameOver: true,
      };
    // config change
    case "SET_GRID_SIZE":
      return saveAndReturn({ ...state, gridSize: action.payload });
    case "SET_GRID_TILE_GAP":
      return saveAndReturn({ ...state, gridTileGap: action.payload });
    case "SET_ACTIVE_TILE_COUNT":
      return saveAndReturn({ ...state, activeTileCount: action.payload });
    case "SET_LAYOUT_TYPE":
      return saveAndReturn({ ...state, layoutType: action.payload });
    case "SET_ACTIVE_THEME":
      return saveAndReturn({ ...state, activeTheme: action.payload });
    case "SET_GAPS_COUNT_AS_FAIL":
      return saveAndReturn({ ...state, gapsCountAsFail: action.payload });
    case "SET_TIMER_DURATION":
      return saveAndReturn({
        ...state,
        timerDuration: action.payload,
        timeLeft: action.payload,
      });

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
    const stored = localStorage.getItem("gameConfig");
    const loadedState = stored
      ? { ...initial, ...JSON.parse(stored) }
      : initial;

    // TODO: i dont like this here i think
    if (loadedState.activeTheme) {
      changeTheme(loadedState.activeTheme);
    }

    return loadedState;
  });
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
