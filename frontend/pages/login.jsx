import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { login } from "../lib/auth";
import AppContext from "../context/AppContext";
import { ToastMessage } from "../components/general/ToastMessage";
import { RenderField } from "../MUI/Atoms/RenderField";
import { ButtonLink } from "../MUI/Molecules/ButtonLink";
import { validateEmailInput } from "../utils/Validators";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  const classes = useStyles();

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = async (e) => {
    setLoading(true);
    login(e.identifier, e.password)
      .then((res) => {
        // set authed User in global context to update header/app state
        appContext.setUserFunc(res.data.user);
        // setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data) {
          setError(error.response.data);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  useEffect(() => {
    if (Object.entries(error).length !== 0 && error.constructor === Object) {
      error.message.map((error) => {
        toast.error(ToastMessage(error.messages[0].message));
      });
    }
  }, [error]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <RenderField
              validationType={register({
                required: true,
                minLength: 3,
                validate: validateEmailInput
              })}
              shortName="Your email"
              nameType="identifier"
              focusField={true}
              errors={errors}
            />
            <RenderField
              validationType={register({
                required: true,
                minLength: 3
              })}
              shortName="Your password"
              nameType="password"
              typeField="password"
              errors={errors}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              {loading ? "Loading... " : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <ButtonLink
                  name={"Forgot password?"}
                  variant="text"
                  color="secondary"
                  hrefValue={`#`}
                  asValue={`#`}
                />
              </Grid>
              <Grid item xs>
                <ButtonLink
                  name={"Don't have an account? Sign Up"}
                  variant="text"
                  color="secondary"
                  hrefValue={`/register`}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
