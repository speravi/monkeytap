import ActiveTileCountSelector from "../Components/Config/ActiveTileCountSelector";
import GameModeSelector from "../Components/Config/GameModeSelector";
import GridSizeSelector from "../Components/Config/GridSizeSelector";
import GridTileGapSelector from "../Components/Config/GridTileGapSelector";
import LayoutSelector from "../Components/Config/LayoutSelector";
import RegisterGapClickToggle from "../Components/Config/RegisterGapClickToggle";
import ThemeSelector from "../Components/Config/ThemeSelector";
import TimerSelector from "../Components/Config/TimerSelector";
import { useGame } from "../GameContext";

const SettingsPage = () => {
  //TODO: idk if i like this here
  const { dispatch } = useGame();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">game settings</h1>
      <div className={`bg-elementBg rounded-md p-4`}>
        <div className="mb-4">
          <h2 className="text-xl mb-2">layout</h2>
          <LayoutSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">grid size</h2>
          <GridSizeSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">timer duration</h2>
          <TimerSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">active tile count</h2>
          <ActiveTileCountSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">grid tile gap</h2>
          <GridTileGapSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">gaps count as fail</h2>
          <RegisterGapClickToggle />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">game mode</h2>
          <GameModeSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">theme</h2>
          <ThemeSelector />
        </div>
        <div className="mb-4">
          <button
            onClick={() => dispatch({ type: "RESET_TO_DEFAULT" })}
            className="p-2 bg-red-500 text-white rounded"
          >
            reset to default
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
