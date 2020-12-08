/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UserCard from "../RoadmapDetail/UserCard";

import "./Comment.scss";

const Comment = (props) => {
  const {
    commentId,
    tmpCommentId,
    isAuthor,
    authorId,
    authorName,
    clickEdit,
    changeEdit,
    clickEditConfirm,
    clickDelete,
    content,
    history,
    edittedComments,
    commentEditMode,
  } = props;

  const buttons = isAuthor ? (
    <>
      <IconButton id="edit-comment-button" type="button" onClick={() => clickEdit(tmpCommentId)}>
        <CreateIcon />
      </IconButton>
      <IconButton
        id="delete-comment-button"
        type="button"
        onClick={() => clickDelete(tmpCommentId, commentId)}
      >
        <DeleteForeverIcon />
      </IconButton>
    </>
  ) : null;

  const commentView =
    commentEditMode && commentEditMode[tmpCommentId] ? (
      <div className="comment-edit">
        <textarea
          className="comment-edit-input"
          value={edittedComments[tmpCommentId]}
          onChange={(event) => changeEdit(tmpCommentId, event.target.value)}
          placeholder="Edit Comment"
        />
        <button
          className="comment-edit-confirm-button"
          type="button"
          disabled={edittedComments[tmpCommentId] === ""}
          onClick={() => clickEditConfirm(tmpCommentId, commentId)}
        >
          Confirm
        </button>
      </div>
    ) : (
      <div className="comment-view">{content}</div>
    );

  return (
    <div className="Comment">
      <div className="comment-author-panel">
        <UserCard authorId={authorId} authorName={authorName} history={history} />
        <div className="comment-author-buttons">{buttons}</div>
      </div>
      <div className="middle-border" />
      {commentView}
    </div>
  );
};

Comment.propTypes = {
  authorName: PropTypes.string,
  authorId: PropTypes.number,
  isAuthor: PropTypes.bool,
  clickEdit: PropTypes.func,
  clickDelete: PropTypes.func,
  content: PropTypes.string,
  onClick: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
};

export default Comment;
