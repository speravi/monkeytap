import { useEffect, useState } from "react";
import CustomNumberModal from "./CustomNumberModal";
import { useGame } from "../GameContext";

const gridSizes = [3, 4, 5];
const MIN_SIZE = 2;
const MAX_SIZE = 20;

const GridSizeSelector = () => {
  const { state, dispatch } = useGame();
  const [showModal, setShowModal] = useState(false);
  const [customSize, setCustomSize] = useState("");
  const [isCustomSize, setIsCustomSize] = useState(false);

  useEffect(() => {
    setIsCustomSize(
      !gridSizes.includes(state.gridSize) ||
        state.gridSize === Number(customSize)
    );
  }, [state.gridSize, customSize]);

  return (
    <>
      {gridSizes.map((size) => (
        <button
          key={size}
          onClick={() => {
            dispatch({ type: "SET_GRID_SIZE", payload: size });
            setIsCustomSize(false);
            setCustomSize("");
          }}
          className={`px-3 rounded-md hover:text-serika_dark-text transition-colors ${
            state.gridSize === size && !isCustomSize
              ? "text-serika_dark-active"
              : "text-serika_dark-inactive"
          }`}
        >
          {size}x{size}
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 hover:text-serika_dark-text transition-colors ${
          isCustomSize ? "text-serika_dark-active" : "text-serika_dark-inactive"
        }`}
      >
        custom
      </button>
      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(size) => {
          dispatch({ type: "SET_GRID_SIZE", payload: size });
          setIsCustomSize(true);
        }}
        title="Custom grid size"
        minValue={MIN_SIZE}
        maxValue={MAX_SIZE}
        initialInputValue={state.gridSize}
      />
    </>
  );
};

export default GridSizeSelector;
