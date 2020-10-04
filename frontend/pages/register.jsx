import React, { useState, useEffect, useContext } from "react";
import { registerUser, updateCart } from "../lib/auth";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import { ToastMessage } from "../components/general/ToastMessage";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    if (Object.entries(error).length !== 0 && error.constructor === Object) {
      error.message.map((error) => {
        console.log(error);
        toast.error(ToastMessage(error.messages[0].message));
      });
    }
  }, [error]);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <>
      {/* {Object.entries(error).length !== 0 &&
        error.constructor === Object &&
        error.message.map((error) => {
          toast.info(ToastMessage(error.messages[0].message, "add"));
        })} */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              onChange={(e) => setData({ ...data, username: e.target.value })}
              name="username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={(e) => setData({ ...data, email: e.target.value })}
              name="identifier"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
            />
            <TextField
              onChange={(e) => setData({ ...data, password: e.target.value })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              style={{ float: "right", width: 120 }}
              color="primary"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                registerUser(data.username, data.email, data.password)
                  .then(updateCart)
                  .then((res) => {
                    // set authed user in global context object
                    appContext.setUser(res.data.user);
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    if (error.response && error.response.data) {
                      setError(error.response.data);
                    }
                    setLoading(false);
                  });
              }}
            >
              {loading ? "Loading... " : "Signup"}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Register;
