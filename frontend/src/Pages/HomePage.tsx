import { useEffect } from "react";
import TileGrid from "../Components/TileGrid";
import PlayAgainOverlay from "../Components/PlayAgainOverlay";
import Score from "../Components/Score";
import Timer from "../Components/Timer";
import { useGame } from "../GameContext";
import QuickConfig from "../Components/QuickConfig";

const HomePage = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    dispatch({ type: "RESET_GAME" });
  }, [
    state.gridSize,
    state.activeTileCount,
    state.layoutType,
    state.timerDuration,
  ]);
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* config */}
      <QuickConfig />
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
