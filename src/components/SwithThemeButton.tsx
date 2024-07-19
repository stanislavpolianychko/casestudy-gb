import LanguageSystem from '@/lang';
import Image from 'next/image';
import React from 'react';
import { IconButton, Theme } from '@mui/material';

const imageSize = 35;

const darkImageSrc = '/theme-dark-icon.svg';
const lightImageSrc = '/theme-light-icon.svg';

// function to get the image source based on the theme
const getThemeImageSrc = (theme: Theme): string => {
  const themeMode = theme.palette.mode;
  if (themeMode === 'light') {
    return lightImageSrc;
  }
  return darkImageSrc;
};

/**
 * `SwitchThemeButtonProps` interface.
 * This interface defines the props for the `SwitchThemeButton` component.
 *
 * @interface
 * @property {Theme} theme - The current theme of the application.
 * @property {Function} toggleTheme - Function to toggle the theme of the application.
 */
interface SwitchThemeButtonProps {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * `SwitchThemeButton` component.
 * This component renders a button to switch the theme of the application.
 *
 * @param {Theme} theme - The current theme of the application.
 * @param {Function} toggleTheme - Function to toggle the theme of the application.
 *
 * @returns {JSX.Element} The rendered `SwitchThemeButton` component.
 */
const SwitchThemeButton: React.FC<SwitchThemeButtonProps> = ({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}): JSX.Element => {
  return (
    <IconButton onClick={toggleTheme}>
      <Image
        src={getThemeImageSrc(theme)}
        width={imageSize}
        height={imageSize}
        alt={LanguageSystem.getTranslation('switchTheme')}
      />
    </IconButton>
  );
};

export default SwitchThemeButton;
