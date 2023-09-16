import { useCallback, useMemo, useState } from "react";
import { ThemeProvider, Box } from "@mui/material";

import { DarkTheme, LightTheme } from "../theme";
import { ThemeContext } from "../contexts";

interface IThemeContextProps {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IThemeContextProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;
    else return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme} >
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
