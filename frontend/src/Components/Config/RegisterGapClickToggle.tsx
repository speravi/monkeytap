import { useGame } from "../../GameContext";

const RegisterGapClickToggle = () => {
  const { state, dispatch } = useGame();

  return (
    <button
      onClick={() =>
        dispatch({
          type: "SET_GAPS_COUNT_AS_FAIL",
          payload: !state.gapsCountAsFail,
        })
      }
      className={`px-3 rounded-md transition-colors hover:text-text ${
        state.gapsCountAsFail ? `text-active` : `text-inactive`
      }`}
    >
      {state.gapsCountAsFail ? "true" : "false"}
    </button>
  );
};

export default RegisterGapClickToggle;
