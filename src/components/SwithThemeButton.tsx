import React from 'react';
import { IconButton, Theme } from '@mui/material';

interface SwitchThemeButtonProps {
  theme: Theme;
  toggleTheme: () => void;
}

const SwitchThemeButton: React.FC<SwitchThemeButtonProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <IconButton onClick={toggleTheme}>
      <img
        src={
          theme.palette.mode === 'light'
            ? '/theme-dark-icon.svg'
            : '/theme-light-icon.svg'
        }
      />
    </IconButton>
  );
};

export default SwitchThemeButton;
