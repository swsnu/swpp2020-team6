import React, { Component } from "react";
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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { IconButton } from "@material-ui/core";
import * as actionCreators from "../../store/actions/index";
import "./RoadmapButtons.scss";

class RoadmapButtons extends Component {
  state = {
    sectionAnchorsCollapse: true,
  };

  onClickEditRoadmap = () => {
    const { history, buttonsRoadmapId } = this.props;
    history.push(`/roadmap/${buttonsRoadmapId}/edit`);
  };

  onClickDuplicateRoadmap = () => {
    const { onDuplicateRoadmap, match } = this.props;
    onDuplicateRoadmap(match.params.id);
  };

  onClickDeleteRoadmap = () => {
    const { onDeleteRoadmap, buttonsRoadmapId } = this.props;
    const yes = window.confirm("Are you sure you want to delete this Roadmap?");
    if (yes) {
      onDeleteRoadmap(buttonsRoadmapId);
    }
  };

  onClickPinRoadmap = () => {
    const { match, toggleRoadmapPin } = this.props;
    toggleRoadmapPin(parseInt(match.params.id, 10));
  };

  onClickLikeRoadmap = () => {
    const { match, toggleRoadmapLike } = this.props;
    toggleRoadmapLike(parseInt(match.params.id, 10));
  };

  render() {
    const {
      selectedUser,
      buttonsRoadmapId,
      isAuthor,
      sectionsNum,
      pinCount,
      likeCount,
    } = this.props;

    const { sectionAnchorsCollapse } = this.state;

    const like = selectedUser.liked_roadmaps.find((roadmap) => roadmap.id === buttonsRoadmapId);
    const likeButton = like !== undefined ? <FavoriteIcon /> : <FavoriteBorderIcon />;
    const pin = selectedUser.pinned_roadmaps.find((roadmap) => roadmap.id === buttonsRoadmapId);
    const pinButton = pin !== undefined ? <BookmarkIcon /> : <BookmarkBorderIcon />;

    const roadmapButtons = isAuthor ? (
      <>
        <Tooltip title="Edit">
          <IconButton
            aria-label="edit"
            id="edit-roadmap-button"
            size="medium"
            onClick={() => this.onClickEditRoadmap()}
          >
            <CreateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            id="delete-roadmap-button"
            size="medium"
            onClick={() => this.onClickDeleteRoadmap()}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </>
    ) : null;

    let sectionAnchors = [];
    for (let i = 1; i <= sectionsNum; i += 1) {
      sectionAnchors = sectionAnchors.concat(
        <a className="section-anchor" href={`#roadmap-section-${i}`}>
          Section
          {` ${i}`}
          <ArrowForwardIosIcon className="arrow-icon" />
        </a>,
      );
    }

    return (
      <div className="RoadmapButtons">
        <div className="roadmap-buttons">
          <Tooltip title="Pin">
            <Badge color="secondary" badgeContent={pinCount} showZero>
              <IconButton
                aria-label="pin"
                id="pin-button"
                size="medium"
                onClick={() => this.onClickPinRoadmap()}
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
                onClick={() => this.onClickLikeRoadmap()}
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
              onClick={() => this.onClickDuplicateRoadmap()}
            >
              <FileCopyIcon />
            </IconButton>
          </Tooltip>
          {roadmapButtons}
        </div>
        <div className="roadmap-anchors">
          <a href="#roadmap-description">
            Description
            <ArrowForwardIosIcon className="arrow-icon" />
          </a>
          <button
            className="section-anchor-button"
            type="button"
            onClick={() => this.setState({ sectionAnchorsCollapse: !sectionAnchorsCollapse })}
          >
            Sections
            {sectionAnchorsCollapse ? (
              <ExpandMoreIcon className="section-anchor-collapse-icon" />
            ) : (
              <ExpandLessIcon className="section-anchor-collapse-icon" />
            )}
          </button>
          <div
            className="section-anchors"
            style={{
              maxHeight: sectionAnchorsCollapse ? "0px" : "30vh",
            }}
          >
            {sectionAnchors}
          </div>
          <a href="#roadmap-comments">
            Comments
            <ArrowForwardIosIcon className="arrow-icon" />
          </a>
        </div>
      </div>
    );
  }
}

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
  sectionsNum: PropTypes.number,
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
