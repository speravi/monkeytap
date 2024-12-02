import { changeTheme } from "../../utils/ThemeSwitcher";

const ThemeSelector = () => {
  return (
    <div className="flex flex-wrap space-x-2">
      <button className="px-3 py-1 rounded" onClick={() => changeTheme("")}>
        Serika Dark
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("forest_whisper")}
      >
        Forest Whisper
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("ocean_breeze")}
      >
        Ocean Breeze
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("sunset_glow")}
      >
        Sunset Glow
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("electric_dreams")}
      >
        Electric Dreams
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("fiery_dusk")}
      >
        Fiery Dusk
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("neon_night")}
      >
        Neon Night
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("black_white")}
      >
        Black White
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("berry_burst")}
      >
        Berry Burst
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("solar_flare")}
      >
        Solar Flare
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("arctic_twilight")}
      >
        Arctic Twilight
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("lava_lands")}
      >
        Lava Lands
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("cosmic_wave")}
      >
        Cosmic Wave
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("autumn_rust")}
      >
        Autumn Rust
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("candy_crush")}
      >
        Candy Crush
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("jade_silk")}
      >
        Jade Silk
      </button>
      <button
        className="px-3 py-1 rounded"
        onClick={() => changeTheme("amber_glow")}
      >
        Amber Glow
      </button>
    </div>
  );
};

export default ThemeSelector;
