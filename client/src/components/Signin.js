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
import { connect } from "react-redux";
import RenderTextField from "./reuse/RenderTextField";
import RenderPassField from "./reuse/RenderPassField";
import { signinAction } from "../action/signin";

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

function Signin(props) {
  const classes = useStyles();
  const { handleSubmit, history, signinAction } = props;
  const onSubmit = values => {
    const formValues = values;
    return signinAction(formValues, history);
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={8} className={classes.image} />
      <Grid item xs={12} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field label="Email" component={RenderTextField} name="email" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  component={RenderPassField}
                  label="Password"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} container justify="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
    signinAction
  }
)(
  reduxForm({
    form: "signin"
  })(Signin)
);
