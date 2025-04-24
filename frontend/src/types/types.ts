export type GameHistoryRecord = {
  id: string;
  date: number;
  score: number;
  cpm: number;
  chartData: {
    second: number;
    cpm: number;
  }[];
  // Game configuration
  layoutType: LayoutTypes;
  gridSize: number;
  timerDuration: number;
  testDuration: number;
  activeTileCount: number;
  gridTileGap: number;
  gapsCountAsFail: boolean;
  gameMode: GameModes;
};

export type GameModes = "continuous" | "batch";
export type LayoutTypes = "grid" | "rows" | "columns";
export type MouseButtonOption = "left" | "right" | "both";

export type GameState = {
  // game states
  gameStarted: boolean;
  gameOver: boolean;
  // config
  gridSize: number;
  gridTileGap: number;
  activeTileCount: number;
  layoutType: LayoutTypes;
  gameMode: GameModes;
  activeTheme: string;
  gapsCountAsFail: boolean;
  gameOverOnInactiveClick: boolean;
  allowedMouseButton: MouseButtonOption;
  // timer
  timerDuration: number;
  timeLeft: number;
  timerExpired: boolean;
  // scores
  score: number;
  bestScore: number;
  avgCPM: number;
  lastFiveScores: number[];
  missedClicks: number;
  // click tracking for CPM graph
  clickTimes: number[];
  startTime: number;
  endTime: number;
  testDuration: number;
  // game history
  gameHistory: GameHistoryRecord[];
};

export type DataPoint = {
  second: number;
  cpm: number;
};
