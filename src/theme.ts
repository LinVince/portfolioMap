import { createTheme } from '@mui/material/styles';

const lightThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#e9653b",
      light: "#f38b67",
      dark: "#a83b24",
    },
    secondary: {
      main: "#345f72",
      light: "#62899a",
      dark: "#1d3c4a",
    },
    background: {
      default: "#f4f1e8",
      paper: "#e9e4d7",
    },
    text: {
      primary: "#17211f",
      secondary: "#5f6a65",
    },
  },
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
});

export { lightThemeOptions };
