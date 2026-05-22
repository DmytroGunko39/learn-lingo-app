import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/HomePage";
import TeachersPage from "../pages/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
