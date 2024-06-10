import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ColorModeSwitch from "./components/colorSwitch";
import { lightThemeOptions, darkThemeOptions } from "./theme.ts";

const Root = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      <React.StrictMode>
        <App darkMode={darkMode} />
      </React.StrictMode>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
