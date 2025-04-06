import { useState } from "react";
import { useGame } from "../GameContext";
import CPMChart from "../Components/CPMChart";
import React from "react";

const GameHistoryPage = () => {
  const { state, dispatch } = useGame();
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const hh = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl ">game history</h1>
      <h2 className="text-xl text-inactive mb-4">last 50 games</h2>
      {state.gameHistory.length === 0 ? (
        <div className="text-center text-inactive my-4">
          No game history available
        </div>
      ) : (
        <div className="overflow-x-auto bg-elementBg rounded-md p-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-3 text-center align-middle">cpm</th>
                <th className="px-4 py-3 text-center align-middle">duration</th>
                <th className="px-4 py-3 text-center align-middle">score</th>
                <th className="px-4 py-3 text-center align-middle">layout</th>
                <th className="px-4 py-3 text-center align-middle">
                  grid size
                </th>
                <th className="px-4 py-3 text-center align-middle">date</th>
                <th className="px-4 py-3 text-center align-middle">actions</th>
              </tr>
            </thead>
            <tbody>
              {state.gameHistory.map((game: any) => (
                <React.Fragment key={game.id}>
                  <tr className="odd:bg-background even:bg-elementBg rounded-md">
                    <td className="px-4 py-3 text-center align-middle">
                      {game.cpm.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      {game.testDuration}/{game.timerDuration}s
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      {game.score}
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      {game.layoutType}
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      {game.gridSize}
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      {formatDate(game.date)}
                    </td>
                    <td>
                      <button
                        className="w-full"
                        onClick={() =>
                          setExpandedGame(
                            expandedGame === game.id ? null : game.id
                          )
                        }
                      >
                        {expandedGame === game.id ? "▲" : "▼"}
                      </button>
                    </td>
                  </tr>
                  {expandedGame === game.id && (
                    <tr>
                      <td colSpan={7} className="p-4">
                        <div className="mb-4">
                          {game.testDuration > 2 ? (
                            <CPMChart
                              chartData={game.chartData}
                              testDuration={game.testDuration}
                            />
                          ) : (
                            <div className="text-center text-inactive my-4">
                              game too short to display CPM graph
                            </div>
                          )}
                        </div>
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td>Active Tiles:</td>
                              <td>{game.activeTileCount}</td>
                              <td>Grid Gap:</td>
                              <td>{game.gridTileGap}px</td>
                              {/* {game.gameOverOnInactiveClick && (
                                <td>Accuracy:</td>
                                <td>{game.accuracy}</td>
                              )} */}
                            </tr>
                            <tr>
                              <td>Gaps as Fail:</td>
                              <td>{game.gapsCountAsFail ? "Yes" : "No"}</td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          className="bg-inactive px-2 py-1 rounded mr-2"
                          onClick={() => {
                            dispatch({ type: "RESET_GAME" });
                            dispatch({
                              type: "SET_GRID_SIZE",
                              payload: game.gridSize,
                            });
                            dispatch({
                              type: "SET_LAYOUT_TYPE",
                              payload: game.layoutType,
                            });
                            dispatch({
                              type: "SET_ACTIVE_TILE_COUNT",
                              payload: game.activeTileCount,
                            });
                            dispatch({
                              type: "SET_GRID_TILE_GAP",
                              payload: game.gridTileGap,
                            });
                            dispatch({
                              type: "SET_GAPS_COUNT_AS_FAIL",
                              payload: game.gapsCountAsFail,
                            });
                            dispatch({
                              type: "SET_GAME_MODE",
                              payload: game.gameMode,
                            });
                            dispatch({
                              type: "SET_TIMER_DURATION",
                              payload: game.timerDuration,
                            });
                          }}
                        >
                          apply settings
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 p-2 bg-red-500 rounded"
            onClick={() => dispatch({ type: "CLEAR_GAME_HISTORY" })}
          >
            clear history
          </button>
        </div>
      )}
    </div>
  );
};

export default GameHistoryPage;
