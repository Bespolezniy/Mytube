import { createMuiTheme } from "@material-ui/core/styles"
import { blue, deepOrange } from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue["300"],
      main: blue["400"],
      dark: blue["500"],
      contrastText: "#fff",
    },
    secondary: {
      light: deepOrange["300"],
      main: deepOrange["400"],
      dark: deepOrange["500"],
      contrastText: "#000",
    },
    openTitle: blue["400"],
    protectedTitle: deepOrange["400"],
    type: "light"
  }
})

export default theme