/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import CartToggle from "./cart/CartToggle";
import { Footer } from "./general/Footer";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "../MUI/Molecules/ButtonLink";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .Toastify__toast--info": {
      background: theme.palette.primary.dark
    }
  },
  menuLeft: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    "& .nav-link": {
      color: "#ffffff",
      opacity: 0.5,
      marginRight: theme.spacing(2),
      textTransform: "uppercase",
      textDecoration: "none",
      fontWeight: 500,
      "&:hover": {
        color: "#ffffff",
        opacity: 1,
        textDecoration: "underline"
      }
    }
  },
  title: {
    flexGrow: 1
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  const title = "Welcome to Nextjs";
  const { user, setUser } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
            h5 {
              color: white;
              padding-top: 11px;
            }
          `}
        </style>
        <AppBar position="static">
          <Toolbar>
            <NavLink name="Home" hrefValue="/" />
            <div className={classes.menuLeft}>
              {user ? (
                <>
                  <CartToggle user={user.username} />
                  <NavLink name={user.username} hrefValue="/cart" />
                  <Link href="/">
                    <a
                      className="nav-link"
                      onClick={() => {
                        logout();
                        setUser(null);
                      }}
                    >
                      Logout
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <CartToggle user={null} />
                  <NavLink name="Sign up" hrefValue="/register" />
                  <NavLink name="Sign in" hrefValue="/login" />
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </header>
      <Container>{props.children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
