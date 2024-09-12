import { useCallback, useEffect } from "react";
import { useGame } from "../GameContext";

// TODO: yes
const Timer = () => {
  const { state, dispatch } = useGame();

  const decrementTimer = useCallback(() => {
    console.log(state.timeLeft);
    dispatch({ type: "SET_TIME_LEFT", payload: state.timeLeft - 1 });
    if (state.timeLeft > 0) {
      return;
    } else {
      console.log("TIMER IS OVER");
      dispatch({ type: "SET_TIMER_EXPIRED", payload: true });
      dispatch({ type: "END_GAME" });
    }
  }, [state.timeLeft, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_TIMER_DURATION", payload: state.timerDuration });
  }, [state.timerDuration]);

  useEffect(() => {
    let timer: number | undefined;
    if (state.gameStarted && !state.gameOver && state.timeLeft > 0) {
      timer = window.setInterval(decrementTimer, 1000);
    }

    return () => {
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, [state.gameStarted, state.gameOver, state.timeLeft, decrementTimer]);

  return (
    <div>
      <p className="text-xl">{state.timeLeft}</p>
    </div>
  );
};

export default Timer;
