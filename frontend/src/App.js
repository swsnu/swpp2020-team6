import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CreateRoadmap from "./containers/CreateRoadmap/CreateRoadmap";
import EditRoadmap from "./containers/EditRoadmap/EditRoadmap";
import * as actionCreators from "./store/actions/index";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import Home from "./containers/Home/Home";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    const { isSignedIn, onGetUserAuth } = this.props;
    if (isSignedIn === undefined) {
      onGetUserAuth();
    }
  }

  render() {
    const { isSignedIn, history, selectedUser } = this.props;
    if (isSignedIn === undefined) {
      // eslint-disable-next-line no-debugger
      debugger;
      return <div className="loading" />;
    }
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route
              path="/roadmap/create"
              exact
              render={() => {
                return (
                  <div>
                    <CreateRoadmap selectedUser={selectedUser} />
                  </div>
                );
              }}
            />
            <Route
              path="/roadmap/:id/edit"
              exact
              render={() => {
                return (
                  <div>
                    <EditRoadmap selectedUser={selectedUser} />
                  </div>
                );
              }}
            />
            <Redirect exact from="/" to="/home" />
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  selectedUser: PropTypes.objectOf(PropTypes.any).isRequired,
  onGetUserAuth: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.isSignedIn,
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserAuth: () => dispatch(actionCreators.getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
