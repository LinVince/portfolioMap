import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ColorModeSwitch from "./components/ColorSwitch.tsx";
import { lightThemeOptions, darkThemeOptions } from "./theme.ts";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store";
import { toggleDarkMode } from "./reducers/darkModeReducer";
import Logo from "./components/Logo.tsx";
import AppRouter from "./routes.tsx";

const Root = () => {
  const darkMode = useSelector((state: any) => state.darkMode);
  const dispatch = useDispatch();
  const theme = darkMode ? darkThemeOptions : lightThemeOptions;

  const setDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      <Logo />
      <React.StrictMode>
        <AppRouter />
      </React.StrictMode>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
