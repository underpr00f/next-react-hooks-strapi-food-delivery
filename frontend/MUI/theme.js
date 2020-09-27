import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8EB1C7"
    },
    secondary: {
      main: "#cccccc"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  },
  typography: {
    h5: {
      color: "#fff"
    }
  }
});

export default theme;
