import { createTheme } from '@mui/material/styles';

// Cold Blue Light theme options
const lightThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#0d47a1",
      light: "#42a5f5",
      dark: "#051d6b",
    },
    secondary: {
      main: "#0277bd",
      light: "#4fc3f7",
      dark: "#01579b",
    },
    background: {
      default: "#f5f9ff",
      paper: "#e3f2fd",
    },
    text: {
      primary: "#0d2b4a",
      secondary: "#1a4d7a",
    },
  },
});

export { lightThemeOptions };
