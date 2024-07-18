import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          borderTop: 'none',
          boxShadow: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, Arial, sans-serif',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          backgroundColor: 'white',
          padding: '10px',
          maxHeight: '100px',
          boxShadow: 'none',
          borderBottom: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'black',
          borderColor: 'black',
          boxShadow: 'none',
          backgroundColor: '#fff',
          '&.MuiButton-containedPrimary': {
            backgroundColor: 'blue',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkblue',
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: 'none',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'black', // set the text color here
          '& fieldset': {
            borderColor: 'black', // set the border color here
          },
          '&:hover fieldset': {
            borderColor: 'black',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
        },
      },
    },
  },
  palette: {
    secondary: {
      main: '#6B69D9',
    },
  },
});

export default theme;
