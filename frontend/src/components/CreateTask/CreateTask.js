import React from "react";
import PropTypes from "prop-types";
import { taskType } from "../../constants";

const CreateTask = (props) => {
  const {
    tmpSectionId,
    tmpTaskId,
    taskLastId,
    title,
    type,
    url,
    description,
    clickDeleteTaskHandler,
    clickUpTaskHandler,
    clickDownTaskHandler,
    changeTaskTitleHandler,
    changeTaskTypeHandler,
    changeTaskUrlHandler,
    changeTaskDescriptionHandler,
  } = props;

  return (
    <div className="create-task">
      <button
        className="create-seaction-up"
        type="button"
        disabled={tmpTaskId === 0}
        onClick={() => clickUpTaskHandler(tmpSectionId, tmpTaskId)}
      >
        Up
      </button>
      <button
        className="create-seaction-down"
        type="button"
        disabled={tmpTaskId === taskLastId}
        onClick={() => clickDownTaskHandler(tmpSectionId, tmpTaskId)}
      >
        Down
      </button>
      <label>Task Title</label>
      <input
        className="create-task-title"
        type="text"
        value={title}
        onChange={(event) => {
          changeTaskTitleHandler(tmpSectionId, tmpTaskId, event.target.value);
        }}
      />
      <label>Task Type</label>
      <select
        className="create-task-type"
        value={type}
        onChange={(event) => {
          changeTaskTypeHandler(tmpSectionId, tmpTaskId, event.target.value);
        }}
      >
        <option value={taskType.BOOK}>Book</option>
        <option value={taskType.WEBSITE}>Website</option>
        <option value={taskType.VIDEO}>Video</option>
        <option value={taskType.PAPER}>Paper</option>
        <option value={taskType.OTHER}>Other</option>
      </select>
      <label>Task URL</label>
      <input
        className="create-task-url"
        type="text"
        value={url}
        onChange={(event) => {
          changeTaskUrlHandler(tmpSectionId, tmpTaskId, event.target.value);
        }}
      />
      <label>Task Description</label>
      <textarea
        className="create-task-description"
        type="text"
        value={description}
        onChange={(event) => {
          changeTaskDescriptionHandler(
            tmpSectionId,
            tmpTaskId,
            event.target.value,
          );
        }}
      />
      <button
        className="delete-task-button"
        type="button"
        onClick={() => {
          clickDeleteTaskHandler(tmpSectionId, tmpTaskId);
        }}
      >
        Delete Task
      </button>
    </div>
  );
};

CreateTask.propTypes = {
  tmpSectionId: PropTypes.number.isRequired,
  tmpTaskId: PropTypes.number.isRequired,
  taskLastId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  clickDeleteTaskHandler: PropTypes.func.isRequired,
  clickUpTaskHandler: PropTypes.func.isRequired,
  clickDownTaskHandler: PropTypes.func.isRequired,
  changeTaskTitleHandler: PropTypes.func.isRequired,
  changeTaskTypeHandler: PropTypes.func.isRequired,
  changeTaskUrlHandler: PropTypes.func.isRequired,
  changeTaskDescriptionHandler: PropTypes.func.isRequired,
};

export default CreateTask;
