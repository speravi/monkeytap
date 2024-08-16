import { useState, useEffect } from "react";

type Tile = {
  id: number;
  isActive: boolean;
};

type LayoutType = "grid" | "rows" | "columns";

type TileGridProps = {
  gridSize: number;
  gridTileGap: number;
  activeTileCount: number;
  layoutType: LayoutType;
  gameOver: boolean;
  gameStarted: boolean;
  handleGameStarted: () => void;
  handleScoreIncrement: () => void;
  handleGameOver: () => void;
};

const TileGrid = ({
  gridSize,
  gridTileGap,
  activeTileCount,
  layoutType,
  gameOver,
  gameStarted,
  handleGameStarted,
  handleScoreIncrement,
  handleGameOver,
}: TileGridProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    initializeTiles();
  }, [gridSize, layoutType, activeTileCount]);

  const initializeTiles = () => {
    const tileCount =
      layoutType === "grid"
        ? gridSize * gridSize
        : layoutType === "columns"
        ? gridSize
        : gridSize;
    const initialTiles = Array.from({ length: tileCount }, (_, index) => ({
      id: index,
      isActive: false,
    }));
    setRandomActiveTiles(initialTiles, activeTileCount);
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

    for (let i = 0; i < count; i++) {
      if (inactiveTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * inactiveTiles.length);
        const selectedTile = inactiveTiles.splice(randomIndex, 1)[0];
        const tileIndex = newTiles.findIndex(
          (tile) => tile.id === selectedTile.id
        );
        newTiles[tileIndex].isActive = true;
      }
    }
    setTiles(newTiles);
  };

  const handleTileMouseDown = (id: number) => {
    if (gameOver) return;
    if (!gameStarted) handleGameStarted();

    const clickedTile = tiles.find((tile) => tile.id === id);
    if (clickedTile && clickedTile.isActive) {
      handleScoreIncrement();
      const newTiles = tiles.map((tile) =>
        tile.id === id ? { ...tile, isActive: false } : tile
      );
      setRandomActiveTiles(newTiles, 1, id);
    } else {
      handleGameOver();
    }
  };

  const getGridStyle = (): React.CSSProperties => {
    switch (layoutType) {
      case "grid":
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          aspectRatio: "1 / 1",
        };
      case "rows":
        return {
          display: "grid",
          aspectRatio: "1 / 1",
        };
      case "columns":
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
          layoutType === "columns" ? "flex flex-col" : "grid"
        } p-2 bg-serika_dark-elementBg rounded-md`}
        style={{ ...getGridStyle(), gap: `${gridTileGap}px` }}
      >
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={`w-full h-full transition-colors rounded-md cursor-default 
               ${
                 tile.isActive
                   ? "bg-serika_dark-active"
                   : "bg-serika_dark-inactive"
               } ${gameOver ? "cursor-not-allowed" : "cursor-pointer"} ${
              layoutType === "columns" ? "flex-1" : ""
            }`}
            onMouseDown={() => handleTileMouseDown(tile.id)}
            disabled={gameOver}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TileGrid;
