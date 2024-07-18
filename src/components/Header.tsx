import React from 'react';
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import User from '@/dto/user';
import SwitchThemeButton from '@/components/SwithThemeButton';

interface HeaderProps {
  userInfo?: User;
  toggleTheme: () => void; // Add this line
}

const Logo: React.FC<{ size: string }> = ({ size }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={'/todo-logo.svg'}
    alt="logo"
    style={{ maxWidth: size, maxHeight: size }}
  />
);

const UserIcon: React.FC<{ size: string }> = ({ size }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/user-sample-icon.svg"
    alt="user logo"
    style={{ maxWidth: size, maxHeight: size }}
  />
);

const Header: React.FC<HeaderProps> = ({ userInfo, toggleTheme }) => {
  // Add toggleTheme here
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const logoSize = isMobile ? '70px' : '90px';
  const imageSize = isMobile ? '50px' : '60px';
  const typographyVariant = isMobile ? 'body1' : 'h6';

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Logo size={logoSize} />
          <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />{' '}
          {/* Pass toggleTheme here */}
          {userInfo && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography sx={{ color: '#959595' }} variant={typographyVariant}>
                {userInfo.email}
              </Typography>
              <UserIcon size={imageSize} />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
