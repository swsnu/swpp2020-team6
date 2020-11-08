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
    const Props = this.props;
    if (!Props.sign_in_status) {
      Props.getUserAuth();
    }
  }

  render() {
    const Props = this.props;
    return (
      <ConnectedRouter history={Props.history}>
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
  sign_in_status: PropTypes.bool.isRequired,
  getUserAuth: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  return {
    sign_in_status: state.user.is_signed_in,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(actionCreators.getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
