import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer } from "redux-form";
import { eventReducer } from "./reducer/eventReducer";
import userReducer from "./reducer/userReducer";
import setAuthHeader from "./utils/setAuthHeader";
import jwtDecode from "jwt-decode";

import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    event: eventReducer,
    user: userReducer,
    form: reducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.getItem("jwt")) {
  const user = jwtDecode(localStorage.getItem("jwt"));
  const time = Date.now();
  // false case
  if (user.exp * 1000 < time) {
    setAuthHeader(false);
    localStorage.removeItem("jwt");
  }

  //success case
  if (user.exp * 1000 > time) {
    setAuthHeader(localStorage.getItem("jwt"));
    store.dispatch({
      type: "ADD_USER",
      payload: user
    });
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
