import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/index";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
  };

  onClickSignIn = (userCredentials) => {
    const Props = this.props;
    Props.onSignIn(userCredentials);
  };

  render() {
    const State = this.state;

    return (
      <div className="SignInPage">
        Username
        <input
          id="username-input"
          type="text"
          value={State.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        Password
        <input
          id="password-input"
          type="text"
          value={State.password}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <button
          id="signin-button"
          onClick={() => this.onClickSignIn(State)}
          type="button"
        >
          Sign In
        </button>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    is_signed_in: state.user.is_signed_in,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (userCredentials) =>
      dispatch(actionCreators.signIn(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
