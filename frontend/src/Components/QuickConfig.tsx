import { IconRotate } from "@tabler/icons-react";
import ActiveTileCountSelector from "./Config/ActiveTileCountSelector";
import GridSizeSelector from "./Config/GridSizeSelector";
import GridTileGapSelector from "./Config/GridTileGapSelector";
import LayoutSelector from "./Config/LayoutSelector";
import TimerSelector from "./Config/TimerSelector";
import Spacer from "./Spacer";
import { useState } from "react";
import ConfirmActionModal from "./ConfirmActionModal";
import { useGame } from "../GameContext";

const QuickConfig = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { dispatch } = useGame();
  const handleResetSettingsConfirm = () => {
    dispatch({ type: "RESET_TO_DEFAULT" });
    setIsConfirmModalOpen(false);
  };
  return (
    <div
      className={`
        relative bg-elementBg rounded-md text-sm flex mb-2 p-2 flex-col
      `}
    >
      <button
        onClick={() => setIsConfirmModalOpen(true)}
        className="absolute top-2 right-2 p-1 text-inactive hover:text-active cursor-pointer z-10"
        title="Reset settings to default"
      >
        <IconRotate size={20} />
      </button>
      <div className="lg:pb-5">
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
          <div className={`flex justify-center text-inactive`}>timer</div>
          <div className="flex justify-center">
            <TimerSelector />
          </div>
        </div>
        <Spacer />
        <div>
          <div className={`flex justify-center text-inactive`}>
            active tile count
          </div>
          <div className="flex justify-center">
            <ActiveTileCountSelector />
          </div>
        </div>
        <Spacer />
        <div>
          <div className={`flex justify-center text-inactive`}>
            grid tile gap
          </div>
          <div className="flex justify-center">
            <GridTileGapSelector />
          </div>
        </div>
      </div>
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleResetSettingsConfirm}
        title="Reset Settings"
        message="Are you sure you want to reset settings to their default values?"
      />
    </div>
  );
};

export default QuickConfig;
