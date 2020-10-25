import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const themeLight = createMuiTheme({
  palette: {
    type: "light",
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
      light: "#9cbecf",
      main: "#3a6c81",
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
});

export const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    // common: { black: "#000", white: "#fff" },
    background: {
      paper: "#383838",
      default: "#1f1f1f"
    },
    primary: {
      light: "#434343",
      main: "#1c1c1c",
      dark: "#000000",
      contrastText: "#bbbbbb"
    },
    secondary: {
      light: "#ff8aaa",
      main: "#dd587c",
      dark: "#a7234f",
      contrastText: "#1a1a1a"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "#bbbbbb",
      // secondary: "#434343",
      // disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 1)"
    }
  }
});

// export const themeDark = createMuiTheme({
//   palette: {
//     type: "dark",
//     common: { black: "#000", white: "#fff" },
//     background: {
//       paper: "rgba(229, 229, 219, 1)",
//       default: "#f6f6f7"
//     },
//     primary: {
//       light: "rgba(53, 221, 233, 1)",
//       main: "rgba(58, 108, 129, 1)",
//       dark: "rgba(19, 24, 42, 1)",
//       contrastText: "rgba(229, 229, 219, 1)"
//     },
//     secondary: {
//       light: "rgba(120, 130, 135, 1)",
//       main: "rgba(68, 64, 67, 1)",
//       dark: "rgba(24, 20, 26, 1)",
//       contrastText: "rgba(230, 229, 222, 1)"
//     },
//     error: {
//       light: "#e57373",
//       main: "#f44336",
//       dark: "#d32f2f",
//       contrastText: "#fff"
//     },
//     text: {
//       primary: "rgba(0, 0, 0, 0.87)",
//       secondary: "rgba(0, 0, 0, 0.54)",
//       disabled: "rgba(0, 0, 0, 0.38)",
//       hint: "rgba(0, 0, 0, 1)"
//     }
//   }
// });
export const theme = (isDark) => {
  if (isDark) {
    return themeDark;
  } else {
    return themeLight;
  }
};
