import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import theme from '../theme/light';
import { Grid } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction="column" style={{ minHeight: '100vh' }}>
        <Component {...pageProps} />
      </Grid>
    </ThemeProvider>
  );
}

export default MyApp;
