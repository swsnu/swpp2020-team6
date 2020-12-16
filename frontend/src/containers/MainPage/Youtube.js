import React from "react";
import YouTube from "react-youtube";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import rotus from "../../misc/rotus_letter.png";
import "./Youtube.scss";

class Youtube extends React.Component {
  state = {
    open: false,
  };

  render() {
    const opts = {
      height: "312",
      width: "512",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    const { open } = this.state;
    const arrow = open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />;
    return (
      <div className="Youtube">
        <div className={open ? "open-video" : "close-video"}>
          <YouTube videoId="zZkiPKhb_Yc" opts={opts} />
        </div>
        <button
          className="side-button"
          type="button"
          onClick={() => this.setState({ open: !open })}
        >
          <div className="button-text">
            <p>How to use</p>
            <img alt="rotus logo" src={rotus} />
          </div>
          {arrow}
        </button>
      </div>
    );
  }
}

export default Youtube;
