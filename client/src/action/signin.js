import { SubmissionError } from "redux-form";
import axios from "axios";
import setAuthHeader from "../utils/setAuthHeader";
import jwtDecoder from "jwt-decode";

export const signinAction = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/user/signin", userData);
    localStorage.setItem("jwt", res.data.token);
    setAuthHeader(res.data.token);
    const user = jwtDecoder(res.data.token);
    dispatch({
      type: "ADD_USER",
      payload: user
    });
    history.push("/events");
  } catch (e) {
    throw new SubmissionError(e.response.data);
  }
};
