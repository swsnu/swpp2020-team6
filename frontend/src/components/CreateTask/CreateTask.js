import React from "react";
import PropTypes from "prop-types";
import LinkIcon from "@material-ui/icons/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import StyledSelect from "../Roadmap/StyledComponents/StyledSelect";
import "./CreateTask.scss";
import taskTypeIcons from "./taskTypeIcons";

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

  const selectItems = taskTypeIcons;

  return (
    <div className="CreateTask">
      <div className="task-type-title-buttons">
        <div className="task-type-select">
          <StyledSelect
            id="task-type"
            value={type}
            onChange={(event) => {
              return changeTaskTypeHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
            items={selectItems}
            customId="task-type"
            label="Type"
          />
        </div>
        <input
          className="task-title"
          type="text"
          value={title}
          placeholder="Task Title"
          onChange={(event) => {
            changeTaskTitleHandler(tmpSectionId, tmpTaskId, event.target.value);
          }}
        />
        <button
          className="up-task-button"
          type="button"
          disabled={tmpTaskId === 0}
          onClick={() => clickUpTaskHandler(tmpSectionId, tmpTaskId)}
        >
          ▲
        </button>
        <button
          className="down-task-button"
          type="button"
          disabled={tmpTaskId === taskLastId}
          onClick={() => clickDownTaskHandler(tmpSectionId, tmpTaskId)}
        >
          ▼
        </button>
      </div>
      <div className="task-url-wrapper">
        <LinkIcon className="link-icon" />
        <input
          className="task-url"
          type="text"
          value={url}
          placeholder="Task URL"
          onChange={(event) => {
            changeTaskUrlHandler(tmpSectionId, tmpTaskId, event.target.value);
          }}
        />
      </div>
      <textarea
        className="task-description"
        value={description}
        placeholder="Task Description"
        onChange={(event) => {
          changeTaskDescriptionHandler(tmpSectionId, tmpTaskId, event.target.value);
        }}
      />
      <button
        className="delete-task-button"
        type="button"
        onClick={() => {
          clickDeleteTaskHandler(tmpSectionId, tmpTaskId);
        }}
      >
        <DeleteIcon className="delete-icon" />
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
