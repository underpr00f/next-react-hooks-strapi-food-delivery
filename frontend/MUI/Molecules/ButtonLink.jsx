import CustomLink from "../Atoms/CustomLink";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
const useStyles = makeStyles((theme) => ({
  btnLink: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": { backgroundColor: theme.palette.secondary.dark }
  },
  navLink: {
    color: theme.palette.common.white,
    opacity: 0.5,
    marginRight: theme.spacing(2),
    "&.active": {
      opacity: 0.8
    },
    "&:hover": {
      color: theme.palette.common.white,
      opacity: 1
    }
  },
  simpleLink: {
    color: theme.palette.text.primary,
    opacity: 0.5,
    marginRight: theme.spacing(2),
    textTransform: "none",
    "&.active": {
      opacity: 0.8
    },
    "&:hover": {
      color: theme.palette.text.primary,
      opacity: 1
    }
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
export const SimpleLink = ({ name, hrefValue }) => {
  const classes = useStyles();
  return (
    <Link
      variant="button"
      component={CustomLink}
      href={hrefValue}
      className={classes.simpleLink}
    >
      {name}
    </Link>
  );
};
