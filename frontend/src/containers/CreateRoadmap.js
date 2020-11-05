import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

class CreateRoadmap extends Component {
  state = {
    title: "",
    level: 0,
    sections: [],
    authorname: this.props.selectedUser.username,
  };

  onClickLevel = (num) => {
    this.setState({ level: num });
  };

  onClickCreateSection = () => {};

  onClickDeleteSection = () => {};

  onClickCreateTask = () => {};

  onClickDeleteTask = () => {};

  onClickCreateBack = () => {};

  onClickCreateConfirm = () => {
    onCreateRoadmap();
  };

  render() {
    const State = this.state;

    return (
      <div className="CreateRoadmap">
        <h1>Create Roadmap</h1>
        <div className="Roadmap">
          <input
            id="roadmap-title"
            type="text"
            value={State.title}
            onChange={(event) => this.setState({ title: event.target.value })}
          />
          <input
            type="radio"
            id="roadmap-level-basic"
            onClick={() => {
              onClickLevel(0);
            }}
            checked
          />
          <input
            type="radio"
            id="roadmap-level-intermediate"
            onClick={() => {
              onClickLevel(1);
            }}
          />
          <input
            type="radio"
            id="roadmap-level-advanced"
            onClick={() => {
              onClickLevel(2);
            }}
          />
          <div className="Section">
            <button
              id="create-section-button"
              onClick={() => onClickCreateSection()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateRoadmap: (roadmapData) =>
      dispatch(actionCreators.createRoadmap(roadmapData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateRoadmap));
