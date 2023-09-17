import "./app/forms/TraductionsYupErrors"

import { AppThemeProvider } from "./app/provider/ThemeProvider";
import { TodoList } from "./app/ui/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <TodoList />
    </AppThemeProvider>
  );
};
