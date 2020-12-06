/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";

const Comment = (props) => {
  const Props = props;
  const buttons = Props.isAuthor ? (
    <div className="comment-buttons">
      <button id="edit-comment-button" type="button" onClick={Props.clickEdit}>
        Edit
      </button>
      <button
        id="delete-comment-button"
        type="button"
        onClick={Props.clickDelete}
      >
        Delete
      </button>
    </div>
  ) : null;
  return (
    <div className="Comment">
      <div className="leftcolumn">{Props.authorPictureUrl}</div>
      <div className="rightcolumn">
        <div className="comment-author-panel">
          <div className="comment-author-name">{Props.authorName}</div>
          <div className="comment-author-buttons">{buttons}</div>
        </div>
        <div className="comment-view">{Props.content}</div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  authorName: PropTypes.string.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  authorPictureUrl: PropTypes.string.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Comment;
