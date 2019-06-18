import React from "react";
import Event from "./Event";
import { Container, Fab } from "@material-ui/core";
import { connect } from "react-redux";
import { getEvents } from "../action/event";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <React.Fragment>
        <Container style={{ paddingTop: 30 }}>
          {events.length > 0 ? (
            events.map(event => <Event key={event._id} event={event} />)
          ) : (
            <h3>Loading...</h3>
          )}
        </Container>
        <Link to="/event/create">
          <Fab
            color="secondary"
            style={{ right: 10, bottom: 10, position: "fixed" }}
          >
            <Add fontSize="large" />
          </Fab>
        </Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  events: state.event
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Dashboard);
