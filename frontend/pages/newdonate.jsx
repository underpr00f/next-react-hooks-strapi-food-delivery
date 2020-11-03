import React from "react";
import Checkout from "../components/donate/Checkout";
import { MaterialForm } from "../MUI/Organisms/MaterialForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),

    "& .MuiGrid-container": {
      marginTop: theme.spacing(3)
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function NewDonate() {
  return (
    <>
      <MaterialForm>
        <Checkout />
      </MaterialForm>
    </>
  );
}
