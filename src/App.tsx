import { AppThemeProvider } from "./app/provider/ThemeProvider";
import { TodoList } from "./app/ui/components";
import "./app/forms/TraductionsYupErrors"

export const App = () => {
  return (
    <AppThemeProvider>
      <TodoList />
    </AppThemeProvider>
  );
};
