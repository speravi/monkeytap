import { useGame } from "../GameContext";

const LayoutSelector = () => {
  const { state, dispatch } = useGame();
  const layouts: ("grid" | "rows" | "columns")[] = ["grid", "rows", "columns"];

  return (
    <>
      {layouts.map((layout) => (
        <button
          key={layout}
          onClick={() => dispatch({ type: "SET_LAYOUT_TYPE", payload: layout })}
          className={`px-3 rounded-md transition-colors hover:text-serika_dark-text ${
            state.layoutType === layout
              ? "text-serika_dark-active"
              : "text-serika_dark-inactive "
          }`}
        >
          {layout}
        </button>
      ))}
    </>
  );
};

export default LayoutSelector;
