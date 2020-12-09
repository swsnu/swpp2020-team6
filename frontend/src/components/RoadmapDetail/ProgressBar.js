import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./ProgressBar.scss";

const ProgressBar = (props) => {
  const {
    isAuthor,
    currentProgressStatus,
    onChangeRoadmapProgressStatus,
    progressPercentage,
  } = props;

  let progressBar = null;
  let progressStatus = null;
  let progressDisplay = (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progressPercentage} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(progressPercentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
  let progressButton = null;
  if (isAuthor) {
    switch (currentProgressStatus) {
      case 1:
        progressStatus = "Before Studying";
        progressButton = (
          <div className="progress-change-buttons">
            <button
              id="start-progress-button"
              type="button"
              onClick={() => onChangeRoadmapProgressStatus("start")}
            >
              Start
            </button>
          </div>
        );
        progressDisplay = null;
        break;
      case 2:
        progressStatus = "In Progress";
        progressButton = (
          <div className="progress-change-buttons">
            <button
              id="quit-progress-button"
              type="button"
              onClick={() => onChangeRoadmapProgressStatus("quit")}
            >
              Quit
            </button>
            <button
              id="finish-progress-button"
              type="button"
              onClick={() => onChangeRoadmapProgressStatus("finish")}
            >
              Finish
            </button>
          </div>
        );
        break;
      case 3:
        progressStatus = "Finished";
        progressButton = (
          <div className="progress-change-buttons">
            <button
              id="clear-progress-button"
              type="button"
              onClick={() => onChangeRoadmapProgressStatus("clear")}
            >
              Clear
            </button>
          </div>
        );
        break;
      default:
        break;
    }

    progressBar = (
      <div className="roadmap-progress">
        <div id="progress-display">{progressStatus}</div>
        <div className="progress-display-bar">{progressDisplay}</div>
        {progressButton}
      </div>
    );
  }

  return progressBar;
};

ProgressBar.propTypes = {
  isAuthor: PropTypes.bool.isRequired,
  currentProgressStatus: PropTypes.number.isRequired,
  onChangeRoadmapProgressStatus: PropTypes.func.isRequired,
  progressPercentage: PropTypes.number,
};

export default ProgressBar;
