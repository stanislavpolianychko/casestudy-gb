import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <Grid container direction="column" style={{ minHeight: '100vh' }}>
        <Header userInfo={user} toggleTheme={toggleTheme} />
        <Grid item container style={{ flexGrow: 1 }}>
          <Component {...pageProps} />
        </Grid>
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default MyApp;
