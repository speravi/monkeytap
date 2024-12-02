import ActiveTileCountSelector from "../Components/Config/ActiveTileCountSelector";
import GridSizeSelector from "../Components/Config/GridSizeSelector";
import GridTileGapSelector from "../Components/Config/GridTileGapSelector";
import LayoutSelector from "../Components/Config/LayoutSelector";
import ThemeSelector from "../Components/Config/ThemeSelector";
import TimerSelector from "../Components/Config/TimerSelector";

const SettingsPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Game Settings</h1>
      <div className={`bg-elementBg rounded-md p-4`}>
        <div className="mb-4">
          <h2 className="text-xl mb-2">Layout</h2>
          <LayoutSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">Grid Size</h2>
          <GridSizeSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">Timer Duration</h2>
          <TimerSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">Active Tile Count</h2>
          <ActiveTileCountSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">Grid Tile Gap</h2>
          <GridTileGapSelector />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">Theme</h2>
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
