/* /pages/index.js */
import React, { useState } from "react";

import RestaurantList from "../components/RestaurantList";
import { API_URL } from "../utils/constants";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  gridCont: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem"
  },
  gridContRest: {
    marginTop: "1em"
  }
});

function Home(props) {
  const [query, updateQuery] = useState("");
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.gridCont}>
          <Typography
            gutterBottom={false}
            variant="h4"
            component="h3"
            align="center"
          >
            Choose restaurant
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridCont}>
          <TextField
            onChange={(e) => updateQuery(e.target.value.toLocaleLowerCase())}
            value={query}
            label="Search"
            margin="dense"
          />
        </Grid>
      </Grid>
      <Grid container className={classes.gridContRest}>
        <RestaurantList search={query} data={props.shows} />
      </Grid>
    </>
  );
}
export default Home;

Home.getInitialProps = async (context) => {
  const res = await fetch(`${API_URL}/restaurants/`);
  const data = await res.json();
  const shows = data.map((entry) => entry);
  return { shows };
};
