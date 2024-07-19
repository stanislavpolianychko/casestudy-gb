import SwitchThemeButton from '@/components/SwithThemeButton';
import Logo from '@/components/Logo';
import Paths from '@/enums/paths';
import React from 'react';
import { Typography, Box, AppBar, Toolbar, Link, Theme } from '@mui/material';
import User from '@/dto/user';

const logoSize = 80;

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    color: '#959595',
  },
  userBox: {
    border: '1px solid black',
    borderRadius: '10%',
  },
  userTypography: {
    padding: '5px 15px',
  },
  toolbar: {
    margin: '0 20px',
  },
};

/**
 * `HeaderProps` interface.
 * This interface defines the props for the `Header` component.
 *
 * @interface
 * @property {Theme} theme - The current theme of the application.
 * @property {User} userInfo - The current logged-in user's information.
 * @property {Function} toggleTheme - Function to toggle the theme of the application.
 */
interface HeaderProps {
  theme: Theme;
  userInfo?: User;
  toggleTheme: () => void;
}

/**
 * `Header` component.
 * This component renders the header of the application.
 * It includes a logo, a theme switch button and user information.
 *
 * @param {Theme} theme - The current theme of the application.
 * @param {User} userInfo - The current logged-in user's information.
 * @param {Function} toggleTheme - Function to toggle the theme of the application.
 *
 * @returns {JSX.Element} The rendered `Header` component.
 */
const Header: React.FC<HeaderProps> = ({
  theme,
  userInfo,
  toggleTheme,
}: HeaderProps): JSX.Element => {
  return (
    <AppBar position="static">
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.header}>
          <Link href={Paths.Login}>
            <Logo size={logoSize} />
          </Link>
          {userInfo && (
            <Box sx={styles.userInfo}>
              <Box sx={styles.userBox}>
                <Typography
                  sx={styles.userTypography}
                  color="secondary"
                  variant="h6"
                >
                  {userInfo.nickname}
                </Typography>
              </Box>
              <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
