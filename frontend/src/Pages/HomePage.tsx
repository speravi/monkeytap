import { useEffect } from "react";
import TileGrid from "../Components/TileGrid";
import GridSizeSelector from "../Components/Config/GridSizeSelector";
import LayoutSelector from "../Components/Config/LayoutSelector";
import Spacer from "../Components/Spacer";
import PlayAgainOverlay from "../Components/PlayAgainOverlay";
import ActiveTileCountSelector from "../Components/Config/ActiveTileCountSelector";
import GridTileGapSelector from "../Components/Config/GridTileGapSelector";
import Score from "../Components/Score";
import Timer from "../Components/Timer";
import TimerSelector from "../Components/Config/TimerSelector";
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
