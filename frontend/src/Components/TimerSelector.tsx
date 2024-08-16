import { useState, useEffect } from "react";
import CustomNumberModal from "./CustomNumberModal";

type TimerSelectorProps = {
  timerDuration: number;
  onTimerDurationChange: (duration: number) => void;
};

const timerOptions = [15, 30, 60]; // Predefined timer options in seconds
const MIN_TIMER = 0; // 0 for unlimited
const MAX_TIMER = 3600; // 1 hour max for example

const TimerSelector = ({
  timerDuration,
  onTimerDurationChange,
}: TimerSelectorProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isCustomTimer, setIsCustomTimer] = useState(false);

  useEffect(() => {
    setIsCustomTimer(!timerOptions.includes(timerDuration));
  }, [timerDuration]);

  return (
    <>
      {timerOptions.map((duration) => (
        <button
          key={duration}
          onClick={() => {
            onTimerDurationChange(duration);
            setIsCustomTimer(false);
          }}
          className={`px-3 rounded-md hover:text-serika_dark-text transition-colors ${
            timerDuration === duration && !isCustomTimer
              ? "text-serika_dark-active"
              : "text-serika_dark-inactive"
          }`}
        >
          {duration}s
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 rounded-md bg-serika_dark-elementBg hover:text-serika_dark-text transition-colors ${
          isCustomTimer
            ? "text-serika_dark-active"
            : "text-serika_dark-inactive"
        }`}
      >
        Custom
      </button>

      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(duration) => {
          onTimerDurationChange(duration);
          setIsCustomTimer(true);
        }}
        title="Custom timer duration (seconds)"
        minValue={MIN_TIMER}
        maxValue={MAX_TIMER}
        initialInputValue={timerDuration}
      />
    </>
  );
};

export default TimerSelector;
