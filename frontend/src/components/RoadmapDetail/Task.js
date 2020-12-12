/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import LinkIcon from "@material-ui/icons/Link";
import Tooltip from "@material-ui/core/Tooltip";
import taskTypeIcons from "../CreateTask/taskTypeIcons";

import "./Task.scss";

const Task = (props) => {
  const {
    taskId,
    isAuthor,
    progressStatus,
    title,
    type,
    url,
    description,
    checked,
    changeCheckbox,
  } = props;

  const checkbox =
    isAuthor && progressStatus === 2 ? (
      <div className="task-check">
        <div className="checkbox-wrapper">
          <Checkbox
            className="task-checkbox"
            checked={checked}
            onChange={() => changeCheckbox(taskId)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      </div>
    ) : null;
  // 'task-type' will be changed into icon corresponding to the type

  const validUrl = url.length >= 4 && url.substring(0, 4) === "http";

  return (
    <div className="Task">
      {checkbox}
      <div className="task-content">
        <div className="task-title">{title}</div>
        <div className="task-url">
          <div className="task-type">{type ? taskTypeIcons[type].name : null}</div>
          <LinkIcon className="link-icon" />
          <Tooltip title={validUrl ? "Go to Link" : "Invalid URL"}>
            <a
              href={validUrl ? url : null}
              className={`url-${validUrl ? "valid" : "invalid"}`}
              target="_blank"
              disabled={validUrl}
            >
              {url}
            </a>
          </Tooltip>
        </div>
        <div className="task-description">{description}</div>
      </div>
    </div>
  );
};

Task.propTypes = {
  taskId: PropTypes.number.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  progressStatus: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  changeCheckbox: PropTypes.func.isRequired,
};

export default Task;
