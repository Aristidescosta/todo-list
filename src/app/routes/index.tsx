import { Routes, Route, Navigate } from "react-router-dom";
import { HomeScreen } from "../ui/pages/HomeScreen";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="/pagina-inicial" element={<HomeScreen />} />
    </Routes>
  );
};