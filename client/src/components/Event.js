import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { ThumbUp } from "@material-ui/icons";
import { IconButton, Grid } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { connect } from "react-redux";
import { deleteAction, likeAction } from "../action/event";
import CommentArea from "./Comment";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  margin: {
    margin: theme.spacing(2)
  }
}));

function MediaControlCard(props) {
  const { title, desc, time, user, likes, comments, _id } = props.event;
  const classes = useStyles();
  const newTime = Date(time).split(" ");

  const onDelete = id => () => {
    return props.deleteAction(id);
  };

  const onLike = id => () => {
    props.likeAction(id);
  };

  return (
    <Card className={classes.card} style={{ marginBottom: 10 }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Link
                to={{
                  pathname: `/event/update/${_id}`,
                  state: {
                    data: { title, desc, id: _id }
                  }
                }}
              >
                <Typography component="h5" variant="h5" color="secondary">
                  {title.toUpperCase()}
                </Typography>
              </Link>
            </Grid>
            {user.toString() === props.userId.toString() && (
              <Grid item>
                <IconButton color="primary" onClick={onDelete(_id)}>
                  <Clear />
                </IconButton>
              </Grid>
            )}
          </Grid>

          <Typography variant="subtitle1" color="textSecondary">
            {`created at ${newTime[1]} ${newTime[2]} ${newTime[4]}`}
          </Typography>
          <Typography variant="h6">{desc}</Typography>
          <IconButton color="secondary" onClick={onLike(_id)}>
            <ThumbUp fontSize="small" />
          </IconButton>
          {likes.length}
          <Typography variant="subtitle1">comments</Typography>
          {comments.map(comment => {
            return (
              <Typography variant="body1" key={comment._id}>
                {comment.comment}
              </Typography>
            );
          })}
          <CommentArea id={_id} />
        </CardContent>
      </div>
    </Card>
  );
}

const mapStateToProps = state => ({
  userId: state.user.user.id
});

export default connect(
  mapStateToProps,
  { deleteAction, likeAction }
)(MediaControlCard);
