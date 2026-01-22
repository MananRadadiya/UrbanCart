/**
 * URBAN CART - Theme Context
 * 
 * Global theme management for dark/light mode
 * CSS variables only - no hardcoded colors
 * Persistent preference, smooth animations
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

const THEME_KEY = 'urban-cart-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Define color schemes as CSS variables
const THEME_COLORS = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8f8f8',
    '--bg-tertiary': '#fafafa',
    '--surface': '#ffffff',
    '--surface-hover': '#f5f5f5',
    '--text-primary': '#111111',
    '--text-secondary': '#666666',
    '--text-muted': '#999999',
    '--border': '#e0e0e0',
    '--border-light': '#f0f0f0',
    '--accent': '#ffd700',
    '--accent-hover': '#ffed4e',
    '--shadow-light': '0 2px 8px rgba(0, 0, 0, 0.04)',
    '--shadow-medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
    '--shadow-heavy': '0 12px 24px rgba(0, 0, 0, 0.12)',
  },
  dark: {
    '--bg-primary': '#0a0a0a',
    '--bg-secondary': '#1a1a1a',
    '--bg-tertiary': '#2a2a2a',
    '--surface': '#1a1a1a',
    '--surface-hover': '#2a2a2a',
    '--text-primary': '#f5f5f5',
    '--text-secondary': '#b0b0b0',
    '--text-muted': '#808080',
    '--border': '#333333',
    '--border-light': '#2a2a2a',
    '--accent': '#ffd700',
    '--accent-hover': '#ffed4e',
    '--shadow-light': '0 2px 8px rgba(0, 0, 0, 0.3)',
    '--shadow-medium': '0 4px 12px rgba(0, 0, 0, 0.5)',
    '--shadow-heavy': '0 12px 24px rgba(0, 0, 0, 0.7)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LIGHT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? DARK_THEME : LIGHT_THEME);
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsLoading(false);
  }, []);

  // Apply theme colors to document root
  const applyTheme = useCallback((themeName) => {
    const colors = THEME_COLORS[themeName];
    const root = document.documentElement;
    
    // Apply all CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // Set data attribute for CSS selectors if needed
    root.setAttribute('data-theme', themeName);
  }, []);

  // Toggle theme with persistence and animation
  const toggleTheme = useCallback(() => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    
    // Add transition class temporarily for smooth animation
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    
    // Remove transition after animation completes
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  }, [theme, applyTheme]);

  // Set specific theme
  const setThemeMode = useCallback((themeName) => {
    if (themeName === LIGHT_THEME || themeName === DARK_THEME) {
      setTheme(themeName);
      applyTheme(themeName);
      localStorage.setItem(THEME_KEY, themeName);
    }
  }, [applyTheme]);

  const value = {
    theme,
    isDark: theme === DARK_THEME,
    toggleTheme,
    setTheme: setThemeMode,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {!isLoading && children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
