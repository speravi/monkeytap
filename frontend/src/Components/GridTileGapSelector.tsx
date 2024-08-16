import { useState, useEffect } from "react";
import CustomNumberModal from "./CustomNumberModal";

type GridTileGapSelectorProps = {
  gridTileGap: number;
  onGridTileGapChange: (gap: number) => void;
};

const gapOptions = [1, 3, 6];
const MIN_GAP = 1;
const MAX_GAP = 50; // Example max value, adjust as needed

const GridTileGapSelector = ({
  gridTileGap,
  onGridTileGapChange,
}: GridTileGapSelectorProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isCustomGap, setIsCustomGap] = useState(false);

  useEffect(() => {
    setIsCustomGap(!gapOptions.includes(gridTileGap));
  }, [gridTileGap]);

  return (
    <>
      {gapOptions.map((gap) => (
        <button
          key={gap}
          onClick={() => {
            onGridTileGapChange(gap);
            setIsCustomGap(false);
          }}
          className={`px-3 rounded-md hover:text-serika_dark-text transition-colors ${
            gridTileGap === gap && !isCustomGap
              ? "text-serika_dark-active"
              : "text-serika_dark-inactive"
          }`}
        >
          {gap}px
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 rounded-md bg-serika_dark-elementBg hover:text-serika_dark-text transition-colors ${
          isCustomGap ? "text-serika_dark-active" : "text-serika_dark-inactive"
        }`}
      >
        custom
      </button>

      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(gap) => {
          onGridTileGapChange(gap);
          setIsCustomGap(true);
        }}
        title="Custom grid tile gap"
        minValue={MIN_GAP}
        maxValue={MAX_GAP}
        initialInputValue={gridTileGap}
      />
    </>
  );
};

export default GridTileGapSelector;
