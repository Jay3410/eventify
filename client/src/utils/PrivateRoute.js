import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return rest.isAuth === rest.isAllowed ? (
          <Component {...props} />
        ) : (
          <Redirect to={rest.to} />
        );
      }}
    />
  );
};

const mapStateToPropes = state => ({
  isAuth: state.user.isAuthanticate
});

export default connect(mapStateToPropes)(PrivateRoute);
