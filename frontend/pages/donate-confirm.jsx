import React from "react"
import Checkout from "../components/donate/Checkout"
import { ButtonLink } from "../MUI/Molecules/ButtonLink"
import { MaterialForm } from "../MUI/Organisms/MaterialForm"
import { makeStyles } from "@material-ui/core/styles"
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
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
}))

export default function DonateConfirm() {
  const classes = useStyles()
  return (
    <>
      <MaterialForm>
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Typography variant="h5" gutterBottom>
              Thank you for your donate.
                </Typography>
            <Typography variant="subtitle1">
              You so cool!
            </Typography>
            <ButtonLink name="Home" hrefValue={`/`} />
          </Paper>
        </main>
      </MaterialForm>
    </>
  )
}
