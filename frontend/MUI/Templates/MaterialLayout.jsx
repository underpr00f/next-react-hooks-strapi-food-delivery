import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    "& .content": {
      flex: "1 0 auto",
      marginBottom: "5rem"
    },
    "& .Toastify__toast--info": {
      background: theme.palette.primary.dark
    },
    // "& h3": {
    //   color: theme.palette.primary.dark
    // },
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
