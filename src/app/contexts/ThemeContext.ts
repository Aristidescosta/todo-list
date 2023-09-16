import {
  createContext,
} from "react";


interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as IThemeContextData);