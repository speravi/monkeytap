import { SoundPacks } from "../soundsConfig";
import { THEMES } from "../Themes/themes";
import { GameState } from "../types/types";

// Theme validation
export const isValidThemeId = (themeId: string): boolean => {
  return THEMES.some((theme) => theme.id === themeId);
};

export const validateThemeId = (
  themeId: string | undefined | null,
  defaultThemeId: string = "serika_dark"
): string => {
  if (!themeId || typeof themeId !== "string") {
    return defaultThemeId;
  }

  if (isValidThemeId(themeId)) {
    return themeId;
  }

  console.log(`Invalid theme "${themeId}", using default`);
  return defaultThemeId;
};

// Sound validation
export const isValidSoundId = (soundId: string): boolean => {
  return SoundPacks.some((pack) => pack.id === soundId);
};

export const validateSoundId = (
  soundId: string | undefined | null,
  defaultSoundId: string = "none"
): string => {
  if (!soundId || typeof soundId !== "string") {
    return defaultSoundId;
  }

  if (isValidSoundId(soundId)) {
    return soundId;
  }

  console.log(`Invalid sound "${soundId}", using default`);
  return defaultSoundId;
};

// Number validation
export const validateNumber = (
  value: any,
  min: number,
  max: number,
  defaultValue: number
): number => {
  if (typeof value !== "number" || isNaN(value)) {
    return defaultValue;
  }
  return Math.max(min, Math.min(max, value));
};

// Enum validation
export const validateEnum = <T extends string>(
  value: any,
  validValues: readonly T[],
  defaultValue: T
): T => {
  if (typeof value === "string" && validValues.includes(value as T)) {
    return value as T;
  }
  return defaultValue;
};

// Boolean validation
export const validateBoolean = (value: any, defaultValue: boolean): boolean => {
  return typeof value === "boolean" ? value : defaultValue;
};

//Main validation function for loaded config
export const validateLoadedConfig = (
  storedConfig: any,
  initialState: GameState
): Partial<GameState> => {
  if (!storedConfig || typeof storedConfig !== "object") {
    return {};
  }

  // TODO: min max values hardcoded
  return {
    // Theme
    activeTheme: validateThemeId(
      storedConfig.activeTheme,
      initialState.activeTheme
    ),

    // Sounds
    clickSound: validateSoundId(
      storedConfig.clickSound,
      initialState.clickSound
    ),
    clickSoundVolume: validateNumber(
      storedConfig.clickSoundVolume,
      0,
      100,
      initialState.clickSoundVolume
    ),

    // Grid settings
    gridSize: validateNumber(
      storedConfig.gridSize,
      2,
      20,
      initialState.gridSize
    ),
    gridTileGap: validateNumber(
      storedConfig.gridTileGap,
      0,
      50,
      initialState.gridTileGap
    ),
    activeTileCount: validateNumber(
      storedConfig.activeTileCount,
      1,
      20,
      initialState.activeTileCount
    ),

    // Game settings
    layoutType: validateEnum(
      storedConfig.layoutType,
      ["grid", "rows", "columns"] as const,
      initialState.layoutType
    ),
    gameMode: validateEnum(
      storedConfig.gameMode,
      ["continuous", "batch"] as const,
      initialState.gameMode
    ),
    allowedMouseButton: validateEnum(
      storedConfig.allowedMouseButton,
      ["left", "right", "both"] as const,
      initialState.allowedMouseButton
    ),

    // Timer
    timerDuration: validateNumber(
      storedConfig.timerDuration,
      0,
      3600,
      initialState.timerDuration
    ),

    // Booleans
    gapsCountAsFail: validateBoolean(
      storedConfig.gapsCountAsFail,
      initialState.gapsCountAsFail
    ),
    gameOverOnInactiveClick: validateBoolean(
      storedConfig.gameOverOnInactiveClick,
      initialState.gameOverOnInactiveClick
    ),

    // Best score (should be preserved)
    bestScore: validateNumber(
      storedConfig.bestScore,
      0,
      Infinity,
      initialState.bestScore
    ),
  };
};
