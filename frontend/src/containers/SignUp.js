import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/index";

import "./SignUp.scss";

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  };

  componentDidMount() {
    const { isSignedIn, history } = this.props;
    if (isSignedIn === true) {
      alert("You are already signed in. Please sign out first.");
      history.push("/home");
    }
  }

  onClickSignIn = () => {
    const { history } = this.props;
    history.push("/signin");
  };

  onClickSignUp = (userCredentials) => {
    const { onSignUp } = this.props;
    onSignUp(userCredentials);
  };

  render() {
    const { email, username, password, passwordConfirm } = this.state;

    const emailRegexOne = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+.[a-zA-z]{2,3}$/;
    const emailRegexTwo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+.[a-zA-z]+.[a-zA-z]{2,3}$/;
    const validEmail = emailRegexOne.test(email) || emailRegexTwo.test(email);
    const usernameFilled = username !== "";
    const passwordFilled = password !== "";
    const passwordMatch = password === passwordConfirm;

    return (
      <div className="SignUp">
        <h1>Sign Up</h1>
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
        <button
          id="signup-button"
          onClick={() => this.onClickSignUp({ email, username, password })}
          type="button"
          disabled={!(validEmail && usernameFilled && passwordFilled && passwordMatch)}
        >
          Sign Up
        </button>
        <button id="signin-button" onClick={() => this.onClickSignIn()} type="button">
          Sign In
        </button>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  isSignedIn: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (userCredentials) => dispatch(actionCreators.signUp(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
