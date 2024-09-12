import { useEffect, useState } from "react";
import TileGrid from "../Components/TileGrid";
import GridSizeSelector from "../Components/GridSizeSelector";
import LayoutSelector from "../Components/LayoutSelector";
import Spacer from "../Components/Spacer";
import PlayAgainOverlay from "../Components/PlayAgainOverlay";
import ActiveTileCountSelector from "../Components/ActiveTileCountSelector";
import GridTileGapSelector from "../Components/GridTileGapSelector";
import Score from "../Components/Score";
import Timer from "../Components/Timer";
import TimerSelector from "../Components/TimerSelector";
import { useGame } from "../GameContext";

const HomePage = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.score > state.bestScore) {
      dispatch({ type: "SET_BEST_SCORE", payload: state.bestScore });
    }
  }, [state.score]);

  useEffect(() => {
    dispatch({ type: "RESET_GAME" });
  }, [
    state.gridSize,
    state.activeTileCount,
    state.layoutType,
    state.timerDuration,
  ]);

  // useEffect(() => {
  //   if (state.timerExpired && state.gameStarted && !state.gameOver) {
  //     handleGameOver();
  //   }
  // }, [state.timerExpired]);

  // const handleGameOver = () => {
  //   dispatch({ type: "SET_TIME_LEFT", payload: 0 });
  //   dispatch({ type: "END_GAME" });
  //   dispatch({ type: "SET_TIME_LEFT", payload: 0 });
  //   dispatch({ type: "SET_TIMER_EXPIRED", payload: true });
  // };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* config */}
      <div
        className="
        bg-serika_dark-elementBg rounded-md text-sm flex mb-2 p-2 flex-col
      "
      >
        <div className="pb-5">
          <div className="flex justify-center">
            <LayoutSelector />
          </div>
          <Spacer />
          <div className="flex justify-center">
            <GridSizeSelector />
          </div>
        </div>
        <div className="flex justify-center content-center md:flex-row flex-col ">
          <div>
            <div className="flex justify-center text-serika_dark-inactive">
              Timer
            </div>
            <div className="flex justify-center">
              <TimerSelector />
            </div>
          </div>
          <Spacer />
          <div>
            <div className="flex justify-center text-serika_dark-inactive">
              Active tile count
            </div>
            <div className="flex justify-center">
              <ActiveTileCountSelector />
            </div>
          </div>
          <Spacer />
          <div>
            <div className="flex justify-center text-serika_dark-inactive">
              Grid tile gap
            </div>
            <div className="flex justify-center">
              <GridTileGapSelector />
            </div>
          </div>
        </div>
      </div>
      {/* timer & score */}
      <div className="flex justify-center">
        <div className=" flex justify-around gap-80 items-center w-5/6">
          <Timer />
          <Score />
        </div>
      </div>
      {/* game */}
      <TileGrid />
      {state.gameOver && <PlayAgainOverlay />}
    </div>
  );
};

export default HomePage;
