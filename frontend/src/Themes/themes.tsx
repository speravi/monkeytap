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
    id: "sunset_glow",
    name: "sunset glow",
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
    id: "fiery_dusk",
    name: "fiery dusk",
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
    id: "team_fortress_2",
    name: "team fortress 2",
    colors: {
      text: "#EBEBEB",
      background: "#373737",
      elementBg: "#6B6B6B",
      active: "#EF7122",
      inactive: "#C3B9A1",
    },
  },
  {
    id: "cosmic_wave",
    name: "cosmic wave",
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
    name: "autumn rust",
    colors: {
      text: "#fff8e6",
      background: "#3a210b",
      elementBg: "#573615",
      active: "#e67e22",
      inactive: "#805840",
    },
  },
  {
    id: "ogre_dream",
    name: "ogre dream",
    colors: {
      text: "#f0ead2",
      background: "#6c584c",
      elementBg: "#a98467",
      active: "#c4d200",
      inactive: "#dde5b6",
    },
  },
  // {
  //   id: "mint",
  //   name: "Mint",
  //   colors: {
  //     text: "#fffafb",
  //     background: "#131515",
  //     elementBg: "#2b2c28",
  //     active: "#00f0c7",
  //     inactive: "#dde5b6",
  //   },
  // },
  {
    id: "jade_silk",
    name: "jade silk",
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
    name: "amber glow",
    colors: {
      text: "#fffae6",
      background: "#3f2100",
      elementBg: "#5a2f00",
      active: "#ffa500",
      inactive: "#805d38",
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
