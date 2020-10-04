import CustomLink from "../Atoms/CustomLink";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
const useStyles = makeStyles((theme) => ({
  btnLink: {
    // color: "#f8f8f8",
    // color: theme.palette.primary.main,
    // "&:hover": { color: "#ffffff" }
  },
  navLink: {
    color: "#ffffff",
    opacity: 0.5,
    marginRight: theme.spacing(2),
    "&.active": {
      opacity: 0.8
    },
    "&:hover": {
      color: "#ffffff",
      opacity: 1
    }
  },
  simpleLink: {
    // color: "#f8f8f8",
    // color: theme.palette.primary.main,
    // "&:hover": { color: "#ffffff" }
  }
}));

export const ButtonLink = ({ name, hrefValue, asValue, color, variant }) => {
  const classes = useStyles();
  return (
    <Button
      variant={variant || "contained"}
      color={color || "primary"}
      naked
      component={CustomLink}
      href={hrefValue}
      as={asValue}
      className={classes.btnLink}
    >
      {name}
    </Button>
  );
};

export const NavLink = ({ name, hrefValue }) => {
  const classes = useStyles();
  return (
    <Link
      variant="button"
      component={CustomLink}
      href={hrefValue}
      className={classes.navLink}
    >
      {name}
    </Link>
  );
};
