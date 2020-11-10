import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../store/actions/index";

class Error extends Component {
  componentDidMount() {
    const { onResetRoadmapErrorStatus } = this.props;
    onResetRoadmapErrorStatus();
  }

  render() {
    return (
      <div className="Error">
        <div className="header">
          <h1>Oops! Something is wrong!</h1>
        </div>
      </div>
    );
  }
}

Error.propTypes = {
  onResetRoadmapErrorStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetRoadmapErrorStatus: () =>
      dispatch(actionCreators.resetRoadmapErrorStatus_()),
  };
};

export default connect(null, mapDispatchToProps)(Error);
