import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
      style={{
        background:
          "radial-gradient( circle farthest-corner at 110.5% -0.8%,  rgba(206,176,213,1) 0%, rgba(132,120,181,1) 90% )",
        width: "100vw",
        height: "calc(100vh)",
        color: "white",
        padding: 20
      }}
    >
      <Grid item>
        <Typography variant="h2" align="center">
          Welcome to Eventify
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" color="textSecondary" align="center">
          create and share your events to the world
        </Typography>
      </Grid>
      <Grid item container justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <Button variant="outlined" color="inherit">
            <Link to="/signin">Sign in</Link>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="inherit">
            <Link to="/signup">Sign up</Link>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
