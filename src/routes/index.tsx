import { Route, Routes } from "react-router-dom";

import { Home } from "../app/ui/pages";
import { RequireAuth } from "../app/Auth/RequireAuth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/signup" element={<Home />} />
    </Routes>
  );
};
