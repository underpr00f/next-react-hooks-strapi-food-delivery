import React from "react";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import AppContext from "../../../../context/AppContext";
import { errorSlugRestChecker } from "../../../../utils/errorChecker";
import { API_URL } from "../../../../utils/constants";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ButtonLink } from "../../../../MUI/Molecules/ButtonLink";

const useStyles = makeStyles({
  gridCont: {
    marginTop: "1em"
  },
  pageTitle: {
    "& a": {
      fontSize: "inherit"
    }
  },
  cardText: {
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  cardTitle: {
    color: "#000"
  }
});

export default function Dishes(props) {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const classes = useStyles();
  const url = router.asPath;
  let toRestLink = "";

  toRestLink = url.substring(0, url.lastIndexOf("/"));

  if (props.error && props.error.errorCode)
    return props.error.errorMessage || "Error Loading Dishes";
  if (props.data) {
    return (
      <>
        <h1 className={classes.pageTitle}>
          {props.data.name} from{" "}
          <ButtonLink
            hrefValue={toRestLink}
            name={props.data.restaurant.name}
            variant="text"
            color="primary"
          />
        </h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <img
              style={{
                width: "100%",
                height: 250,
                objectFit: "cover",
                objectPosition: "50% 50%"
              }}
              src={
                process.env.NODE_ENV === "production"
                  ? props.data.image.url
                  : `${props.data.image.url}`
              }
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card style={{ margin: "0 10px" }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h3"
                  className={classes.cardTitle}
                >
                  {props.data.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="h3"
                  className={classes.cardTitle}
                >
                  {props.data.description}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="h5"
                  className={classes.cardTitle}
                >
                  ${props.data.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  outline
                  color="primary"
                  variant="contained"
                  onClick={() => appContext.addItem(props.data)}
                >
                  + Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}

export async function getServerSideProps(context) {
  const { slug, slugdish } = context.query;
  const { url } = context.req;

  const res = await fetch(`${API_URL}/dishes?slug=${slugdish}`);
  const data = await errorSlugRestChecker(res, slug);

  return {
    props: data
  };
}
