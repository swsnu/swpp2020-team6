import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/index";

import "./Home.scss";

class Home extends Component {
  onClickSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  onClickSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  onClickSignOut = () => {
    const { onSignOut } = this.props;
    onSignOut();
  };

  render() {
    return (
      <div className="Home">
        <h1>Home</h1>
        <button id="signin-button" onClick={() => this.onClickSignIn()} type="button">
          Sign In
        </button>
        <button id="signup-button" onClick={() => this.onClickSignUp()} type="button">
          Sign Up
        </button>
        <button id="signout-button" onClick={() => this.onClickSignOut()} type="button">
          Sign Out
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
    // TODO: bring roadmaps to show in my_roadmap tab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
