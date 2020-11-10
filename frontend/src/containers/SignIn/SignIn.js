import React, { Component } from "react"; // meaning of bracket
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../../store/actions/index";

import "./SignIn.scss";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    const { isSignedIn, history } = this.props;
    if (isSignedIn === true) {
      alert("You are already signed in. Please sign out first.");
      history.push("/home");
    }
  }

  onClickSignIn = (userCredentials) => {
    const { onSignIn } = this.props;
    onSignIn(userCredentials);
  };

  onClickSignUp = () => {
    const { history } = this.props;
    history.push("/signup");
  };

  onClickForgotPassword = () => {
    alert("Contact us: swpprotus@gmail.com");
  };

  onClickSignOut = () => {
    const { onSignOut } = this.props;
    onSignOut();
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="SignIn">
        <h1>Sign In</h1>
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
        <button
          id="signin-button"
          onClick={() => this.onClickSignIn({ username, password })}
          type="button"
          disabled={!(username && password)}
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
    onSignIn: (userCredentials) => dispatch(actionCreators.signIn(userCredentials)),
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);