import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ColorModeSwitch from "./components/ColorSwitch.tsx";
import { lightThemeOptions, darkThemeOptions } from "./theme.ts";
import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store";
import { toggleDarkMode } from "./reducers/darkModeReducer";

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
      <React.StrictMode>
        <RouterProvider router={router} />
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
