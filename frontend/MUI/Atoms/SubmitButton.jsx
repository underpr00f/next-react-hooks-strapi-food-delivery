import React from "react";
import { LoaderContent } from "./Loaders/LoaderContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  btnLink: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,

    width: "100%",
    "&.MuiButton-outlined": {
      backgroundColor: "transparent",
      color: theme.palette.text.primary
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.common.white
    }
  },
  btnLinkSignUp: {
    float: "right",
    width: 120
  }
}));
export const SubmitButton = ({ text, loading, fullWidth }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={`${classes.btnLink} ${!fullWidth && classes.btnLinkSignUp}`}
        disabled={loading}
        type="submit"
      >
        {loading ? <LoaderContent /> : `${text}`}
      </Button>
    </>
  );
};

export const FuncButton = ({
  text,
  loading,
  fullWidth,
  funcBtn,
  variantBtn
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={`${classes.btnLink} ${!fullWidth && classes.btnLinkSignUp}`}
        disabled={loading}
        onClick={funcBtn}
        variant={variantBtn || "contained"}
      >
        {loading ? <LoaderContent /> : `${text}`}
      </Button>
    </>
  );
};
