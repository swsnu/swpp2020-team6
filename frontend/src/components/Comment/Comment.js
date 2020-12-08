/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UserCard from "../RoadmapDetail/UserCard";

import "./Comment.scss";

const Comment = (props) => {
  const { isAuthor, authorId, authorName, clickEdit, clickDelete, content, history } = props;
  const buttons = isAuthor ? (
    <>
      <IconButton id="edit-comment-button" type="button" onClick={() => clickEdit()}>
        <CreateIcon />
      </IconButton>
      <IconButton id="delete-comment-button" type="button" onClick={() => clickDelete()}>
        <DeleteForeverIcon />
      </IconButton>
    </>
  ) : null;
  return (
    <div className="Comment">
      <div className="comment-author-panel">
        <UserCard authorId={authorId} authorName={authorName} history={history} />
        <div className="comment-author-buttons">{buttons}</div>
      </div>
      <div className="middle-border" />
      <div className="comment-view">{content}</div>
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
