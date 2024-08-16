import { SetStateAction } from "react";

type LayoutSelectorProps = {
  layoutType: string;
  setLayoutType: (layout: SetStateAction<"grid" | "rows" | "columns">) => void;
};

const LayoutSelector = ({ layoutType, setLayoutType }: LayoutSelectorProps) => {
  const layouts: ("grid" | "rows" | "columns")[] = ["grid", "rows", "columns"];
  return (
    <>
      {layouts.map((layout) => (
        <button
          key={layout}
          onClick={() => setLayoutType(layout)}
          className={`px-3 rounded-md transition-colors hover:text-serika_dark-text ${
            layoutType === layout
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
