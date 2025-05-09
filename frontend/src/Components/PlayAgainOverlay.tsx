import { useEffect } from "react";
import { useGame } from "../GameContext";
import CPMChart from "./CPMChart";

const PlayAgainOverlay = () => {
  const { state, dispatch } = useGame();

  // TODO: move to utils, call from reducer, store in gamerecord
  const accuracy =
    state.clickTimes.length > 0
      ? ((state.clickTimes.length - state.missedClicks) /
          state.clickTimes.length) *
        100
      : 0;

  useEffect(() => {
    const handleKeyDown = (event: { code: string }) => {
      if (event.code === "Space" || event.code === "Escape") {
        dispatch({ type: "RESET_GAME" });
      }
    };
    // TODO: what is this
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div
      className={`absolute z-50 inset-0 flex items-center justify-center backdrop-blur-sm`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className={`w-[50em] bg-elementBg p-4 rounded-md text-center text-text`}
      >
        <div className="flex justify-between px-4">
          <div
            className={`flex justify-between text-3xl mb-4 ${
              state.gameOverOnInactiveClick ? "w-60" : "w-96"
            }`}
          >
            <p className="text-inactive text-left">
              score
              <br />
              <span className="text-5xl text-active">{state.score}</span>
            </p>
            {!state.gameOverOnInactiveClick && (
              <p className="text-inactive text-left">
                accuracy
                <br />
                <span className="text-5xl text-active">
                  {accuracy.toFixed(0)}%
                </span>
              </p>
            )}
            <p className="text-inactive text-left">
              cpm
              <br />
              <span className="text-5xl text-active">{state.avgCPM}</span>
            </p>
          </div>

          <div className="flex flex-col">
            <p className="text-right text-sm text-inactive mb-4">
              last 5 scores <br />
              <span className="text-active">
                {state.lastFiveScores.join(", ")}
              </span>
            </p>
            <p className="text-right text-sm text-inactive mb-4">
              test duration
              <br />
              <span className="text-active">
                {state.testDuration}/{state.timerDuration}s
              </span>
            </p>
          </div>
        </div>

        <div className="mb-2">
          <CPMChart />
        </div>
        <button
          className={`px-6 pt-2 pb-2 text-active hover:text-text transition-colors text-xl`}
          onClick={() => {
            dispatch({ type: "RESET_GAME" });
          }}
        >
          restart test
        </button>
        <p className="text-inactive text-sm">spacebar/esc to restart</p>
      </div>
    </div>
  );
};

export default PlayAgainOverlay;
