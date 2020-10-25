import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { registerUser, updateCart } from "../lib/auth";
import AppContext from "../context/AppContext";
import { RenderField } from "../MUI/Atoms/RenderField";
import { SubmitButton } from "../MUI/Atoms/SubmitButton";
import { validateEmailInput } from "../utils/Validators";
import { MaterialForm } from "../MUI/Organisms/MaterialForm";
import { ToastMessage } from "../components/general/ToastMessage";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //   const router = useRouter();
  const appContext = useContext(AppContext);
  const classes = useStyles();

  const { register, handleSubmit, reset, errors } = useForm();

  useEffect(() => {
    if (Object.entries(error).length !== 0 && error.constructor === Object) {
      error.message.map((error) => {
        console.log(error);
        toast.error(ToastMessage(error.messages[0].message));
      });
    }
  }, [error]);

  const onSubmit = async (e) => {
    setLoading(true);
    registerUser(e.username, e.identifier, e.password)
      .then(updateCart)
      .then((res) => {
        // set authed user in global context object
        appContext.setUserFunc(res.data.user);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data) {
          setError(error.response.data);
        }
        setLoading(false);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <MaterialForm>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RenderField
                validationType={register({
                  required: true,
                  minLength: 3
                })}
                focusField={true}
                shortName="your username*"
                nameType="username"
                focusField={true}
                errors={errors}
              />
              <RenderField
                validationType={register({
                  required: true,
                  minLength: 3,
                  validate: validateEmailInput
                })}
                shortName="your email*"
                nameType="identifier"
                errors={errors}
              />
              <RenderField
                validationType={register({
                  required: true,
                  minLength: 3
                })}
                shortName="your password*"
                nameType="password"
                typeField="password"
                errors={errors}
              />
              <SubmitButton text={"Signup"} loading={loading} />
            </form>
          </MaterialForm>
        </div>
      </Container>
    </>
  );
};

export default Register;
