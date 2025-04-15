import { useState, useEffect, useRef } from "react";
import { useGame } from "../GameContext";
import { changeTheme } from "../utils/ThemeSwitcher";
import { THEMES } from "../Themes/themes";
import { IconPaletteFilled } from "@tabler/icons-react";

const QuickThemeSwitcher = () => {
  const { state, dispatch } = useGame();
  const { activeTheme } = state;
  const [isOpen, setIsOpen] = useState(false);
  const [previewThemeId, setPreviewThemeId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // TODO: This feels hacky
  const activeThemeObject = THEMES.find((theme) => theme.id === activeTheme);
  const currentThemeDisplayName =
    activeThemeObject?.name || activeTheme?.replace(/_/g, " ") || "serika dark";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        // Before closing, revert any active preview
        if (previewThemeId) {
          changeTheme(activeTheme); // Revert to actual active theme
          setPreviewThemeId(null);
        }
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTheme, previewThemeId]); // Add dependencies

  const toggleMenu = () => {
    // If closing and a preview was active, revert it
    if (isOpen && previewThemeId) {
      changeTheme(activeTheme);
      setPreviewThemeId(null);
    }
    setIsOpen(!isOpen);
  };

  // Apply theme permanently
  const handleThemeSelect = (themeId: string) => {
    // TODO: ????
    dispatch({ type: "SET_ACTIVE_THEME", payload: themeId });
    changeTheme(themeId); // Ensure permanent application
    setPreviewThemeId(null); // Clear any preview state
    setIsOpen(false); // Close menu
  };

  // Preview theme on hover
  const handleThemePreview = (themeId: string) => {
    if (themeId !== activeTheme && themeId !== previewThemeId) {
      setPreviewThemeId(themeId);
      changeTheme(themeId);
    }
  };

  // Revert preview when mouse leaves the menu area
  const handleMouseLeaveMenu = () => {
    if (previewThemeId) {
      changeTheme(activeTheme); // Revert to the actual active theme
      setPreviewThemeId(null);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-md text-inactive hover:text-text"
        aria-label="change theme"
      >
        <IconPaletteFilled className="inline-flex items-center gap-1" />{" "}
        {currentThemeDisplayName}
      </button>

      {/* Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          onMouseLeave={handleMouseLeaveMenu} // Revert preview when leaving the whole menu
          className="absolute bottom-full right-0 mb-2 w-56 bg-elementBg rounded-lg p-2 max-h-96 overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-1">
            {THEMES.map(({ id, name, colors }) => (
              <button
                key={id}
                onClick={() => handleThemeSelect(id)}
                onMouseEnter={() => handleThemePreview(id)}
                // `onMouseLeave` on individual items is not needed if we handle it on the parent menu
                style={{
                  backgroundColor: colors.elementBg, // Use theme's element bg for button
                  ...(activeTheme === id &&
                    !previewThemeId && {
                      // Highlight active only if not previewing
                      outlineColor: colors.active,
                      outlineWidth: "2px",
                      outlineStyle: "solid",
                    }),
                  ...(previewThemeId === id && {
                    // Highlight previewing theme
                    outlineColor: colors.active, // Use the previewed theme's active color
                    outlineWidth: "2px",
                    outlineStyle: "solid",
                  }),
                }}
                // Styling of the theme buttons
                className={`
                  px-3 py-1.5 rounded
                  flex items-center gap-2
                  w-full text-left
                  outline outline-0 focus:outline-none focus:ring-1 focus:ring-active
                  hover:brightness-110 
                `}
              >
                <span style={{ color: colors.text, fontSize: "0.875rem" }}>
                  {name}
                </span>
                {/* theme Color indicators */}
                <div className="flex gap-1 ml-auto">
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: colors.text }}
                    title={`Text: ${colors.text}`}
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: colors.background }}
                    title={`Background: ${colors.background}`}
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: colors.active }}
                    title={`Active: ${colors.active}`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickThemeSwitcher;
