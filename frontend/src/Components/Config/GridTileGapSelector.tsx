import { useState, useEffect } from "react";
import CustomNumberModal from "../CustomNumberModal";
import { useGame } from "../../GameContext";

const gapOptions = [1, 3, 6];
const MIN_GAP = 1;
const MAX_GAP = 50; // Example max value, adjust as needed

const GridTileGapSelector = () => {
  const { state, dispatch } = useGame();

  const [showModal, setShowModal] = useState(false);
  const [isCustomGap, setIsCustomGap] = useState(false);

  useEffect(() => {
    setIsCustomGap(!gapOptions.includes(state.gridTileGap));
  }, [state.gridTileGap]);

  return (
    <>
      {gapOptions.map((gap) => (
        <button
          key={gap}
          onClick={() => {
            dispatch({ type: "SET_GRID_TILE_GAP", payload: gap });
            setIsCustomGap(false);
          }}
          className={`px-3 rounded-md hover:text-text transition-colors ${
            state.gridTileGap === gap && !isCustomGap
              ? `text-active`
              : `text-inactive`
          }`}
        >
          {gap}px
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 rounded-md hover:text-text transition-colors ${
          isCustomGap ? `text-active` : `text-inactive`
        }`}
      >
        custom
      </button>

      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(gap) => {
          dispatch({ type: "SET_GRID_TILE_GAP", payload: gap });
          setIsCustomGap(true);
        }}
        title="Custom grid tile gap"
        minValue={MIN_GAP}
        maxValue={MAX_GAP}
        initialInputValue={state.gridTileGap}
      />
    </>
  );
};

export default GridTileGapSelector;
