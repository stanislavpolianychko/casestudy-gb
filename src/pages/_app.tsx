import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';
import { Grid, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import SwitchThemeButton from '@/components/SwithThemeButton';
import Header from '@/components/Header'; // Import Header

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(lightTheme);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme,
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header userInfo={user} toggleTheme={toggleTheme} />{' '}
      {/* Pass user to Header */}
      <Grid container direction="column" style={{ minHeight: '100vh' }}>
        <Component {...pageProps} />
      </Grid>
    </ThemeProvider>
  );
}

export default MyApp;
