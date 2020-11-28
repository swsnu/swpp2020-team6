import React from "react";
import PropTypes from "prop-types";

const RoadmapSimple = (props) => {
  const {
    roadmapID,
    title,
    likeCount,
    commentCount,
    pinCount,
    authorName,
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
      <div className="tags">{tags}</div>
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
  authorName: PropTypes.string,
  tags: PropTypes.objectOf(PropTypes.any),
  onClickTitleHandler: PropTypes.func,
  isMyRoadmap: PropTypes.bool,
};

export default RoadmapSimple;
