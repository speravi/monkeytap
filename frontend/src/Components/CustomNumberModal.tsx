import React, { useCallback, useState } from "react";
import { useGame } from "../GameContext";

type CustomNumberModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (value: number) => void;
  title: string;
  minValue: number;
  maxValue: number;
  initialInputValue?: number;
};

const CustomNumberModal = ({
  isVisible,
  onClose,
  onSubmit,
  title,
  minValue,
  maxValue,
  initialInputValue = minValue,
}: CustomNumberModalProps) => {
  const { state } = useGame();
  const [inputValue, setInputValue] = useState(initialInputValue.toString());

  const handleCustomSizeChange = useCallback(
    (newSize: number) => {
      const clampedSize = Math.max(minValue, Math.min(maxValue, newSize));
      setInputValue(clampedSize.toString());
    },
    [minValue, maxValue]
  );

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLInputElement>) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      handleCustomSizeChange(Number(inputValue) + delta);
    },
    [inputValue, handleCustomSizeChange]
  );

  const handleSubmit = () => {
    const size = parseInt(inputValue, 10);
    if (!isNaN(size) && size >= minValue && size <= maxValue) {
      onSubmit(size);
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-background p-6 rounded-lg shadow-lg border-2 border-elementBg`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-xl mb-4 text-inactive`}>{title}</h2>

        <input
          className={`w-full px-3 py-2 mb-4 bg-elementBg text-text border rounded-md border-none focus:outline-none focus:outline-text`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onWheel={handleScroll}
          min={minValue}
          max={maxValue}
        />
        <p className={`text-text`}>
          Enter a value between {minValue} and {maxValue}.
        </p>
        <p className={`text-xs text-text`}>Tip: Try using the scroll wheel!</p>
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            className={`px-3 py-2 rounded-md w-full bg-elementBg text-text hover:bg-opacity-90 transition-colors`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomNumberModal;
