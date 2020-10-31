import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class SignInPage extends Component{
    state = {
        username: '',
        password: '',
    }

    signInHandler = userCredentials =>  {
        this.props.onSignIn(userCredentials);
    }

    render(){
        return(
            <div className = "SignInPage">
                <label>Username</label>
                <input id='username-input' type="text" value={this.state.username}
                onChange={(event) => this.setState({ username: event.target.value })} />
                <label>Password</label>
                <input id='password-input' type="text" value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })} />
                <button id='signin-button' onClick={() => this.signInHandler(this.state)}>Sign In</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      is_signed_in: state.user.is_signed_in,
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (userCredentials) =>
            dispatch(actionCreators.signIn(userCredentials)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);