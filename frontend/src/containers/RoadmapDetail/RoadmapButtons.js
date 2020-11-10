import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const RoadmapButtons = (props) => {
  const Props = props;

  const onClickEditRoadmap = () => {
    Props.history.push(`/roadmap/${Props.roadmapId}/edit`);
  };

  const onClickDuplicateRoadmap = () => {};

  const onClickDeleteRoadmap = () => {
    Props.onDeleteRoadmap(Props.roadmapId);
  };

  const onClickPinRoadmap = () => {};

  const onClickLikeRoadmap = () => {};

  const roadmapButtons = Props.isAuthor ? (
    <div className="roadmap-buttons">
      <button
        type="button"
        id="edit-roadmap-button"
        onClick={() => onClickEditRoadmap()}
      >
        Edit
      </button>
      <button
        type="button"
        id="duplicate-button"
        onClick={() => onClickDuplicateRoadmap()}
      >
        Duplicate
      </button>
      <button
        type="button"
        id="delete-roadmap-button"
        onClick={() => onClickDeleteRoadmap()}
      >
        Delete
      </button>
    </div>
  ) : (
    <div className="roadmap-buttons">
      <button type="button" id="pin-button" onClick={() => onClickPinRoadmap()}>
        Pin
      </button>
      <button
        type="button"
        id="like-button"
        onClick={() => onClickLikeRoadmap()}
      >
        Like
      </button>
      <button
        type="button"
        id="duplicate-button"
        onClick={() => onClickDuplicateRoadmap()}
      >
        Duplicate
      </button>
    </div>
  );
  return roadmapButtons;
};

RoadmapButtons.propTypes = {
  roadmapId: PropTypes.number.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  onDeleteRoadmap: PropTypes.func.isRequired,

  user: PropTypes.objectOf(PropTypes.any).isRequired,
  getSelectedRoadmapErrStatus: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteRoadmap: (id) => dispatch(actionCreators.deleteRoadmap(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    getSelectedRoadmapErrStatus: state.roadmap.errStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadmapButtons);
