import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import * as actionCreators from "../../store/actions/index";

import Roadmap from "../Roadmap/Roadmap";

class CreateRoadmap extends Component {
  onClickCreateBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  onClickCreateConfirm = (roadmapData) => {
    const { onCreateRoadmap } = this.props;
    onCreateRoadmap({ ...roadmapData, addedTagList: undefined, deletedTagList: undefined });
  };

  render() {
    const { selectedUser, history } = this.props;
    if (selectedUser === undefined) {
      window.alert("Please sign in!");
      history.push("/");
      return <div />;
    }

    return (
      <div className="CreateRoadmap">
        <>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography component="div">
              <h1>Create Roadmap</h1>
              <Roadmap
                isEdit={false}
                onClickBackHandler={this.onClickCreateBack}
                onClickConfirmHandler={this.onClickCreateConfirm}
              />
            </Typography>
          </Container>
        </>
      </div>
    );
  }
}

CreateRoadmap.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any),
  onCreateRoadmap: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateRoadmap: (roadmapData) => dispatch(actionCreators.createRoadmap(roadmapData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateRoadmap));
