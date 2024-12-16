import { useState, useEffect } from "react";
import CustomNumberModal from "../CustomNumberModal";
import { useGame } from "../../GameContext";

const timerOptions = [15, 30, 60];
const MIN_TIMER = 0; // 0 for unlimited
const MAX_TIMER = 3600;

const TimerSelector = () => {
  const { state, dispatch } = useGame();

  const [showModal, setShowModal] = useState(false);
  const [isCustomTimer, setIsCustomTimer] = useState(false);

  useEffect(() => {
    setIsCustomTimer(!timerOptions.includes(state.timerDuration));
  }, [state.timerDuration]);

  return (
    <>
      {timerOptions.map((duration) => (
        <button
          key={duration}
          onClick={() => {
            dispatch({ type: "SET_TIMER_DURATION", payload: duration });
            setIsCustomTimer(false);
          }}
          className={`px-3 rounded-md hover:text-text transition-colors ${
            state.timerDuration === duration && !isCustomTimer
              ? `text-active`
              : `text-inactive`
          }`}
        >
          {duration}s
        </button>
      ))}
      <button
        onClick={() => setShowModal(true)}
        className={`px-3 rounded-md bg-elementBg hover:text-text transition-colors ${
          isCustomTimer ? `text-active` : `text-inactive`
        }`}
      >
        custom
      </button>

      <CustomNumberModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(duration) => {
          dispatch({ type: "SET_TIMER_DURATION", payload: duration });
          setIsCustomTimer(true);
        }}
        title="Custom timer duration (seconds)"
        minValue={MIN_TIMER}
        maxValue={MAX_TIMER}
        initialInputValue={state.timerDuration}
      />
    </>
  );
};

export default TimerSelector;
