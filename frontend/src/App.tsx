import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";

const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/monkeytap" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route index path="/monkeytap/test" element={<TestPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
