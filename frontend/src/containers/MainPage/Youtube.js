import React from "react";
import YouTube from "react-youtube";
import YouTubeIcon from "@material-ui/icons/YouTube";
import rotus from "../../misc/rotus_letter.png";
import "./Youtube.scss";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

class Youtube extends React.Component {
  state = {
    open: false,
  };

  render() {
    const opts = {
      height: "273",
      width: "448",
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
          <YouTube videoId="zZkiPKhb_Yc" opts={opts} onReady={this._onReady} />
        </div>
        <button type="button" onClick={() => this.setState({ open: !open })}>
          <div className="button-text">
            <p>How to use</p>
            <img src={rotus}></img>
          </div>
          {arrow}
        </button>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Youtube;
