import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import logoImg from "../../misc/rotus.png";

import "./LogoButton.scss";

class LogoButton extends Component {
  onClickLogo = () => {
    const { history } = this.props;
    history.push("/main");
  };

  render() {
    return (
      <div className="LogoButton">
        <img
          id="logo-button"
          src={logoImg}
          alt="logo"
          height="50px"
          onClick={() => this.onClickLogo()}
        />
      </div>
    );
  }
}

LogoButton.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
export default withRouter(LogoButton);
