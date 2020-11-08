import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/index";

class Home extends Component {
  state = {};

  onClickSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  onClickSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  onClickSignOut = () => {
    const Props = this.props;
    Props.onSignOut();
  };

  render() {
    const State = this.state;

    return (
      <div className="SignInPage">
        <button
          id="signin-button"
          onClick={() => this.onClickSignIn(State)}
          type="button"
        >
          Sign In
        </button>
        <button
          id="signup-button"
          onClick={() => this.onClickSignUp()}
          type="button"
        >
          Sign Up
        </button>
        <button
          id="signout-button"
          onClick={() => this.onClickSignOut()}
          type="button"
        >
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
    is_signed_in: state.user.is_signed_in,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
