import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

import Roadmap from "../Roadmap/Roadmap";

class EditRoadmap extends Component {
  componentDidMount() {
    const { onGetRoadmap, match } = this.props;
    onGetRoadmap(match.params.id);
  }

  onClickEditBack = () => {
    const { history, onResetRoadmap } = this.props;
    onResetRoadmap();
    history.goBack();
  };

  onClickEditConfirm = (roadmapData) => {
    const { onEditRoadmap, match } = this.props;
    onEditRoadmap(match.params.id, roadmapData);
  };

  render() {
    const { selectedRoadmap, selectedUser, history } = this.props;
    if (selectedUser === undefined) {
      window.alert("Please sign in!");
      return <div />;
    }
    if (selectedRoadmap === undefined) {
      return (
        <div className="EditRoadmap">
          <div className="loading" />
        </div>
      );
    }
    if (selectedRoadmap.author_id !== selectedUser.user_id) {
      window.alert("Only the author can edit the Roadmap!");
      history.goBack();
      return <div />;
    }

    return (
      <div className="EditRoadmap">
        <Roadmap
          isEdit
          onClickBackHandler={this.onClickEditBack}
          onClickConfirmHandler={this.onClickEditConfirm}
          selectedRoadmap={selectedRoadmap}
        />
      </div>
    );
  }
}

EditRoadmap.propTypes = {
  selectedRoadmap: PropTypes.objectOf(PropTypes.any),
  selectedUser: PropTypes.objectOf(PropTypes.any),
  onGetRoadmap: PropTypes.func.isRequired,
  onEditRoadmap: PropTypes.func.isRequired,
  onResetRoadmap: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    selectedRoadmap: state.roadmap.selectedRoadmap,
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (roadmapId) => dispatch(actionCreators.getRoadmap(roadmapId)),
    onEditRoadmap: (roadmapId, roadmapData) =>
      dispatch(actionCreators.editRoadmap(roadmapId, roadmapData)),
    onResetRoadmap: () => dispatch(actionCreators.resetRoadmap_()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditRoadmap));
