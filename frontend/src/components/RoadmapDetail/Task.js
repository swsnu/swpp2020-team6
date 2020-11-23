import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

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
      <input
        type="checkbox"
        className="task-checkbox"
        checked={checked}
        onChange={() => changeCheckbox(taskId)}
      />
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeCheckbox: (taskId) => dispatch(actionCreators.changeCheckbox(taskId)),
  };
};

export default connect(null, mapDispatchToProps)(Task);
