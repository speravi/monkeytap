import { useState, useEffect, useRef } from "react";
import { useGame } from "../GameContext";
import { playSound } from "../services/audioService";
import { MouseButtonOption } from "../types/types";
import CustomCursor from "./CustomCursor";

type Tile = {
  id: number;
  isActive: boolean;
};

const isAllowedMouseClick = (
  event: React.MouseEvent,
  allowedButton: MouseButtonOption
): boolean => {
  const isLeftClick = event.button === 0;
  const isRightClick = event.button === 2;

  switch (allowedButton) {
    case "left":
      return isLeftClick;
    case "right":
      return isRightClick;
    case "both":
      return isLeftClick || isRightClick;
    default:
      return false;
  }
};

const TileGrid = () => {
  const { state, dispatch } = useGame();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  const gameGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    initializeTiles();
  }, [state.gridSize, state.layoutType, state.activeTileCount]);

  const initializeTiles = () => {
    const tileCount =
      state.layoutType === "grid"
        ? state.gridSize * state.gridSize
        : state.layoutType === "columns"
        ? state.gridSize
        : state.gridSize;
    const initialTiles = Array.from({ length: tileCount }, (_, index) => ({
      id: index,
      isActive: false,
    }));
    setRandomActiveTiles(initialTiles, state.activeTileCount);
  };

  const setRandomActiveTiles = (
    currentTiles: Tile[],
    count: number,
    excludeId?: number
  ) => {
    const newTiles = [...currentTiles];
    const inactiveTiles = newTiles.filter(
      (tile) => !tile.isActive && tile.id !== excludeId
    );
    let activatedCount = 0;
    for (let i = 0; i < count; i++) {
      if (inactiveTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * inactiveTiles.length);
        const selectedTile = inactiveTiles.splice(randomIndex, 1)[0];
        const tileIndex = newTiles.findIndex(
          (tile) => tile.id === selectedTile.id
        );
        newTiles[tileIndex].isActive = true;
        activatedCount++;
      }
    }
    setActiveCount(activatedCount);
    setTiles(newTiles);
  };

  const handleTileMouseDown = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (state.gameOver || !isAllowedMouseClick(e, state.allowedMouseButton)) {
      return;
    }

    if (!state.gameStarted) {
      dispatch({ type: "START_GAME" });
    }

    const clickedTile = tiles.find((tile) => tile.id === id);
    const currentTime = performance.now();
    dispatch({ type: "RECORD_CLICK", payload: currentTime });

    if (clickedTile && clickedTile.isActive) {
      dispatch({ type: "ADD_SCORE", payload: 1 });
      playSound(state.clickSound, state.clickSoundVolume);
      const newTiles = tiles.map((tile) =>
        tile.id === id ? { ...tile, isActive: false } : tile
      );
      const newActiveCount = activeCount - 1;
      setActiveCount(newActiveCount);

      if (state.gameMode === "continuous") {
        setRandomActiveTiles(newTiles, 1, id);
      } else if (state.gameMode === "batch") {
        if (newActiveCount === 0) {
          setRandomActiveTiles(newTiles, state.activeTileCount);
        } else {
          setTiles(newTiles);
        }
      }
    } else {
      if (state.gameOverOnInactiveClick) {
        dispatch({ type: "END_GAME" });
      } else {
        dispatch({ type: "INCREMENT_MISSED_CLICKS" });
      }
    }
  };

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.gameOver || !isAllowedMouseClick(e, state.allowedMouseButton)) {
      return;
    }

    if (state.gameOver || !state.gapsCountAsFail) return;
    if (e.currentTarget === e.target) {
      const currentTime = performance.now();
      dispatch({ type: "RECORD_CLICK", payload: currentTime });
      if (!state.gameStarted) {
        dispatch({ type: "START_GAME" });
      }
      dispatch({ type: "END_GAME" });
    }
  };

  const getGridStyle = (): React.CSSProperties => {
    switch (state.layoutType) {
      case "grid":
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${state.gridSize}, 1fr)`,
          aspectRatio: "1 / 1",
        };
      case "rows":
        return {
          display: "grid",
          aspectRatio: "1 / 1",
        };
      case "columns":
        1;
        return {
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          height: "100%",
          aspectRatio: 1,
        };
    }
  };

  return (
    <div ref={gameGridRef} className="w-full max-w-xl mx-auto">
      <CustomCursor targetRef={gameGridRef} />
      <div
        className={`${
          state.layoutType === "columns" ? "flex flex-col" : "grid"
        } p-2 bg-elementBg rounded-md`}
        style={{ ...getGridStyle(), gap: `${state.gridTileGap}px` }}
        onMouseDown={handleGridClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        <CustomCursor targetRef={gameGridRef} />
        {tiles.map((tile) => (
          <button
            key={tile.id}
            // not sure about transition-colors, make it an togglable option?
            // className={`w-full h-full transition-colors rounded-md cursor-default
            //    ${tile.isActive ? `bg-active` : `bg-inactive`}  ${
            //   state.layoutType === "columns" ? "flex-1" : ""
            // }`}
            className={`w-full h-full transition-colors rounded-md cursor-default
               ${tile.isActive ? `bg-active` : `bg-inactive`}  ${
              state.layoutType === "columns" ? "flex-1" : ""
            }`}
            onMouseDown={(e) => {
              e.stopPropagation(); // Prevent the grid click handler from firing
              handleTileMouseDown(tile.id, e);
            }}
            onContextMenu={(e) => e.preventDefault()} // Prevent default right-click menu on buttons
            disabled={state.gameOver}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TileGrid;
