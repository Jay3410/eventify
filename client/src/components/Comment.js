import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { commentAction } from "../action/event";

const CommentArea = props => {
  const { id } = props;
  const [comment, setComment] = useState("");

  const onChange = e => setComment(e.target.value);

  const onComment = () => {
    if (comment.length > 0 && comment.trim()) {
      props.commentAction(id, comment);
      setComment("");
    }
  };
  return (
    <form noValidate>
      <div>
        <TextField
          label="comment"
          multiline
          rowsMax="4"
          variant="outlined"
          value={comment}
          onChange={onChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onComment}
          style={{ margin: "10px" }}
        >
          comment
        </Button>
      </div>
    </form>
  );
};

export default connect(
  null,
  {
    commentAction
  }
)(CommentArea);
