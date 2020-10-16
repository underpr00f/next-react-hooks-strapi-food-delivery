import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .footer-container": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "2.5rem 0 0.5rem",
      margin: "auto"
    },
    "& .nav-mobileButton": {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      "& .nav-mobileButton": {
        display: "block"
      },
      "& .nav-desktop": {
        display: "none"
      }
    },
    "& .nav-menuLeft": {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      "& .MuiSwitch-root": {
        marginRight: 10
      },
      "& .nav-link": {
        color: "#ffffff",
        opacity: 0.5,
        marginRight: theme.spacing(2),
        textTransform: "uppercase",
        textDecoration: "none",
        fontWeight: 500,
        "&:hover": {
          color: "#ffffff",
          opacity: 1,
          textDecoration: "underline"
        }
      },
      [theme.breakpoints.down("xs")]: {
        "&>a": {
          width: "10ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }
    },
    "& .nav-logoutButton": {
      "& button": {
        display: "none"
      },
      [theme.breakpoints.down("xs")]: {
        "& .nav-link": {
          display: "none"
        },
        "& button": {
          display: "inline-flex"
        }
      }
    }
  }
}));

export const MaterialHeader = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </div>
  );
};

MaterialHeader.propTypes = {
  children: PropTypes.node
};
