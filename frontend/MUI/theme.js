import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: {
      paper: "rgba(229, 229, 219, 1)",
      default: "#f6f6f7"
    },
    primary: {
      light: "rgba(120, 130, 135, 1)",
      main: "rgba(68, 64, 67, 1)",
      dark: "rgba(24, 20, 26, 1)",
      contrastText: "rgba(230, 229, 222, 1)"
    },
    secondary: {
      light: "rgba(53, 221, 233, 1)",
      main: "rgba(58, 108, 129, 1)",
      dark: "rgba(19, 24, 42, 1)",
      contrastText: "rgba(229, 229, 219, 1)"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 1)"
    }
  }
  // overrides: {
  //   MuiAppBar: {
  //     root: {
  //       color: "red"
  //     }
  //   }
  // }
  // palette: {
  //   primary: {
  //     light: "#757ce8",
  //     main: "#3f50b5",
  //     dark: "#002884",
  //     contrastText: "#fff"
  //   },
  //   secondary: {
  //     light: "#ff7961",
  //     main: "#f44336",
  //     dark: "#ba000d",
  //     contrastText: "#000"
  //   }
  // },
  // typography: {
  //   h5: {
  //     color: "#fff"
  //   }
  // }
});

export default theme;
