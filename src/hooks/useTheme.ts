import ThemeTypes from '@/enums/themeTypes';
import lightTheme from '@/theme/light';
import darkTheme from '@/theme/dark';
import AppConfig from '@/config';
import { useState, useEffect, useMemo } from 'react';

/**
 * `useTheme` hook.
 * This hook manages the theme of the application.
 * It gets the theme from local storage and provides a function to toggle the theme.
 *
 * @returns {Theme} theme - The current theme of the application.
 * @returns {Function} toggleTheme - Function to toggle the theme of the application.
 */
function useTheme(): object {
  const [themeType, setThemeType] = useState(ThemeTypes.dark);

  useEffect(() => {
    const storedTheme = localStorage.getItem(
      AppConfig.themeLocalStorageKey,
    ) as ThemeTypes | null;
    if (storedTheme) {
      setThemeType(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(AppConfig.themeLocalStorageKey, themeType);
  }, [themeType]);

  const toggleTheme = () => {
    setThemeType((prevThemeType) =>
      prevThemeType === ThemeTypes.light ? ThemeTypes.dark : ThemeTypes.light,
    );
  };

  const theme = useMemo(
    () => (themeType === ThemeTypes.dark ? darkTheme : lightTheme),
    [themeType],
  );

  return { theme, toggleTheme };
}

export default useTheme;
