import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ColorModeSwitch from "./components/ColorSwitch.tsx";
import { lightThemeOptions, darkThemeOptions } from "./theme.ts";
import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
import useDarkModeStore from "./store.ts";

const Root = () => {
  const { darkMode, setDarkMode } = useDarkModeStore((state: any) => ({
    darkMode: state.darkMode,
    setDarkMode: state.setDarkMode,
  }));

  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
