/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const RoadmapSimple = (props) => {
  const {
    roadmapID,
    title,
    date,
    level,
    likeCount,
    commentCount,
    pinCount,
    progress,
    authorID,
    authorName,
    authorPictureUrl,
    tags,
    onClickTitleHandler,
  } = props;

  return (
    <div className="RoadmapSimple">
      <div className="title">
        <button
          className="title-button"
          type="button"
          onClick={() => onClickTitleHandler(roadmapID)}
        >
          {title}
        </button>
      </div>
      <div className="authorName">{authorName}</div>
      <div className="likeCount">{likeCount}</div>
      <div className="pinCount">{pinCount}</div>
      <div className="commentCount">{commentCount}</div>
      <div clasName="tags">{tags}</div>
    </div>
  );
};

RoadmapSimple.propTypes = {
  roadmapID: PropTypes.number,
  title: PropTypes.string,
  date: PropTypes.string,
  level: PropTypes.number,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  pinCount: PropTypes.number,
  progress: PropTypes.number,
  authorID: PropTypes.number,
  authorName: PropTypes.string,
  authorPictureUrl: PropTypes.string,
  tags: PropTypes.objectOf(PropTypes.any),
  onClickTitleHandler: PropTypes.func,
};

export default RoadmapSimple;
