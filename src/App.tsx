import { AppThemeProvider } from "./app/provider/ThemeProvider";

export const App = () => {
  return (
    <AppThemeProvider>
      <div>App</div>
    </AppThemeProvider>
  );
};
