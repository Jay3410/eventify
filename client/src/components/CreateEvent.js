import React from "react";
import { Typography, Grid, Button, Avatar, Paper } from "@material-ui/core";
import RenderTextField from "./reuse/RenderTextField";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { createAction } from "../action/event";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    background: "url(https://source.unsplash.com/random) center/cover no-repeat"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function CreateEvent(props) {
  const { handleSubmit, createAction, history } = props;
  const classes = useStyles();

  const onSubmit = values => {
    const eventValue = values;
    return createAction(eventValue, history);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} md={8} className={classes.image} />
      <Grid item xs={12} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Event
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field label="Title" component={RenderTextField} name="title" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  label="Description"
                  component={RenderTextField}
                  name="desc"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  create
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default connect(
  null,
  {
    createAction
  }
)(
  reduxForm({
    form: "createEvent"
  })(CreateEvent)
);
