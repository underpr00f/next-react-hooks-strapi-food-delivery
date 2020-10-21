/* /pages/restaurants.js */
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { errorSlugChecker } from "../../../utils/errorChecker";
import { API_URL } from "../../../utils/constants";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { ButtonLink } from "../../../MUI/Molecules/ButtonLink";

const useStyles = makeStyles({
  gridCont: {
    marginTop: "1em"
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

export default function Restaurants(props) {
  const appContext = useContext(AppContext);
  const classes = useStyles();

  if (props.error && props.error.errorCode)
    return props.error.errorMessage || "Error Loading Dishes";
  if (props.data) {
    return (
      <>
        <h1>{props.data.name}</h1>
        <Grid container spacing={1}>
          {props.data.dishes.map((res) => (
            <Grid item xs={12} sm={6} md={4} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardMedia
                  component="img"
                  // top={true}
                  style={{ height: 250, objectFit: "cover" }}
                  alt={res.name}
                  title={res.name}
                  image={
                    process.env.NODE_ENV === "production"
                      ? res.image.url
                      : `${res.image.url}`
                  }
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    className={classes.cardTitle}
                  >
                    <ButtonLink
                      name={res.name}
                      variant="text"
                      color="secondary"
                      hrefValue={`/restaurants/[division]/[slug]/[slugdish]`}
                      asValue={`/restaurants/${props.data.division.slug}/${props.data.slug}/${res.slug}`}
                    />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    className={classes.cardTitle}
                  >
                    ${res.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => appContext.addItem(res)}
                  >
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      // a {
                      //   color: white;
                      // }
                      // a:link {
                      //   text-decoration: none;
                      //   color: white;
                      // }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      // .btn-outline-primary {
                      //   color: #007bff !important;
                      // }
                      // a:hover {
                      //   color: white !important;
                      // }
                      .card-text {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                    `}
                  </style>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}

export async function getServerSideProps(context) {
  const { slug, division } = context.query;
  const res = await fetch(`${API_URL}/restaurants?slug=${slug}`);
  const data = await errorSlugChecker(res, division);

  return {
    props: data
  };
}
