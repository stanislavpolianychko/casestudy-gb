import SwitchThemeButton from '@/components/SwithThemeButton';
import Logo from '@/components/Logo';
import Paths from '@/enums/paths';
import User from '@/dto/user';
import React from 'react';
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Link,
  Theme,
  useMediaQuery,
} from '@mui/material';

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
    border: '1px solid #6B69D9',
    borderRadius: '10%',
    textDecoration: 'none',
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
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <AppBar position="static">
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.header}>
          <Link href={Paths.Home}>
            <Logo size={logoSize} />
          </Link>
          {userInfo && (
            <Box sx={styles.userInfo}>
              <Link href={Paths.Login} sx={styles.userBox}>
                <Typography
                  sx={styles.userTypography}
                  color="secondary"
                  variant={isMobile ? 'body2' : 'h6'}
                >
                  {userInfo.nickname}
                </Typography>
              </Link>
              <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
