import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightThemeOptions } from "./theme.ts";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./routes.tsx";
import Footer from "./components/Footer.tsx";

const Root = () => {
  return (
    <ThemeProvider theme={lightThemeOptions}>
      <CssBaseline />
      <React.StrictMode>
        <Box sx={{ pt: "70px" }}>
          <AppRouter />
        </Box>
        <Footer />
      </React.StrictMode>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
