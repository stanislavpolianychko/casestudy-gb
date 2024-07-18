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
  toggleTheme: () => void;
}

const Logo: React.FC<{ size: string }> = ({ size }) => (
  <img
    src={'/todo-logo.svg'}
    alt="logo"
    style={{ maxWidth: size, maxHeight: size }}
  />
);

const UserIcon: React.FC<{ size: string }> = ({ size }) => (
  <img
    src="/user-sample-icon.svg"
    alt="user logo"
    style={{ maxWidth: size, maxHeight: size }}
  />
);

const Header: React.FC<HeaderProps> = ({ userInfo, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const logoSize = '90px';
  const imageSize = isMobile ? '50px' : '60px';
  const typographyVariant = isMobile ? 'body1' : 'h6';

  return (
    <AppBar sx={{ padding: '15px' }} position="static">
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
          {isMobile && (
            <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
          )}
          {userInfo && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}
            >
              {!isMobile && (
                <SwitchThemeButton theme={theme} toggleTheme={toggleTheme} />
              )}
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
