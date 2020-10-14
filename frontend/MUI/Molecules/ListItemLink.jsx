import CustomLink from "../Atoms/CustomLink";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

export const ListItemLink = ({ name, quantity, hrefValue, price, index }) => {
  const classes = useStyles();
  //   console.log(props);
  return (
    <ListItem
      //   variant={variant || "contained"}
      //   color={color || "primary"}
      //   naked
      component={CustomLink}
      href={hrefValue}
      // as={asValue}
      className={classes.btnLink}
    >
      <ListItemText
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {`${index + 1}. ${name} ($${price}) x ${quantity}`}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};
