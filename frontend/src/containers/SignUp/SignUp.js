/* Sign Up page.
 * When the user is already signed in, redirect to main page.
 * On valid email, username, password, password-confirm input, the user is signed up to the service.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "../../store/actions/index";
import rotus from "../../misc/rotus.png";
import wallpaper from "../../misc/wallpaper.png";

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
      history.push("/main");
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

    const emailFilled = email !== "";
    const usernameFilled = username !== "";
    const passwordFilled = password !== "";
    const passwordMatch = password === passwordConfirm;

    return (
      <div className="SignUp">
        <div className="left">
          <img src={wallpaper} width="900" height="770" alt="" />
        </div>
        <div className="right">
          <img src={rotus} width="324" height="130" alt="" />
          <h4>Sign up</h4>
          <p>Create your account to explore our service.</p>
          <label>Email</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(event) => this.setState({ email: event.target.value })}
            placeholder="Email"
          />
          <br />
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
          <label>Password Confirm</label>
          <input
            id="password-confirm-input"
            type="password"
            value={passwordConfirm}
            onChange={(event) => this.setState({ passwordConfirm: event.target.value })}
            placeholder="Password Confirm"
          />
          <br />
          <button
            id="signup-button"
            onClick={() => this.onClickSignUp({ email, username, password })}
            type="button"
            disabled={!(emailFilled && usernameFilled && passwordFilled && passwordMatch)}
          >
            Sign Up
          </button>
          <button id="signin-button" onClick={() => this.onClickSignIn()} type="button">
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func,
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
    onSignUp: (userCredentials) => dispatch(actionCreators.signUp(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
