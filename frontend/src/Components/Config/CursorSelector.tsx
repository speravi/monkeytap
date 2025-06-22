import { useEffect, useRef, useState } from "react";
import { useGame } from "../../GameContext";
import { CursorType } from "../../types/types";
import { CURSOR_OPTIONS, getCursorSvg } from "../../utils/cursors";

const CursorSelector = () => {
  const { state, dispatch } = useGame();
  const { activeCursor, cursorSize, cursorColor } = state;
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleCursorChange = (cursorId: CursorType) => {
    dispatch({ type: "SET_ACTIVE_CURSOR", payload: cursorId });
  };
  const handleSizeChange = (size: number) => {
    dispatch({ type: "SET_CURSOR_SIZE", payload: size });
  };

  const handleColorChange = (color: string) => {
    dispatch({ type: "SET_CURSOR_COLOR", payload: color });
  };

  const handleCursorHover = (cursorId: CursorType) => {
    if (cursorId !== "default") {
      document.body.style.cursor = "none";

      // Create temporary cursor element for preview
      const tempCursor = document.createElement("div");
      tempCursor.id = "temp-cursor-preview";
      tempCursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        width: ${cursorSize}px;
        height: ${cursorSize}px;
        color: ${cursorColor};
        transform: translate(-50%, -50%);
      `;
      tempCursor.innerHTML = getCursorSvg(cursorId, cursorSize);
      document.body.appendChild(tempCursor);

      const handleMouseMove = (e: MouseEvent) => {
        tempCursor.style.left = `${e.clientX}px`;
        tempCursor.style.top = `${e.clientY}px`;
      };

      document.addEventListener("mousemove", handleMouseMove);

      // Store cleanup function
      (tempCursor as any)._cleanup = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.body.removeChild(tempCursor);
        document.body.style.cursor = "";
      };
    }
  };

  const handleCursorLeave = () => {
    const tempCursor = document.getElementById("temp-cursor-preview");
    if (tempCursor && (tempCursor as any)._cleanup) {
      (tempCursor as any)._cleanup();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  // quick selection
  const commonColors = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
  ];

  //TODO: markup feels messy & looks a bit wonky on small screens
  // also idk y but my performance is way worse with custom cursor, maybe there's some dragging going on

  return (
    <>
      <div className="flex space-x-2 mb-2 px-3 ">
        <div className="flex justify-between w-full flex-col md:flex-row">
          <div className="flex gap-2">
            <input
              type="range"
              min="12"
              max="48"
              step="2"
              value={state.cursorSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="range-slider"
            />
            <label className="block text-sm font-medium">
              {state.cursorSize}px
            </label>
          </div>

          <div className="flex gap-2">
            <div></div>
            <label>custom cursor color:</label>
            <div className="flex items-center" ref={colorPickerRef}>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-6 h-6 rounded"
                style={{ backgroundColor: cursorColor }}
                title="Cursor Color"
              />
              <div className="relative">
                {showColorPicker && (
                  <div className="absolute top-5 right-0 bg-background rounded-lg p-3 z-50 min-w-[200px]">
                    <div>
                      <div className="grid grid-cols-5 gap-1">
                        {commonColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className="w-8 h-8 rounded"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="mb-1 text-text">custom color:</label>
                      <input
                        type="color"
                        value={cursorColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-full h-8 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {CURSOR_OPTIONS.map(({ id, name, previewSvg }) => (
          <button
            key={id}
            onClick={() => handleCursorChange(id)}
            onMouseEnter={() => handleCursorHover(id)}
            onMouseLeave={handleCursorLeave}
            className={`
            text-inactive
            px-4 py-2 rounded-lg
            transition-all duration-200
            flex items-center gap-2
            hover:scale-105 w-full
            outline outline-0
             ${
               activeCursor === id ? `outline-2 outline-active text-active` : ""
             }
             ${id !== "default" ? "cursor-none" : ""}
          `}
          >
            <span>{name}</span>
            {previewSvg && (
              <div
                className="ml-auto flex items-center justify-center"
                style={{
                  color: cursorColor,
                }}
                dangerouslySetInnerHTML={{
                  __html: getCursorSvg(id),
                }}
              />
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default CursorSelector;
