import { useState, useEffect } from "react";
import CustomNumberModal from "./CustomNumberModal";
type ActiveTileCountSelectorProps = {
  activeTileCount: number;
  onActiveTileCountChange: (count: number) => void;
};

const tileCounts = [1, 3, 5];
const MIN_TILES = 1;
const MAX_TILES = 20;

const ActiveTileCountSelector = ({
  activeTileCount,
  onActiveTileCountChange,
}: ActiveTileCountSelectorProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isCustomCount, setIsCustomCount] = useState(false);

  useEffect(() => {
    setIsCustomCount(!tileCounts.includes(activeTileCount));
  }, [activeTileCount]);

  return (
    <>
      {tileCounts.map((count) => (
        <button
          key={count}
          onClick={() => {
            onActiveTileCountChange(count);
            setIsCustomCount(false);
          }}
          className={`px-3 rounded-md hover:text-serika_dark-text transition-colors ${
            activeTileCount === count && !isCustomCount
              ? "text-serika_dark-active"
              : "text-serika_dark-inactive"
          }`}
        >
          {count}
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 rounded-md bg-serika_dark-elementBg hover:text-serika_dark-text transition-colors ${
          isCustomCount
            ? "text-serika_dark-active"
            : "text-serika_dark-inactive"
        }`}
      >
        custom
      </button>

      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(count) => {
          onActiveTileCountChange(count);
          setIsCustomCount(true);
        }}
        title="Custom active tile count"
        minValue={MIN_TILES}
        maxValue={MAX_TILES}
        initialInputValue={activeTileCount}
      />
    </>
  );
};

export default ActiveTileCountSelector;
