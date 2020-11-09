import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actionCreators from "./store/actions/index";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Home from "./containers/Home";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    const { selectedUser, onGetUserAuth } = this.props;
    if (selectedUser === undefined) {
      onGetUserAuth();
    }
  }

  render() {
    const { selectedUser, history } = this.props;
    if (selectedUser === undefined) {
      return <div className="loading" />;
    }
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Redirect exact from="/" to="/home" />
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  selectedUser: PropTypes.objectOf(PropTypes.any).isRequired,
  onGetUserAuth: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserAuth: () => dispatch(actionCreators.getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
