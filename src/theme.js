// src/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define color palette
const primaryMain = '#3f51b5'; // Indigo 500
const primaryLight = '#757de8'; // Indigo 300
const primaryDark = '#002984'; // Indigo 700
const secondaryMain = '#f50057'; // Pink A400
const secondaryLight = '#ff5983'; // Pink A200
const secondaryDark = '#bb002f'; // Pink A700

let theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondaryMain,
      light: secondaryLight,
      dark: secondaryDark,
    },
    background: {
      default: '#f5f5f5', // A light grey background
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '6rem',
      fontWeight: 300,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '3.75rem',
      fontWeight: 300,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '2.125rem',
      fontWeight: 400,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8, // Base spacing unit of 8px
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f5f5f5', // Light grey background for dialog
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMain,
          color: '#ffffff',
          padding: '16px 24px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: primaryMain,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '& .MuiListItem-root': {
            marginBottom: '8px',
          },
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;