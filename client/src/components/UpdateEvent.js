import React from "react";
import { connect } from "react-redux";

import {
  Typography,
  Grid,
  Button,
  Paper,
  TextField,
  FormHelperText
} from "@material-ui/core";
import { Field, reduxForm } from "redux-form";

import { makeStyles } from "@material-ui/core/styles";

import { updateAction } from "../action/event";

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

class renderForm extends React.Component {
  componentWillMount() {
    this.props.input.value = this.props.placeValue;
  }

  render() {
    const {
      input,
      label,
      autoFocus = false,
      meta: { touched, error },
      type = "text"
    } = this.props;
    return (
      <React.Fragment>
        <TextField
          {...input}
          variant="outlined"
          fullWidth
          error={error && true}
          label={label}
          autoFocus={autoFocus}
          type={type}
        />
        {touched && error && <FormHelperText error>{error}</FormHelperText>}
      </React.Fragment>
    );
  }
}

function UpdateEvent(props) {
  const { handleSubmit, updateAction, history } = props;

  const { title, desc, id } = props.location.state.data;

  const classes = useStyles();

  const onSubmit = id => values => {
    const eventValue = values;
    return updateAction(id, eventValue, history);
  };

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} md={8} className={classes.image} />
        <Grid item xs={12} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="secondary">
              Update Event
            </Typography>
            <form onSubmit={handleSubmit(onSubmit(id))} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    label="Title"
                    component={renderForm}
                    name="title"
                    placeValue={title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    label="Description"
                    component={renderForm}
                    name="desc"
                    placeValue={desc}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default connect(
  null,
  {
    updateAction
  }
)(
  reduxForm({
    form: "updateForm"
  })(UpdateEvent)
);
