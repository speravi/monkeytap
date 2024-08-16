import { useEffect, useState } from "react";
import TileGrid from "../Components/TileGrid";
import GridSizeSelector from "../Components/GridSizeSelector";
import LayoutSelector from "../Components/LayoutSelector";
import Spacer from "../Components/Spacer";
import PlayAgainOverlay from "../Components/PlayAgainOverlay";
import ActiveTileCountSelector from "../Components/ActiveTileCountSelector";
import GridTileGapSelector from "../Components/GridTileGapSelector";
import Score from "../Components/Score";
import Timer from "../Components/Timer";
import TimerSelector from "../Components/TimerSelector";

type LayoutType = "grid" | "rows" | "columns";

const HomePage = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [gridTileGap, setGridTileGap] = useState<number>(3);
  const [activeTileCount, setActiveTileCount] = useState<number>(3);
  const [layoutType, setLayoutType] = useState<LayoutType>("grid");
  const [timerDuration, setTimerDuration] = useState<number>(15);
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [lastThreeScores, setLastThreeScores] = useState<number[]>([]);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  // const [configVisible, setConfigVisible] = useState(true);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  useEffect(() => {
    resetGame();
  }, [gridSize, activeTileCount, layoutType, timerDuration]);

  useEffect(() => {
    if (timerExpired && gameStarted && !gameOver) {
      handleGameOver();
    }
  }, [timerExpired]);

  const handleTileGapChange = (gap: number) => {
    setGridTileGap(gap);
    resetGame();
  };

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    resetGame();
  };

  const handleTileCountChange = (tileCount: number) => {
    setActiveTileCount(tileCount);
    resetGame();
  };

  const handleTimerDurationChange = (duration: number) => {
    setTimerDuration(duration);
    resetGame();
  };

  const setPreviousScores = () => {
    console.log("setPreviousScores called. Current score:", score);
    console.log("Current lastThreeScores:", lastThreeScores);
    setLastThreeScores((prevScores) => {
      const newScores = [...prevScores, score];
      console.log("New scores array:", newScores);
      return newScores.slice(-5);
    });
  };

  const handleGameOver = () => {
    setTimeLeft(0);
    setPreviousScores();
    setGameOver(true);
    // setConfigVisible(true);
    setTimerExpired(false);
  };

  const handleGameStarted = () => {
    // setConfigVisible(false);
    setGameStarted(true);
  };

  const resetGame = () => {
    setTimeLeft(timerDuration);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    setTimerExpired(false);
  };

  const handleScoreIncrement = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* config */}
      <div
        // TODO: fade in/out config when game starts/ends
        //       className={`
        //   bg-serika_dark-elementBg rounded-md text-sm flex mb-6 p-2 flex-col
        //   transition-opacity duration-500 ease-in-out
        //   ${configVisible ? "opacity-100" : "opacity-0 invisible"}
        // `}
        className="
        bg-serika_dark-elementBg rounded-md text-sm flex mb-2 p-2 flex-col
      "
      >
        <div className="pb-5">
          <div className="flex justify-center">
            <LayoutSelector
              layoutType={layoutType}
              setLayoutType={setLayoutType}
            />
          </div>
          <Spacer />
          <div className="flex justify-center">
            <GridSizeSelector
              gridSize={gridSize}
              onGridSizeChange={handleGridSizeChange}
            />
          </div>
        </div>
        <div className="flex justify-center content-center md:flex-row flex-col ">
          <div>
            <div className="flex justify-center text-serika_dark-inactive">
              Timer
            </div>
            <div className="flex justify-center">
              <TimerSelector
                timerDuration={timerDuration}
                onTimerDurationChange={handleTimerDurationChange}
              />
            </div>
          </div>
          <Spacer />
          <div>
            <div className="flex justify-center text-serika_dark-inactive">
              Active tile count
            </div>
            <div className="flex justify-center">
              <ActiveTileCountSelector
                activeTileCount={activeTileCount}
                onActiveTileCountChange={handleTileCountChange}
              />
            </div>
          </div>
          <Spacer />
          <div>
            <div className="flex justify-center text-serika_dark-inactive">
              Grid tile gap
            </div>
            <div className="flex justify-center">
              <GridTileGapSelector
                gridTileGap={gridTileGap}
                onGridTileGapChange={handleTileGapChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* timer & score */}
      <div className="flex justify-center">
        <div className=" flex justify-around gap-80 items-center w-5/6">
          {/* TODO: changing digit count shifts the text a bit */}
          {/* like when score reaches double digits,  */}
          <Timer
            timerDuration={timerDuration}
            gameStarted={gameStarted}
            gameOver={gameOver}
            timeLeft={timeLeft}
            onTimerExpire={() => setTimerExpired(true)}
            setTimeLeft={setTimeLeft}
          />
          <Score score={score} />
        </div>
      </div>
      {/* game */}
      <TileGrid
        gridSize={gridSize}
        gridTileGap={gridTileGap}
        activeTileCount={activeTileCount}
        layoutType={layoutType}
        gameOver={gameOver}
        gameStarted={gameStarted}
        handleGameStarted={handleGameStarted}
        handleGameOver={handleGameOver}
        handleScoreIncrement={handleScoreIncrement}
      />
      {gameOver && (
        <PlayAgainOverlay
          currentScore={score}
          bestScore={bestScore}
          lastThreeScores={lastThreeScores}
          resetGame={resetGame}
        />
      )}
    </div>
  );
};

export default HomePage;
