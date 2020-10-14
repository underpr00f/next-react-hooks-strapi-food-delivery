import React from "react";
import { BottomNavigationAction } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import Link from "next/link";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#fff",
    opacity: "0.85",
    borderRadius: "0",
    textDecoration: "none",
    "&:hover": {
      // increase the specificity for the pseudo class
      color: "#fff",
      opacity: "1"
    }
  }
}));
export const BottomNavItem = ({ text, value }) => {
  const classes = useStyles();
  return (
    <Link href={value} as={value} prefetch={false}>
      <a className={classes.link} itemProp="url" title="title of hyperlink">
        {text}
      </a>
    </Link>
  );
};
