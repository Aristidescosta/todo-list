import { BrowserRouter } from "react-router-dom";
import "./app/forms/TraductionsYupErrors";

import { AppThemeProvider } from "./app/provider/ThemeProvider";
import { AppRoutes } from "./app/routes";
import { AuthProvider } from "./app/contexts/AuthContext";
import { Login } from "./app/ui/pages/Login";

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <Login>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </Login>
      </AuthProvider>
    </AppThemeProvider>
  );
};
