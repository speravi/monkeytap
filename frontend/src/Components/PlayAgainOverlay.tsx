import { useGame } from "../GameContext";

const PlayAgainOverlay = () => {
  const { state, dispatch } = useGame();

  return (
    // TODO: Colors (gradient)
    <div
      className={`absolute inset-0 bg-gradient-to-r from-background/50 via-elementBg/70 to-background/50 flex items-center justify-center`}
    >
      <div className={`bg-elementBg p-6 rounded-md text-center text-text`}>
        <div className="flex gap-x-64 text-text ">
          <p className="">best Score: {state.bestScore}</p>
          <p className="">score: {state.score}</p>
        </div>
        <div className="mb-4">
          <p className="text-md">previous scores:</p>
          <ul className="list-none p-0">
            {state.lastFiveScores.map((score, index) => (
              <li key={index} className="inline-block mx-2">
                {score}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`px-6 py-4 text-active hover:text-text transition-colors text-xl`}
          onClick={() => {
            dispatch({ type: "RESET_GAME" });
          }}
        >
          restart test
        </button>
      </div>
    </div>
  );
};

export default PlayAgainOverlay;
