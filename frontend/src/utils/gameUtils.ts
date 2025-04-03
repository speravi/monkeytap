import { GameHistoryRecord, GameState } from "../GameContext";
import { calculateCPMData } from "./CPMCalculator";

export const createGameHistoryRecord = (
  state: GameState,
  avgCPM: number,
  testDuration: number
): GameHistoryRecord => {
  return {
    id: crypto.randomUUID(),
    date: Date.now(),
    score: state.score,
    cpm: avgCPM,
    chartData: calculateCPMData(
      state.clickTimes,
      state.startTime,
      testDuration
    ),
    layoutType: state.layoutType,
    gridSize: state.gridSize,
    timerDuration: state.timerDuration,
    testDuration,
    activeTileCount: state.activeTileCount,
    gridTileGap: state.gridTileGap,
    gapsCountAsFail: state.gapsCountAsFail,
    gameMode: state.gameMode,
  };
};
