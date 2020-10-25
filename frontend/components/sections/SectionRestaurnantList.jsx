import React, { useState } from "react";
import RestaurantList from "../../components/RestaurantList";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridCont: {
    marginTop: "1em",
    marginLeft: "0.5rem",
    marginRight: "0.5rem"
  },
  gridContRest: {
    marginTop: "1em"
  }
});

const SectionRestaurantList = (props) => {
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
};

export default SectionRestaurantList;
