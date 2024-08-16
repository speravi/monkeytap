import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const linkClass = ({ isActive }: { isActive: boolean }) =>
  //   isActive
  //     ? "text-serika_dark-inactive hover:text-serika_dark-text font-bold"
  //     : "text-serika_dark-inactive hover:text-serika_dark-text";

  return (
    <nav className="py-2 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
            <img className="h-10 w-auto" src={logo} alt="monkeytap" />
            <span className="text-serika_dark-text text-4xl ml-2">
              monkeytap
            </span>
          </NavLink>
          <div className="md:mr-auto items-center flex space-x-5 text-lg">
            {/* <NavLink to="/about" className={linkClass}>
              About
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
