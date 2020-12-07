import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from "@material-ui/core";
import * as actionCreators from "../../store/actions/index";
import "./RoadmapButtons.scss";

const RoadmapButtons = (props) => {
  const onClickEditRoadmap = () => {
    const { history, buttonsRoadmapId } = props;
    history.push(`/roadmap/${buttonsRoadmapId}/edit`);
  };

  const onClickDuplicateRoadmap = () => {
    const { onDuplicateRoadmap, match } = props;
    onDuplicateRoadmap(match.params.id);
  };

  const onClickDeleteRoadmap = () => {
    const { onDeleteRoadmap, buttonsRoadmapId } = props;
    onDeleteRoadmap(buttonsRoadmapId);
  };

  const onClickPinRoadmap = () => {
    const { match, toggleRoadmapPin } = props;
    toggleRoadmapPin(parseInt(match.params.id, 10));
  };

  const onClickLikeRoadmap = () => {
    const { match, toggleRoadmapLike } = props;
    toggleRoadmapLike(parseInt(match.params.id, 10));
  };

  // eslint-disable-next-line camelcase
  const { liked_roadmaps, pinned_roadmaps } = props.selectedUser;
  const { buttonsRoadmapId, likeCount, pinCount, commentCount } = props;
  const like = liked_roadmaps.find((roadmap) => roadmap.id === buttonsRoadmapId);
  const likeButton = like !== undefined ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  const pin = pinned_roadmaps.find((roadmap) => roadmap.id === buttonsRoadmapId);
  const pinButton = pin !== undefined ? <BookmarkIcon /> : <BookmarkBorderIcon />;

  const { isAuthor } = props;
  const roadmapButtons = isAuthor ? (
    <div className="roadmap-buttons">
      <Tooltip title="Edit">
        <IconButton
          aria-label="edit"
          id="edit-roadmap-button"
          size="medium"
          onClick={() => onClickEditRoadmap()}
        >
          <CreateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          aria-label="delete"
          id="delete-roadmap-button"
          size="medium"
          onClick={() => onClickDeleteRoadmap()}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </div>
  ) : null;

  return (
    <div className="RoadmapButtons">
      <Tooltip title="Pin">
        <Badge color="secondary" badgeContent={pinCount} showZero>
          <IconButton
            aria-label="pin"
            id="pin-button"
            size="medium"
            onClick={() => onClickPinRoadmap()}
            disabled={isAuthor}
          >
            {pinButton}
          </IconButton>
        </Badge>
      </Tooltip>
      <Tooltip title="Like">
        <Badge color="secondary" badgeContent={likeCount} showZero>
          <IconButton
            aria-label="like"
            id="like-button"
            size="medium"
            onClick={() => onClickLikeRoadmap()}
            disabled={isAuthor}
          >
            {likeButton}
          </IconButton>
        </Badge>
      </Tooltip>
      <Tooltip title="Duplicate">
        <IconButton
          aria-label="duplicate"
          id="duplicate-button"
          size="medium"
          onClick={() => onClickDuplicateRoadmap()}
        >
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
      {roadmapButtons}
    </div>
  );
};

RoadmapButtons.propTypes = {
  buttonsRoadmapId: PropTypes.number,
  isAuthor: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  onDeleteRoadmap: PropTypes.func.isRequired,
  toggleRoadmapLike: PropTypes.func.isRequired,
  toggleRoadmapPin: PropTypes.func.isRequired,
  onDuplicateRoadmap: PropTypes.func.isRequired,

  selectedUser: PropTypes.objectOf(PropTypes.any),
  likeCount: PropTypes.number,
  pinCount: PropTypes.number,
  commentCount: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteRoadmap: (id) => dispatch(actionCreators.deleteRoadmap(id)),
    toggleRoadmapLike: (id) => dispatch(actionCreators.toggleRoadmapLike(id)),
    toggleRoadmapPin: (id) => dispatch(actionCreators.toggleRoadmapPin(id)),
    onDuplicateRoadmap: (id) => dispatch(actionCreators.duplicateRoadmap(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoadmapButtons));
