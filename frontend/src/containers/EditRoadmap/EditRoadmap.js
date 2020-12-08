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

  componentWillUnmount() {
    const { onResetEditRoadmap } = this.props;
    onResetEditRoadmap();
  }

  onClickEditBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  onClickEditConfirm = (roadmapData) => {
    const { onEditRoadmap, match } = this.props;
    onEditRoadmap(match.params.id, roadmapData);
  };

  render() {
    const { selectedEditRoadmap, selectedUser, history } = this.props;
    if (selectedUser === undefined) {
      return <div />;
    }
    if (selectedEditRoadmap === undefined) {
      return (
        <div className="EditRoadmap">
          <div className="loading" />
        </div>
      );
    }
    if (selectedEditRoadmap.author_id !== selectedUser.user_id) {
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
          selectedEditRoadmap={selectedEditRoadmap}
        />
      </div>
    );
  }
}

EditRoadmap.propTypes = {
  selectedEditRoadmap: PropTypes.objectOf(PropTypes.any),
  selectedUser: PropTypes.objectOf(PropTypes.any),
  onGetRoadmap: PropTypes.func.isRequired,
  onEditRoadmap: PropTypes.func.isRequired,
  onResetEditRoadmap: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    selectedEditRoadmap: state.roadmap.selectedEditRoadmap,
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRoadmap: (roadmapId) => dispatch(actionCreators.getRoadmap(roadmapId)),
    onEditRoadmap: (roadmapId, roadmapData) =>
      dispatch(actionCreators.editRoadmap(roadmapId, roadmapData)),
    onResetEditRoadmap: () => dispatch(actionCreators.resetEditRoadmap_()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditRoadmap));
