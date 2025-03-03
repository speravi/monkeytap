import { NavLink } from "react-router-dom";
import MonkeyTapLogo from "./MonkeyTapLogo";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `text-inactive hover:text-text`
      : `text-inactive hover:text-text`;

  return (
    <nav className="py-2 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
            <MonkeyTapLogo size={40} />
            <span className="text-text text-4xl ml-2">monkeytap</span>
          </NavLink>
          <div className="md:mr-auto items-center flex space-x-5 text-lg">
            <NavLink className={linkClass} to="/settings">
              settings
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
