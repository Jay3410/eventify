import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import UpdateEvent from "./UpdateEvent";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import setAuthHeader from "../utils/setAuthHeader";
import PrivateRoute from "../utils/PrivateRoute";

function App(props) {
  const isSignin = props.isAuth;
  const onSignout = () => {
    setAuthHeader(false);
    localStorage.removeItem("jwt");
    window.location.href = "http://localhost:3000/signin";
  };

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1" className="grow">
            <Link to="/">Eventify</Link>
          </Typography>
          <Link to="/event" style={{ margin: "0 10px" }}>
            <Typography variant="body1" component="h2">
              Events
            </Typography>
          </Link>

          {isSignin && (
            <Button color="inherit" variant="outlined" onClick={onSignout}>
              Sign out
            </Button>
          )}

          {!isSignin && (
            <Link to="/signin">
              <Button color="inherit" variant="outlined">
                Sign in
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={Home}
          isAllowed={false}
          to="/event"
        />
        <PrivateRoute
          exact
          path="/signin"
          component={Signin}
          isAllowed={false}
          to="/event"
        />
        <PrivateRoute
          exact
          path="/signup"
          component={Signup}
          isAllowed={false}
          to="/event"
        />

        {/*private routes*/}
        <PrivateRoute
          exact
          path="/event"
          component={Dashboard}
          to="/signin"
          isAllowed={true}
        />
        <PrivateRoute
          exact
          path="/event/create"
          component={CreateEvent}
          to="/signin"
          isAllowed={true}
        />
        <PrivateRoute
          path="/event/update/:id"
          component={UpdateEvent}
          to="/signin"
          isAllowed={true}
        />

        <Route render={() => <Redirect to="/signin" />} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuthanticate
});

export default connect(mapStateToProps)(App);
