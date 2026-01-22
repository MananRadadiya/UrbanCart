/**
 * URBAN CART - Theme Context
 */

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

export const ThemeContext = createContext();

const THEME_KEY = "urban-cart-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const THEME_COLORS = {
  light: {
    "--bg-primary": "#ffffff",
    "--bg-secondary": "#f8f8f8",
    "--bg-tertiary": "#fafafa",
    "--surface": "#ffffff",
    "--surface-hover": "#f5f5f5",
    "--text-primary": "#111111",
    "--text-secondary": "#666666",
    "--text-muted": "#999999",
    "--border": "#e0e0e0",
    "--border-light": "#f0f0f0",
    "--accent": "#ffd700",
    "--accent-hover": "#ffed4e",
    "--shadow-light": "0 2px 8px rgba(0, 0, 0, 0.04)",
    "--shadow-medium": "0 4px 12px rgba(0, 0, 0, 0.08)",
    "--shadow-heavy": "0 12px 24px rgba(0, 0, 0, 0.12)",
  },
  dark: {
    "--bg-primary": "#0a0a0a",
    "--bg-secondary": "#1a1a1a",
    "--bg-tertiary": "#2a2a2a",
    "--surface": "#1a1a1a",
    "--surface-hover": "#2a2a2a",
    "--text-primary": "#f5f5f5",
    "--text-secondary": "#b0b0b0",
    "--text-muted": "#808080",
    "--border": "#333333",
    "--border-light": "#2a2a2a",
    "--accent": "#ffd700",
    "--accent-hover": "#ffed4e",
    "--shadow-light": "0 2px 8px rgba(0, 0, 0, 0.3)",
    "--shadow-medium": "0 4px 12px rgba(0, 0, 0, 0.5)",
    "--shadow-heavy": "0 12px 24px rgba(0, 0, 0, 0.7)",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  const applyTheme = useCallback((themeName) => {
    const colors = THEME_COLORS[themeName];
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.setAttribute("data-theme", themeName);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME);
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsLoading(false);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === DARK_THEME,
        toggleTheme,
        isLoading,
      }}
    >
      {!isLoading && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
