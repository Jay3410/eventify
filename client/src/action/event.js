import { SubmissionError } from "redux-form";
import axios from "axios";

// get events
export const getEvents = () => async dispatch => {
  const res = await axios.get("/event");
  dispatch({
    type: "GET_EVENT",
    payload: res.data
  });
};

// create event
export const createAction = (event, history) => async dispatch => {
  try {
    const create = await axios.post("/event/create", event);
    history.push("/event");
  } catch (e) {
    throw new SubmissionError(e.response.data);
  }
};

// delete event with id
export const deleteAction = id => async dispatch => {
  const deleteEvent = await axios.delete(`/event/delete/${id}`);
  const res = await axios.get("/event");
  dispatch({
    type: "GET_EVENT",
    payload: res.data
  });
};

// update event with id
export const updateAction = (id, event, history) => async dispatch => {
  try {
    const updateEvent = await axios.put(`/event/update/${id}`, event);
    history.push("/event");
  } catch (e) {
    throw new SubmissionError(e.response.data);
  }
};

// like event with id
export const likeAction = id => async dispatch => {
  const likeEvent = await axios.put(`/event/like/${id}`);
  const res = await axios.get("/event");
  dispatch({
    type: "GET_EVENT",
    payload: res.data
  });
};

// comment event with id
export const commentAction = (id, comment) => async dispatch => {
  const commentEvent = await axios.put(`/event/comment/${id}`, { comment });
  const res = await axios.get("/event");
  dispatch({
    type: "GET_EVENT",
    payload: res.data
  });
};
