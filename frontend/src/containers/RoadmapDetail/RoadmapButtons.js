import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

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
  const { buttonsRoadmapId } = props;
  const like = liked_roadmaps.find((roadmap) => roadmap.id === buttonsRoadmapId);
  const likeButtonText = like !== undefined ? "Unlike" : "Like";
  const pin = pinned_roadmaps.find((roadmap) => roadmap.id === buttonsRoadmapId);
  const pinButtonText = pin !== undefined ? "Unpin" : "Pin";

  const { isAuthor } = props;
  const roadmapButtons = isAuthor ? (
    <div className="roadmap-buttons">
      <button type="button" id="edit-roadmap-button" onClick={() => onClickEditRoadmap()}>
        Edit
      </button>
      <button type="button" id="duplicate-button" onClick={() => onClickDuplicateRoadmap()}>
        Duplicate
      </button>
      <button type="button" id="delete-roadmap-button" onClick={() => onClickDeleteRoadmap()}>
        Delete
      </button>
    </div>
  ) : (
    <div className="roadmap-buttons">
      <button type="button" id="pin-button" onClick={() => onClickPinRoadmap()}>
        {pinButtonText}
      </button>
      <button type="button" id="like-button" onClick={() => onClickLikeRoadmap()}>
        {likeButtonText}
      </button>
      <button type="button" id="duplicate-button" onClick={() => onClickDuplicateRoadmap()}>
        Duplicate
      </button>
    </div>
  );
  return roadmapButtons;
};

RoadmapButtons.propTypes = {
  buttonsRoadmapId: PropTypes.number.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  onDeleteRoadmap: PropTypes.func.isRequired,
  toggleRoadmapLike: PropTypes.func.isRequired,
  toggleRoadmapPin: PropTypes.func.isRequired,
  onDuplicateRoadmap: PropTypes.func.isRequired,

  selectedUser: PropTypes.objectOf(PropTypes.any).isRequired,
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
