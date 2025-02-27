import { useGame } from "../../GameContext";

const GameModeSelector = () => {
  const { state, dispatch } = useGame();

  const gameModes: ("continuous" | "batch")[] = ["continuous", "batch"];

  return (
    <>
      {gameModes.map((gameMode) => (
        <button
          key={gameMode}
          onClick={() => dispatch({ type: "SET_GAME_MODE", payload: gameMode })}
          className={`px-3 rounded-md transition-colors hover:text-text ${
            state.gameMode === gameMode ? `text-active` : `text-inactive`
          }`}
        >
          {gameMode}
        </button>
      ))}
    </>
  );
};

export default GameModeSelector;
