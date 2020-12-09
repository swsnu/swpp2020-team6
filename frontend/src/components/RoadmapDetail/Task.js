/* eslint-disable react/jsx-no-target-blank */

import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import LinkIcon from "@material-ui/icons/Link";
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

  return (
    <div className="Task">
      {checkbox}
      <div className="task-content">
        <div className="task-type-title">
          <div className="task-type">{type ? taskTypeIcons[type].name : null}</div>
          <div className="task-title">{title}</div>
        </div>
        <div className="task-url">
          <LinkIcon className="link-icon" />
          <a href={url} className="url" target="_blank">
            {url}
          </a>
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
