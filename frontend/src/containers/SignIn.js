import React, { Component } from "react"; // meaning of bracket
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../store/actions/index";

import "./SignIn.scss";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
  };

  onClickSignIn = (userCredentials) => {
    const { onSignIn } = this.props; // TODO
    onSignIn(userCredentials);
  };

  onClickSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  onClickForgotPassword = () => {
    alert("Contact us: rotus@gmail.com");
  };

  onClickSignOut = () => {
    const Props = this.props;
    Props.onSignOut();
  };

  render() {
    const State = this.state; // TODO : camelCase
    // const {username, password} = this.state;

    return (
      <div className="SignIn">
        <label>Username</label>
        <input
          id="username-input"
          type="username"
          value={State.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <label>Password</label>
        <input
          id="password-input"
          type="password"
          value={State.password}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <button
          id="signin-button"
          onClick={() => this.onClickSignIn(State)}
          type="button"
          disabled={!(State.username && State.password)}
        >
          Sign In
        </button>
        <button id="signup-button" onClick={() => this.onClickSignUp()} type="button">
          Sign Up
        </button>
        <button
          id="forgot-password-button"
          onClick={() => this.onClickForgotPassword()}
          type="button"
        >
          Forgot Password
        </button>
        <button id="signout-button" onClick={() => this.onClickSignOut()} type="button">
          Sign Out
        </button>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    is_signed_in: state.user.is_signed_in, // TODO: camelcase
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (userCredentials) => dispatch(actionCreators.signIn(userCredentials)),
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);