import axios from "axios";
import { SubmissionError } from "redux-form";

export const signupAction = (userData, history, reset) => async dispatch => {
  try {
    const res = await axios.post("/user/signup", userData);
    history.push("/signin");
    reset();
  } catch (e) {
    throw new SubmissionError(e.response.data);
  }
};
