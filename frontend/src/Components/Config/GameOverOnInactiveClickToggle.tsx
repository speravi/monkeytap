import { useGame } from "../../GameContext";

const GameOverOnInactiveClickToggle = () => {
  const { state, dispatch } = useGame();

  return (
    <button
      onClick={() =>
        dispatch({
          type: "SET_GAME_OVER_ON_INACTIVE_CLICK",
          payload: !state.gameOverOnInactiveClick,
        })
      }
      className={`px-3 rounded-md transition-colors hover:text-text ${
        state.gameOverOnInactiveClick ? `text-active` : `text-inactive`
      }`}
    >
      {state.gameOverOnInactiveClick ? "true" : "false"}
    </button>
  );
};
export default GameOverOnInactiveClickToggle;
