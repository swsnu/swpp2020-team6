import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CreateRoadmap from "./containers/CreateRoadmap";
import EditRoadmap from "./containers/EditRoadmap";
import * as actionCreators from "./store/actions/index";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    const { getUserAuth } = this.props;
    getUserAuth();
  }

  render() {
    const { selectedUser, history } = this.props;

    if (selectedUser === undefined) return <div />;
    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Switch>
            <Route path="/home" exact render={() => <h1>Home</h1>} />
            <Route path="/signin" exact render={() => <h1>Sign In</h1>} />
            <Route
              path="/roadmap/create"
              exact
              render={() => {
                return (
                  <div>
                    <CreateRoadmap />
                  </div>
                );
              }}
            />
            <Route
              path="/roadmap/edit"
              exact
              render={() => {
                return (
                  <div>
                    <EditRoadmap />
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
  selectedUser: PropTypes.objectOf(PropTypes.any).isRequired,
  getUserAuth: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAut: () => dispatch(actionCreators.getUserAuthKHK()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
