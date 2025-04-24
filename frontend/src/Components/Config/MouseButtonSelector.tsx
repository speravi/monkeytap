import { useGame } from "../../GameContext";
import { MouseButtonOption } from "../../types/types";

const MouseButtonSelector = () => {
  const { state, dispatch } = useGame();

  const options: MouseButtonOption[] = ["left", "right", "both"];

  const handleSelect = (option: MouseButtonOption) => {
    dispatch({ type: "SET_ALLOWED_MOUSE_BUTTON", payload: option });
  };

  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`px-4 py-1 rounded-md transition-colors text-sm ${
            state.allowedMouseButton === option
              ? " text-active"
              : " text-inactive"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MouseButtonSelector;
