import { createMuiTheme } from "@material-ui/core/styles";
import { red, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: grey["500"],
      main: grey["700"],
      dark: grey["900"],
      contrastText: "#fff",
    },
    secondary: {
      light: red["500"],
      main: red["700"],
      dark: red["900"],
      contrastText: "#fff",
    },
    openTitle: red["500"],
    protectedTitle: grey["300"],
    type: "light",
  },
});

export default theme;
