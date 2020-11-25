import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class UpperUserBar extends Component {
  onClickSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  onClickSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  onClickCreateRoadmap = () => {
    const { history } = this.props;
    history.push("/roadmap/create");
  };

  onClickMyPage = () => {
    const { history, selectedUserId } = this.props;
    history.push(`/mypage/${selectedUserId}`);
  };

  render() {
    return (
      <div className="UpperUserBar">
        <button type="button" id="signin-button" onClick={() => this.onClickSignIn()}>
          Sign In
        </button>
        <button type="button" id="signup-button" onClick={() => this.onClickSignUp()}>
          Sign Up
        </button>
        <button
          type="button"
          id="create-roadmap-button"
          onClick={() => this.onClickCreateRoadmap()}
        >
          Create Roadmap
        </button>
        <button type="button" id="my-page-button" onClick={() => this.onClickMyPage()}>
          My Page
        </button>
      </div>
    );
  }
}

UpperUserBar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  selectedUserId: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    selectedUserId: state.user.selectedUser.user_id,
  };
};
export default connect(mapStateToProps, null)(withRouter(UpperUserBar));
