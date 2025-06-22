import { useGame } from "../../GameContext";
import { THEMES } from "../../Themes/themes";
import { changeTheme } from "../../utils/ThemeSwitcher";

const ThemeSelector = () => {
  const { state, dispatch } = useGame();
  const { activeTheme } = state;

  const handleThemeChange = (themeId: string) => {
    dispatch({ type: "SET_ACTIVE_THEME", payload: themeId });
    changeTheme(themeId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {THEMES.map(({ id, name, colors }) => (
        <button
          key={id}
          onClick={() => handleThemeChange(id)}
          style={{
            backgroundColor: colors.background,
          }}
          className={`      
            px-4 py-2 rounded-lg
            transition-all duration-200
            flex items-center gap-2
            hover:scale-105 w-full
            outline outline-0
            ${activeTheme === id ? "outline-2 outline-active" : ""}
          `}
        >
          <span style={{ color: colors.active }}>{name}</span>
          <div className="flex gap-1 ml-auto">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors.text }}
            />
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors.elementBg }}
            />
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors.inactive }}
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
