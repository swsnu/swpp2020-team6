import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/index";

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  };

  onClickSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  onClickSignUp = (userCredentials) => {
    const Props = this.props;
    Props.onSignUp(userCredentials);
  };

  render() {
    const { email, username, password, passwordConfirm } = this.state;

    const emailRegexOne = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+.[a-zA-z]{2,3}$/;
    const emailRegexTwo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+.[a-zA-z]+.[a-zA-z]{2,3}$/;
    const validEmail = emailRegexOne.test(email) || emailRegexTwo.test(email);
    const passwordMatch = password === passwordConfirm;

    return (
      <div className="SignUp">
        <label>Email</label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <label>Username</label>
        <input
          id="username-input"
          type="username"
          value={username}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <label>Password</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <label>Password Confirm</label>
        <input
          id="password-confirm-input"
          type="password"
          value={passwordConfirm}
          onChange={(event) => this.setState({ passwordConfirm: event.target.value })}
        />
        <button id="signin-button" onClick={() => this.onClickSignIn()} type="button">
          Sign In
        </button>
        <button
          id="signup-button"
          onClick={() => this.onClickSignUp({ email, username, password })}
          type="button"
          disabled={!(validEmail && passwordMatch)}
        >
          Sign Up
        </button>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    is_signed_in: state.user.is_signed_in,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (userCredentials) => dispatch(actionCreators.signUp(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
