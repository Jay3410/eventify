import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { Field, reduxForm } from "redux-form";
import RenderPassField from "./reuse/RenderPassField";
import RenderTextField from "./reuse/RenderTextField";
import { connect } from "react-redux";
import { signupAction } from "../action/signup";

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

function Signup(props) {
  const classes = useStyles();
  const { handleSubmit, reset } = props;

  const onFormSubmit = values => {
    const formValues = values;
    // reset(); reset form
    return props.signupAction(formValues, props.history, reset);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onFormSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  name="firstName"
                  component={RenderTextField}
                  label="First Name"
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="lastName"
                  component={RenderTextField}
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field name="email" component={RenderTextField} label="Email" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  component={RenderPassField}
                  label="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password2"
                  component={RenderTextField}
                  label="confirm password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
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
    signupAction
  }
)(
  reduxForm({
    form: "signup"
  })(Signup)
);
