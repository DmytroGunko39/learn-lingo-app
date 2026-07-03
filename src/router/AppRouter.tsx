import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/HomePage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
