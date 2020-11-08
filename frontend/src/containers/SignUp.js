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
    const State = this.state;

    const emailRegexOne = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+.[a-zA-z]{2,3}$/;
    const emailRegexTwo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+.[a-zA-z]+.[a-zA-z]{2,3}$/;
    const validEmail =
      emailRegexOne.test(State.email) || emailRegexTwo.test(State.email);
    const passwordMatch = State.password === State.passwordConfirm;

    return (
      <div className="SignUpPage">
        Email
        <input
          id="email-input"
          type="text"
          value={State.email}
          onChange={(event) => this.setState({ email: event.target.value })}
        />
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
        Password Confirm
        <input
          id="password-confirm-input"
          type="text"
          value={State.passwordConfirm}
          onChange={
            (event) => this.setState({ passwordConfirm: event.target.value })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
        <button
          id="signin-button"
          onClick={() => this.onClickSignIn()}
          type="button"
        >
          Sign In
        </button>
        <button
          id="signup-button"
          onClick={
            () =>
              this.onClickSignUp({
                email: State.email,
                username: State.username,
                password: State.password,
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
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
    onSignUp: (userCredentials) =>
      dispatch(actionCreators.signUp(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
