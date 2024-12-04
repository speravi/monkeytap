import { useEffect } from "react";
import { useGame } from "../GameContext";

const Timer = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (state.timerDuration === 0) return;

    if (state.timeLeft <= 0 && state.gameStarted && !state.gameOver) {
      dispatch({ type: "END_GAME" });
    }
  }, [
    state.timeLeft,
    state.gameStarted,
    state.gameOver,
    dispatch,
    state.timerDuration,
  ]);

  useEffect(() => {
    if (state.gameStarted && !state.gameOver && state.timerDuration > 0) {
      dispatch({ type: "SET_TIME_LEFT", payload: state.timerDuration });
    }
  }, [state.gameStarted, state.gameOver, state.timerDuration, dispatch]);

  useEffect(() => {
    if (state.timerDuration === 0) return;

    let timer: number | undefined;

    if (state.gameStarted && !state.gameOver && state.timeLeft > 0) {
      timer = window.setInterval(() => {
        dispatch({ type: "SET_TIME_LEFT", payload: state.timeLeft - 1 });
      }, 1000);
    }

    return () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
      }
    };
  }, [
    state.gameStarted,
    state.gameOver,
    state.timeLeft,
    dispatch,
    state.timerDuration,
  ]);

  return (
    <div>
      <p className="text-xl text-active">
        {state.timerDuration === 0 ? " " : state.timeLeft}
      </p>
    </div>
  );
};

export default Timer;
