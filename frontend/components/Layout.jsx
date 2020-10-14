/* /components/Layout.js */

import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";
import CartToggle from "./cart/CartToggle";
import { Footer } from "./general/Footer";
import { NavLink } from "../MUI/Molecules/ButtonLink";
import { CustomizedMenus } from "../MUI/Organisms/CustomizedMenus";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    "& .Toastify__toast--info": {
      background: theme.palette.primary.dark
    },
    "& footer": {
      flexShrink: 0
    }
  },
  content: {
    flex: "1 0 auto",

    [theme.breakpoints.down("xs")]: {
      "& .MuiToolbar-root>a": {
        display: "none"
      }
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
  },
  logoutButton: {
    "& button": {
      display: "none"
    },
    [theme.breakpoints.down("xs")]: {
      "& .nav-link": {
        display: "none"
      },
      "& button": {
        display: "inline-flex"
      }
    }
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
      <div className={classes.content}>
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
              <CustomizedMenus />
              <NavLink name="Home" hrefValue="/" />
              <div className={classes.menuLeft}>
                {user ? (
                  <>
                    <CartToggle user={user.username} />
                    <NavLink name={user.username} hrefValue="/my-orders" />
                    <div className={classes.logoutButton}>
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
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        // variant="contained"
                        // color="primary"
                        onClick={() => {
                          logout();
                          setUser(null);
                        }}
                      >
                        <ExitToAppIcon />
                      </IconButton>
                    </div>
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
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
