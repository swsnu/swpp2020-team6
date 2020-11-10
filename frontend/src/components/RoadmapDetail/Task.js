import React from "react";
import PropTypes from "prop-types";

const Task = (props) => {
  const { isAuthor, progressStatus, title, type, url, description, checked } = props;
  const checkbox =
    isAuthor && progressStatus === 2 ? (
      <input type="checkbox" className="task-checkbox" checked={checked} disabled />
    ) : null;
  // 'task-type' will be changed into icon corresponding to the type
  return (
    <div className="Task">
      {checkbox}
      <p className="task-type">{`task type:${type}`}</p>
      <p className="task-title">{`task title:${title}`}</p>
      <p className="task-url">{`url: ${url}`}</p>
      <p className="task-description">{`description: ${description}`}</p>
    </div>
  );
};

Task.propTypes = {
  isAuthor: PropTypes.bool.isRequired,
  progressStatus: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Task;
