import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderContextType {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const THEME_STORAGE_KEY = 'dumbl-theme';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const systemTheme = useColorScheme() ?? 'light';
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Calculate the actual theme being used
  const actualTheme = theme === 'system' ? systemTheme : theme;

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(storageKey);
        if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
          setThemeState(storedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage:', error);
      } finally {
        setMounted(true);
      }
    };

    loadTheme();
  }, [storageKey]);

  // Save theme to storage when it changes
  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.error('Failed to save theme to storage:', error);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Apply theme to document if running on web
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      root.classList.remove('light', 'dark');
      root.classList.add(actualTheme);
      
      // Also set data attribute for CSS-in-JS libraries
      root.setAttribute('data-theme', actualTheme);
    }
  }, [actualTheme]);

  const value: ThemeProviderContextType = {
    theme,
    systemTheme,
    actualTheme,
    setTheme,
    toggleTheme,
  };

  // Don't render until theme is loaded to prevent flash
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Hook for getting theme-aware styles
export const useThemeStyles = () => {
  const { actualTheme } = useTheme();
  
  return {
    isDark: actualTheme === 'dark',
    isLight: actualTheme === 'light',
    theme: actualTheme,
  };
};