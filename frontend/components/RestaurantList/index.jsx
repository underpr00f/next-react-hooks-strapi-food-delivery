/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { ButtonLink } from "../../MUI/Molecules/ButtonLink";
const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;
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
function RestaurantList(props) {
  const classes = useStyles();
  // const { loading, error, data } = useQuery(QUERY);
  // if (error) return "Error loading restaurants";
  // if restaurants are returned from the GraphQL query, run the filter query
  // and set equal to variable restaurantSearch
  // if (loading) return <h1>Fetching</h1>;
  const { data } = props;
  if (data && data.length) {
    //searchQuery
    const searchQuery = data.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <>
          {searchQuery.map((res) => (
            <Grid item xs={12} sm={6} md={4} key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // top={true}
                    // style={{ height: 250, objectFit: "cover" }}
                    alt={res.name}
                    title={res.name}
                    image={
                      process.env.NODE_ENV === "production"
                        ? res.image[0].url
                        : `${res.image[0].url}`
                    }
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      className={classes.cardTitle}
                    >
                      {res.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.cardText}
                    >
                      {res.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ButtonLink
                      name="View"
                      hrefValue={`/restaurants/[division]/[slug]`}
                      asValue={`/restaurants/${res.division.slug}/${res.slug}`}
                    />
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;
