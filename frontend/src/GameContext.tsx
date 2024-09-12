import React, { createContext, useContext, useReducer, ReactNode } from "react";

type GameState = {
  gridSize: number;
  gridTileGap: number;
  activeTileCount: number;
  layoutType: "grid" | "rows" | "columns";
  timerDuration: number;
  timeLeft: number;
  score: number;
  bestScore: number;
  lastFiveScores: number[];
  timerExpired: boolean;
  gameStarted: boolean;
  gameOver: boolean;
};

type GameAction =
  | { type: "SET_GRID_SIZE"; payload: number }
  | { type: "SET_GRID_TILE_GAP"; payload: number }
  | { type: "SET_ACTIVE_TILE_COUNT"; payload: number }
  | { type: "SET_LAYOUT_TYPE"; payload: "grid" | "rows" | "columns" }
  | { type: "SET_TIMER_DURATION"; payload: number }
  | { type: "SET_TIME_LEFT"; payload: number }
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_BEST_SCORE"; payload: number }
  | { type: "ADD_SCORE"; payload: number }
  | { type: "RESET_GAME" }
  | { type: "START_GAME" }
  | { type: "END_GAME" }
  | { type: "SET_TIMER_EXPIRED"; payload: boolean };

const initialState: GameState = {
  gridSize: 4,
  gridTileGap: 3,
  activeTileCount: 3,
  layoutType: "grid",
  timerDuration: 15,
  timeLeft: 15,
  score: 0,
  bestScore: 0,
  lastFiveScores: [],
  timerExpired: false,
  gameStarted: false,
  gameOver: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_GRID_SIZE":
      return { ...state, gridSize: action.payload };
    case "SET_GRID_TILE_GAP":
      return { ...state, gridTileGap: action.payload };
    case "SET_ACTIVE_TILE_COUNT":
      return { ...state, activeTileCount: action.payload };
    case "SET_LAYOUT_TYPE":
      return { ...state, layoutType: action.payload };
    case "SET_TIMER_DURATION":
      return {
        ...state,
        timerDuration: action.payload,
        timeLeft: action.payload,
      };
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
  const [state, dispatch] = useReducer(gameReducer, initialState);

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
