import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useTheme from '@/hooks/useTheme';
import useUser from '@/hooks/useUser';
import AppConfig from '@/config';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { AppProps } from 'next/app';

AppConfig.load();

function TodoApp({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction="column" style={{ minHeight: '100vh' }}>
        <Header theme={theme} userInfo={user} toggleTheme={toggleTheme} />
        <Grid item container style={{ flexGrow: 1 }}>
          <Component {...pageProps} />
        </Grid>
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default TodoApp;
