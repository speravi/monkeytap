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
    id: "",
    name: "Serika Dark",
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
    name: "Forest Whisper",
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
    name: "Ocean Breeze",
    colors: {
      text: "#e0faff",
      background: "#012d47",
      elementBg: "#014963",
      active: "#00d4ff",
      inactive: "#516e80",
    },
  },
  {
    id: "sunset_glow",
    name: "Sunset Glow",
    colors: {
      text: "#ffedd5",
      background: "#4a171b",
      elementBg: "#652427",
      active: "#ff6b3b",
      inactive: "#8e575a",
    },
  },
  {
    id: "electric_dreams",
    name: "Electric Dreams",
    colors: {
      text: "#f4faff",
      background: "#140f2a",
      elementBg: "#1d1442",
      active: "#ff00f6",
      inactive: "#5a4984",
    },
  },
  {
    id: "fiery_dusk",
    name: "Fiery Dusk",
    colors: {
      text: "#ffe4cc",
      background: "#2a0f0f",
      elementBg: "#451818",
      active: "#ff4500",
      inactive: "#733939",
    },
  },
  {
    id: "neon_night",
    name: "Neon Night",
    colors: {
      text: "#e5ffe5",
      background: "#000a13",
      elementBg: "#001e26",
      active: "#00ff7f",
      inactive: "#005c42",
    },
  },
  {
    id: "black_white",
    name: "Black White",
    colors: {
      text: "#ffffff",
      background: "#000000",
      elementBg: "#1a1a1a",
      active: "#ffffff",
      inactive: "#000000",
    },
  },
  {
    id: "berry_burst",
    name: "Berry Burst",
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
    name: "Solar Flare",
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
    name: "Arctic Twilight",
    colors: {
      text: "#e3faff",
      background: "#002933",
      elementBg: "#004d59",
      active: "#e6fbff", // Converted from hsl(185, 100%, 89%)
      inactive: "#377f8a",
    },
  },
  {
    id: "lava_lands",
    name: "Lava Lands",
    colors: {
      text: "#ffecd2",
      background: "#301204",
      elementBg: "#200900",
      active: "#ff0000",
      inactive: "#360c00",
    },
  },
  {
    id: "cosmic_wave",
    name: "Cosmic Wave",
    colors: {
      text: "#e4eaff",
      background: "#0e0039",
      elementBg: "#200075",
      active: "#9b59ff",
      inactive: "#594780",
    },
  },
  {
    id: "autumn_rust",
    name: "Autumn Rust",
    colors: {
      text: "#fff8e6",
      background: "#3a210b",
      elementBg: "#573615",
      active: "#e67e22",
      inactive: "#805840",
    },
  },
  {
    id: "candy_crush",
    name: "Candy Crush",
    colors: {
      text: "#fffbff",
      background: "#ffc8de",
      elementBg: "#7c298f",
      active: "#ee35ae",
      inactive: "#d3b1ff",
    },
  },
  {
    id: "jade_silk",
    name: "Jade Silk",
    colors: {
      text: "#e8fff2",
      background: "#003824",
      elementBg: "#005b37",
      active: "#00e676",
      inactive: "#12241c",
    },
  },
  {
    id: "amber_glow",
    name: "Amber Glow",
    colors: {
      text: "#fffae6",
      background: "#3f2100",
      elementBg: "#5a2f00",
      active: "#ffa500",
      inactive: "#805d38",
    },
  },
];
