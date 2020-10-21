import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    "& h1, h3, h5": {
      color: theme.palette.secondary.main
    },
    "& .content": {
      flex: "1 0 auto",
      paddingBottom: "5rem",
      backgroundColor: theme.palette.background.default
    },
    "& .Toastify__toast--info": {
      background: theme.palette.primary.dark
    },
    "& footer": {
      flexShrink: 0
    }
  }
}));

export const MaterialLayout = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

MaterialLayout.propTypes = {
  children: PropTypes.node
};
