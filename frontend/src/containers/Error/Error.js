import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

class Error extends Component {
  onClickHome = () => {
    const { history, onResetRoadmapErrorStatus } = this.props;
    history.push("/home");
    onResetRoadmapErrorStatus();
  };

  render() {
    return (
      <div className="Error">
        <div className="buttons">
          <button id="home-button" type="button" onClick={() => this.onClickHome()}>
            Home
          </button>
        </div>
        <div className="header">
          <h1>Oops! Something is wrong!</h1>
        </div>
      </div>
    );
  }
}

Error.propTypes = {
  onResetRoadmapErrorStatus: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetRoadmapErrorStatus: () => dispatch(actionCreators.resetRoadmapErrorStatus_()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Error));
