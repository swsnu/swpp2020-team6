import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
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
      <Checkbox
        className="task-checkbox"
        checked={checked}
        onChange={() => changeCheckbox(taskId)}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    ) : null;
  // 'task-type' will be changed into icon corresponding to the type

  return (
    <div className="Task">
      <div className="task-check">
        <div className="checkbox-wrapper">{checkbox}</div>
      </div>
      <div className="task-content">
        <div className="task-type-title">
          <div className="task-type">{taskTypeIcons[type].name}</div>
          <div className="task-title">{`task title:${title}`}</div>
        </div>
        <p className="task-url">{`url: ${url}`}</p>
        <p className="task-description">{`description: ${description}`}</p>
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
