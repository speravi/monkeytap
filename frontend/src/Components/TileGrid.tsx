import { useState, useEffect } from "react";
import { useGame } from "../GameContext";
import { playSound } from "../services/audioService";

type Tile = {
  id: number;
  isActive: boolean;
};

const TileGrid = () => {
  const { state, dispatch } = useGame();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [activeCount, setActiveCount] = useState(0);

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
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (state.gameOver) return;

    // TODO: changes needed, duplicate the logic from handleGridClick to check for allowed mouse button
    const isLeftClick = event.button === 0;
    const isRightClick = event.button === 2; // 0 = left, 1 = middle, 2 = right
    const isAllowedClick =
      (state.allowedMouseButton === "left" && isLeftClick) ||
      (state.allowedMouseButton === "right" && isRightClick) ||
      (state.allowedMouseButton === "both" && (isLeftClick || isRightClick));

    if (!isAllowedClick) {
      return; // Ignore the click if the button is not allowed
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
    // TODO:
    const isLeftClick = e.button === 0;
    const isRightClick = e.button === 2;

    const isAllowedClick =
      (state.allowedMouseButton === "left" && isLeftClick) ||
      (state.allowedMouseButton === "right" && isRightClick) ||
      (state.allowedMouseButton === "both" && (isLeftClick || isRightClick));

    if (!isAllowedClick) {
      return; // Ignore the click if the button is not allowed
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
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`${
          state.layoutType === "columns" ? "flex flex-col" : "grid"
        } p-2 bg-elementBg rounded-md`}
        style={{ ...getGridStyle(), gap: `${state.gridTileGap}px` }}
        onMouseDown={handleGridClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={`w-full h-full transition-colors rounded-md cursor-default 
               ${tile.isActive ? `bg-active` : `bg-inactive`} ${
              state.gameOver ? "cursor-not-allowed" : "cursor-pointer"
            } ${state.layoutType === "columns" ? "flex-1" : ""}`}
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
