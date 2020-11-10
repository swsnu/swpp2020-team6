import React from "react";
import PropTypes from "prop-types";

const ProgressBar = (props) => {
  const { isAuthor, currentProgressStatus, onChangeRoadmapProgressStatus } = props;
  let progressBar = null;
  let progressDisplay = null;
  let progressButton = null;
  if (isAuthor) {
    switch (currentProgressStatus) {
      case 1:
        progressDisplay = "Before Studying";
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
        break;
      case 2:
        progressDisplay = "In Progress";
        progressButton = (
          <div className="progress-change-buttons">
            <button
              id="quit-progress-btton"
              type="button"
              onClick={() => onChangeRoadmapProgressStatus("quit")}
            >
              Quit
            </button>
            <button
              id="finish-progress-btton"
              type="button"
              onClick={() => onChangeRoadmapProgressStatus("finish")}
            >
              Finsih
            </button>
          </div>
        );
        break;
      case 3:
        progressDisplay = "Finished";
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
        <p id="progress-display">{progressDisplay}</p>
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
};

export default ProgressBar;
