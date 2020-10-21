import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: `${theme.palette.primary.dark}`,
    color: `${theme.palette.secondary.contrastText}`,
    "& .footer-container": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "2.5rem 0 0.5rem",
      margin: "auto"
    },
    "& .footer-contact": {
      width: "40%",
      color: `${theme.palette.primary.contrastText}`
    },
    "& .footer-list": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    "& .footer-list a": {
      textDecoration: "none",
      margin: "5px"
    },
    "& .footer-copyright": {
      padding: "3rem 0 0",
      flex: "1 1 100%",
      textAlign: "center",
      opacity: 0.8,
      color: `${theme.palette.primary.contrastText}`
    },
    "& img": {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "50%"
    },
    [theme.breakpoints.down("xs")]: {
      "& .footer-container": {
        flexDirection: "column",
        textAlign: "center"
      },
      "& .footer-list": {
        marginTop: "40px",
        marginBottom: "20px"
      },
      "& .footer-contact": {
        width: "auto",
        "& ul": {
          listStyle: "none",
          padding: 0
        }
      },
      "& .footer-copyright": {
        flex: "none"
      }
    }
  }
}));

export const MaterialFooter = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

MaterialFooter.propTypes = {
  children: PropTypes.node
};
