import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

import "./App.css";
import SignInPage from "./containers/SignInPage";

class App extends React.Component {
  componentDidMount() {
      if (!this.props.sign_in_status) {
          this.props.getUserAuth();
      }
  }
  render(){
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App" >
          <Switch>
            <Route path='/home' exact render={() => <h1>Home</h1>} />
            <Route path='/signin' exact component = {SignInPage} />
            <Redirect exact from='/' to='signin' />
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </div >
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    sign_in_status: state.user.is_signed_in
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getUserAuth: () =>
      dispatch(actionCreators.getUserAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);