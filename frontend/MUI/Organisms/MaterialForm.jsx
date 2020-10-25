import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: theme.palette.text.primary
    },
    "& .MuiOutlinedInput-input": {
      boxShadow: "none",

      "&:-webkit-autofill": {
        WebkitTextFillColor: theme.palette.text.primary,
        WebkitBoxShadow: `0 0 0 30px ${theme.palette.primary.light} inset !important`,
        "&:hover,:focus,:active": {
          WebkitTextFillColor: theme.palette.text.primary,
          WebkitBoxShadow: `0 0 0 30px ${theme.palette.primary.light} inset !important`
        }
      }
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.primary
    },
    "& .MuiFormLabel-root.MuiInputLabel-shrink": {
      color: theme.palette.text.primary
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.text.primary
    }
  }
}));

export const MaterialForm = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.form}>{children}</div>;
};

MaterialForm.propTypes = {
  children: PropTypes.node
};
