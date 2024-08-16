type PlayAgainOverlayProps = {
  currentScore: number;
  bestScore: number;
  lastThreeScores: number[];
  resetGame: () => void;
};

const PlayAgainOverlay = ({
  currentScore,
  bestScore,
  lastThreeScores,
  resetGame,
}: PlayAgainOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-serika_dark-background/50 via-serika_dark-elementBg/70 to-serika_dark-background/50 flex items-center justify-center">
      <div className=" bg-serika_dark-elementBg p-6 rounded-md text-center">
        <div className="flex gap-x-64 text-serika_dark-text ">
          <p className="">best Score: {bestScore}</p>
          <p className="">score: {currentScore}</p>
        </div>
        <div className="mb-4">
          <p className="text-md">previous scores:</p>
          <ul className="list-none p-0">
            {lastThreeScores.map((score, index) => (
              <li key={index} className="inline-block mx-2">
                {score}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="px-6 py-4 text-serika_dark-active hover:text-serika_dark-text transition-colors text-xl"
          onClick={resetGame}
        >
          restart test
        </button>
      </div>
    </div>
  );
};

export default PlayAgainOverlay;
