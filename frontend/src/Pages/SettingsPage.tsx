import { useState } from "react";
import ActiveTileCountSelector from "../Components/Config/ActiveTileCountSelector";
import GameModeSelector from "../Components/Config/GameModeSelector";
import GameOverOnInactiveClickToggle from "../Components/Config/GameOverOnInactiveClickToggle";
import GridSizeSelector from "../Components/Config/GridSizeSelector";
import GridTileGapSelector from "../Components/Config/GridTileGapSelector";
import LayoutSelector from "../Components/Config/LayoutSelector";
import RegisterGapClickToggle from "../Components/Config/RegisterGapClickToggle";
import ThemeSelector from "../Components/Config/ThemeSelector";
import TimerSelector from "../Components/Config/TimerSelector";
import { useGame } from "../GameContext";
import ConfirmActionModal from "../Components/ConfirmActionModal";
import MouseButtonSelector from "../Components/Config/MouseButtonSelector";
// import ClickSoundSelector from "../Components/Config/ClickSoundSelector";

const SettingsPage = () => {
  //TODO: idk if i like this here
  const { dispatch } = useGame();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleResetSettingsConfirm = () => {
    dispatch({ type: "RESET_TO_DEFAULT" });
  };
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
          <h2 className="text-xl mb-2">game over on inactive tile click</h2>
          <GameOverOnInactiveClickToggle />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-2">mouse button</h2>
          <MouseButtonSelector />
        </div>
        {/* <div className="mb-4">
          <h2 className="text-xl mb-2">active tile click sound</h2>
          <ClickSoundSelector />
        </div> */}
        <div className="mb-4">
          <h2 className="text-xl mb-2">theme</h2>
          <ThemeSelector />
        </div>
        <div className="mb-4">
          <button
            onClick={() => setIsConfirmModalOpen(true)}
            className="p-2 bg-red-500 text-white rounded"
          >
            reset to default
          </button>
        </div>
      </div>
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleResetSettingsConfirm}
        title="Reset settings"
        message="Are you sure you want reset all settings to default?"
      />
    </div>
  );
};

export default SettingsPage;
