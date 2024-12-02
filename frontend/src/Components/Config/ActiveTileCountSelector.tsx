import { useState, useEffect } from "react";
import CustomNumberModal from "../CustomNumberModal";
import { useGame } from "../../GameContext";

// TODO: I don't like these here
const tileCounts = [1, 3, 5];
const MIN_TILES = 1;
const MAX_TILES = 20;

const ActiveTileCountSelector = () => {
  const { state, dispatch } = useGame();
  const [showModal, setShowModal] = useState(false);
  const [isCustomCount, setIsCustomCount] = useState(false);

  useEffect(() => {
    setIsCustomCount(!tileCounts.includes(state.activeTileCount));
  }, [state.activeTileCount]);

  return (
    <>
      {tileCounts.map((count) => (
        <button
          key={count}
          onClick={() => {
            dispatch({ type: "SET_ACTIVE_TILE_COUNT", payload: count });
            setIsCustomCount(false);
          }}
          className={`px-3 rounded-md hover:text-text transition-colors ${
            state.activeTileCount === count && !isCustomCount
              ? `text-active`
              : `text-inactive`
          }`}
        >
          {count}
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 rounded-md bg-elementBg hover:text-text transition-colors ${
          isCustomCount ? `text-active` : `text-inactive`
        }`}
      >
        custom
      </button>

      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(count) => {
          dispatch({ type: "SET_ACTIVE_TILE_COUNT", payload: count });
          setIsCustomCount(true);
        }}
        title="Custom active tile count"
        minValue={MIN_TILES}
        maxValue={MAX_TILES}
        initialInputValue={state.activeTileCount}
      />
    </>
  );
};

export default ActiveTileCountSelector;
