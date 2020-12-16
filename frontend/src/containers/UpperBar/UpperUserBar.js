import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

import "./UpperUserBar.scss";

class UpperUserBar extends Component {
  onClickSignOut = () => {
    const { onSignOut } = this.props;
    const yes = window.confirm("Are you sure you want to sign out?");
    if (yes) {
      onSignOut();
    }
  };

  onClickCreateRoadmap = () => {
    const { history } = this.props;
    history.push("/roadmap/create");
  };

  onClickMyPage = () => {
    const { history, selectedUser } = this.props;
    if (selectedUser !== undefined) {
      //history.push(`/mypage/${selectedUser.user_id}`);
      window.location.replace(`/mypage/${selectedUser.user_id}`);
    } else {
      window.alert("Please sign in!");
    }
  };

  render() {
    return (
      <div className="UpperUserBar">
        <button
          type="button"
          id="create-roadmap-button"
          onClick={() => this.onClickCreateRoadmap()}
        >
          Create Roadmap
        </button>
        <Tooltip title="My Page">
          <IconButton id="my-page-button" onClick={() => this.onClickMyPage()}>
            <PersonIcon className="icons" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sign Out">
          <IconButton id="signout-button" onClick={() => this.onClickSignOut()}>
            <ExitToAppIcon className="icons" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

UpperUserBar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  selectedUser: PropTypes.objectOf(PropTypes.any),
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(actionCreators.signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpperUserBar));
