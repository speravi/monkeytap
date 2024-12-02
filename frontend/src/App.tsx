import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import { GameProvider } from "./GameContext";
import SettingsPage from "./Pages/SettingsPage";

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    )
  );
  return (
    <div className="bg-background text-text">
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </div>
  );
};

export default App;
