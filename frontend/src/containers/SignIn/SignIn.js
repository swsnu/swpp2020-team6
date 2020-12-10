/* Sign In page.
 * When the user is already signed in, redirect to main page.
 * On valid username and password input, the user is signed in to the service.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";
import rotus from "../../misc/rotus.png";
import wallpaper from "../../misc/wallpaper.png";

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
      history.push("/main");
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

  render() {
    const { username, password } = this.state;
    return (
      <div className="SignIn">
        <div className="left">
          <img src={wallpaper} width="800" height="770" alt="" />
        </div>
        <div className="right">
          <img src={rotus} width="324" height="130" alt="" />
          <h4>
            Welcome to
            <span> Rotus!</span>
          </h4>
          <p>Sign in to create and search for roadmaps.</p>
          <label>Username</label>
          <input
            id="username-input"
            type="username"
            value={username}
            onChange={(event) => this.setState({ username: event.target.value })}
            placeholder="Username"
          />
          <br />
          <label>Password</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(event) => this.setState({ password: event.target.value })}
            placeholder="Password"
          />
          <br />
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
          <br />
          <button
            id="forgot-password-button"
            onClick={() => this.onClickForgotPassword()}
            type="button"
          >
            Forgot Password ?
          </button>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func,
  isSignedIn: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (userCredentials) => dispatch(actionCreators.signIn(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
