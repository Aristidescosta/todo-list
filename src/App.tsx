import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./app/contexts/AuthContext";
import { Login } from "./app/ui/pages/Login";

export const App = () => {
  return (
    <AuthProvider>
      <Login>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Login>
    </AuthProvider>
  );
};
