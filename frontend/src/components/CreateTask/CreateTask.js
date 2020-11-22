import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { taskType } from "../../constants";
// import "./CreateTask.scss";

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
    <div className="CreateTask">
      <Box
        className="task"
        flexDirection="column"
        flexWrap="nowrap"
        p={2}
        m={2}
        border="1px solid"
        bgcolor="#FFF4E8"
      >
        <Box className="up-down" display="flex" flexWrap="nowrap" bgcolor="background.paper">
          <button
            className="up-task-button"
            type="button"
            disabled={tmpTaskId === 0}
            onClick={() => clickUpTaskHandler(tmpSectionId, tmpTaskId)}
          >
            Up
          </button>
          <button
            className="down-task-button"
            type="button"
            disabled={tmpTaskId === taskLastId}
            onClick={() => clickDownTaskHandler(tmpSectionId, tmpTaskId)}
          >
            Down
          </button>
        </Box>
        <Box
          className="task-contents"
          flexDirection="column"
          flexWrap="nowrap"
          p={2}
          m={2}
          bgcolor="#FFF4E8"
        >
          <label>Task Title</label>
          <input
            className="task-title"
            type="text"
            value={title}
            onChange={(event) => {
              changeTaskTitleHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
          />
          <br />
          <label>Task Type</label>
          <select
            className="task-type"
            value={type}
            onChange={(event) => {
              return changeTaskTypeHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
          >
            <option value={taskType.BOOK}>Book</option>
            <option value={taskType.WEBSITE}>Website</option>
            <option value={taskType.VIDEO}>Video</option>
            <option value={taskType.PAPER}>Paper</option>
            <option value={taskType.OTHER}>Other</option>
          </select>
          <br />
          <label>Task URL</label>
          <input
            className="task-url"
            type="text"
            value={url}
            onChange={(event) => {
              changeTaskUrlHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
          />
          <br />
          <label>Task Description</label>
          <textarea
            className="task-description"
            type="text"
            value={description}
            onChange={(event) => {
              changeTaskDescriptionHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
          />
        </Box>
        <button
          className="delete-task-button"
          type="button"
          onClick={() => {
            clickDeleteTaskHandler(tmpSectionId, tmpTaskId);
          }}
        >
          Delete Task
        </button>
      </Box>
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
