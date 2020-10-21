import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.primary.main
  }
}));

export const MaterialCheckout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      {children}
    </Grid>
  );
};

MaterialCheckout.propTypes = {
  children: PropTypes.node
};
