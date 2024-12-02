import { useGame } from "../../GameContext";

const LayoutSelector = () => {
  const { state, dispatch } = useGame();
  // TODO: layouts NOT DRY
  const layouts: ("grid" | "rows" | "columns")[] = ["grid", "rows", "columns"];

  return (
    <>
      {layouts.map((layout) => (
        <button
          key={layout}
          onClick={() => dispatch({ type: "SET_LAYOUT_TYPE", payload: layout })}
          className={`px-3 rounded-md transition-colors hover:text-text ${
            state.layoutType === layout ? `text-active` : `text-inactive`
          }`}
        >
          {layout}
        </button>
      ))}
    </>
  );
};

export default LayoutSelector;
