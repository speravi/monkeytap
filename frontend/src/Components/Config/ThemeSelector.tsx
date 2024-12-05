import { useState } from "react";
import { changeTheme } from "../../utils/ThemeSwitcher";

// TODO: this is stupid but u know what to do
const THEMES = [
  { id: "", name: "Serika Dark" },
  { id: "forest_whisper", name: "Forest Whisper" },
  { id: "ocean_breeze", name: "Ocean Breeze" },
  { id: "sunset_glow", name: "Sunset Glow" },
  { id: "electric_dreams", name: "Electric Dreams" },
  { id: "fiery_dusk", name: "Fiery Dusk" },
  { id: "neon_night", name: "Neon Night" },
  { id: "black_white", name: "Black White" },
  { id: "berry_burst", name: "Berry Burst" },
  { id: "solar_flare", name: "Solar Flare" },
  { id: "arctic_twilight", name: "Arctic Twilight" },
  { id: "lava_lands", name: "Lava Lands" },
  { id: "cosmic_wave", name: "Cosmic Wave" },
  { id: "autumn_rust", name: "Autumn Rust" },
  { id: "candy_crush", name: "Candy Crush" },
  { id: "jade_silk", name: "Jade Silk" },
  { id: "amber_glow", name: "Amber Glow" },
];

const ThemeSelector = () => {
  const [activeTheme, setActiveTheme] = useState("");

  const handleThemeChange = (themeId: string) => {
    changeTheme(themeId);
    setActiveTheme(themeId);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map(({ id, name }) => (
        <button
          key={id}
          className={`px-3 py-1 rounded transition-colors ${
            activeTheme === id
              ? "text-[var(--color-active)]"
              : "text-[var(--color-inactive)]"
          }`}
          onClick={() => handleThemeChange(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
