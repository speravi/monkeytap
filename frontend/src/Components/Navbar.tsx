import { useState } from "react";
import { NavLink } from "react-router-dom";
import MonkeyTapLogo from "./MonkeyTapLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `text-inactive hover:text-text`
      : `text-inactive hover:text-text`;

  return (
    <nav className="py-2 px-6 relative">
      <div className="flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <NavLink className="flex flex-shrink-0 items-center" to="/">
            <MonkeyTapLogo size={40} />
            <span className="text-text text-4xl ml-2">monkeytap</span>
          </NavLink>
          <div className="hidden pl-4 md:flex md:mr-auto items-center space-x-5 text-lg">
            <NavLink className={linkClass} to="/settings">
              settings
            </NavLink>
            <NavLink className={linkClass} to="/history">
              history
            </NavLink>
          </div>
        </div>
        {/* burger menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text hover:text-inactive focus:outline-none"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* burger menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background md:hidden">
          <div className="flex flex-col items-center pb-3 space-y-4">
            <NavLink
              className={linkClass}
              to="/settings"
              onClick={() => setIsOpen(false)}
            >
              settings
            </NavLink>
            <NavLink
              className={linkClass}
              to="/history"
              onClick={() => setIsOpen(false)}
            >
              history
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
