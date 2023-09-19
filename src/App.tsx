import { AuthProvider } from "./app/contexts/AuthContext";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};
