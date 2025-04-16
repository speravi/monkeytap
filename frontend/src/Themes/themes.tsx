export interface Theme {
  id: string;
  name: string;
  colors: {
    text: string;
    background: string;
    elementBg: string;
    active: string;
    inactive: string;
  };
}
export const THEMES: Theme[] = [
  {
    id: "serika_dark",
    name: "serika dark",
    colors: {
      text: "#d1d0c5",
      background: "#323437",
      elementBg: "#2c2e31",
      active: "#d1b71c",
      inactive: "#636669",
    },
  },
  {
    id: "forest_whisper",
    name: "forest whisper",
    colors: {
      text: "#e3e7dc",
      background: "#1e2c2b",
      elementBg: "#30443e",
      active: "#b8e986",
      inactive: "#4b6455",
    },
  },
  {
    id: "ocean_breeze",
    name: "ocean breeze",
    colors: {
      text: "#e0faff",
      background: "#012d47",
      elementBg: "#014963",
      active: "#00d4ff",
      inactive: "#516e80",
    },
  },
  {
    id: "cinder_blush",
    name: "cinder blush",
    colors: {
      text: "#fbe9e7",
      background: "#2a1a18",
      elementBg: "#402524",
      active: "#ff725e",
      inactive: "#7c4f4a",
    },
  },
  {
    id: "electric_dreams",
    name: "electric dreams",
    colors: {
      text: "#f4faff",
      background: "#140f2a",
      elementBg: "#1d1442",
      active: "#ff00f6",
      inactive: "#5a4984",
    },
  },
  {
    id: "plum_mint",
    name: "plum mint",
    colors: {
      text: "#f6fdf9",
      background: "#251e29",
      elementBg: "#3c2f44",
      active: "#c1ffdd",
      inactive: "#85688f",
    },
  },
  {
    id: "neon_night",
    name: "neon night",
    colors: {
      text: "#e5ffe5",
      background: "#000a13",
      elementBg: "#001e26",
      active: "#00ff7f",
      inactive: "#005c42",
    },
  },
  {
    id: "deep_sea",
    name: "deep sea",
    colors: {
      text: "#e3fdf7",
      background: "#000c0d",
      elementBg: "#002120",
      active: "#01ffd7",
      inactive: "#005f54",
    },
  },
  {
    id: "achromatopsia",
    name: "achromatopsia",
    colors: {
      text: "#ebebeb",
      background: "#1e1e1e",
      elementBg: "#373737",
      active: "#ebebeb",
      inactive: "#6b6b6b",
    },
  },
  {
    id: "berry_burst",
    name: "berry burst",
    colors: {
      text: "#fff3f8",
      background: "#230013",
      elementBg: "#36001f",
      active: "#ff338f",
      inactive: "#80445c",
    },
  },
  {
    id: "solar_flare",
    name: "solar flare",
    colors: {
      text: "#fffbf3",
      background: "#3a2600",
      elementBg: "#5b3d00",
      active: "#ffc700",
      inactive: "#7f5d2a",
    },
  },
  {
    id: "arctic_twilight",
    name: "arctic twilight",
    colors: {
      text: "#e3faff",
      background: "#002933",
      elementBg: "#004d59",
      active: "#e6fbff",
      inactive: "#377f8a",
    },
  },
  {
    id: "red_directive",
    name: "red directive",
    colors: {
      text: "#ffa5ac",
      background: "#292f2c",
      elementBg: "#272b22",
      active: "#ff192b",
      inactive: "#767a69",
    },
  },
  {
    id: "void_silk",
    name: "void silk",
    colors: {
      text: "#dfeef0",
      background: "#070711",
      elementBg: "#130f24",
      active: "#b944b2",
      inactive: "#534e58",
    },
  },
  {
    id: "mint",
    name: "mint",
    colors: {
      text: "#fffafb",
      background: "#131515",
      elementBg: "#2b2c28",
      active: "#00f0c7",
      inactive: "#dde5b6",
    },
  },
  {
    id: "late_night_walk",
    name: "late night walk",
    colors: {
      text: "#e8e5dc",
      background: "#27282b",
      elementBg: "#3e3e3e",
      active: "#eed78a",
      inactive: "#5e5c56",
    },
  },
  {
    id: "golden_dusk",
    name: "golden dusk",
    colors: {
      text: "#fff9e6",
      background: "#1e1a13",
      elementBg: "#3a2f1c",
      active: "#e0a843",
      inactive: "#7e6747",
    },
  },
  {
    id: "midnight_frost",
    name: "midnight frost",
    colors: {
      text: "#d9d9d9",
      background: "#212534",
      elementBg: "#3f455a",
      active: "#f1f5ff",
      inactive: "#72788b",
    },
  },
];
