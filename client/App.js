import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader";

import { ThemeProvider } from "@material-ui/styles";

import theme from "./utils/theme";
import MainRouter from "./router/MainRouter";

const App = () => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
