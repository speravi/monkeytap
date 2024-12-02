import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div
      className={`container min-h-screen relative flex flex-col justify-between`}
    >
      <div>
        <Navbar />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
