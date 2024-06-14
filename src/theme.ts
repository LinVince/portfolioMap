import { createTheme } from '@mui/material/styles';

// Light theme options
const lightThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#05A30F",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#757575",
      secondary: "#555555",
    },
  },
 
});

// Dark theme options
const darkThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#05A30F",
    },
    background: {
      default: "#000000",
      paper: "#263126",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
});



export { lightThemeOptions, darkThemeOptions };
