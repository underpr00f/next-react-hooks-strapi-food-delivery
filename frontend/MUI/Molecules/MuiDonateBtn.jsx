import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    "& button": {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    }
  }
}));

export const MuiDonateBtn = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.buttons}>{children}</div>;
};

MuiDonateBtn.propTypes = {
  children: PropTypes.node
};
