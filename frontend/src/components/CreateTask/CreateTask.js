import React from "react";
import PropTypes from "prop-types";
import OndemandVideo from "@material-ui/icons/OndemandVideo";
import Book from "@material-ui/icons/Book";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import PublicOutlined from "@material-ui/icons/PublicOutlined";
import TagFacesOutlined from "@material-ui/icons/TagFacesOutlined";
// import { UpIcon, DownIcon } from "../Roadmap/StyledComponents/UpDown";
import { taskType } from "../../constants";
import StyledSelect from "../Roadmap/StyledComponents/StyledSelect";
import "./CreateTask.scss";

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

  const selectItems = [
    { name: <em>Choose type</em>, value: 0 },
    {
      name: (
        <>
          <Book className="task-type-select-item-icon" />
          <label className="task-type-select-item-label">&nbsp;&nbsp;Book</label>
        </>
      ),
      value: taskType.BOOK,
    },
    {
      name: (
        <>
          <PublicOutlined className="task-type-select-item-icon" />
          <label className="task-type-select-item-label">&nbsp;&nbsp;Website</label>
        </>
      ),
      value: taskType.WEBSITE,
    },
    {
      name: (
        <>
          <OndemandVideo className="task-type-select-item-icon" />
          <label className="task-type-select-item-label">&nbsp;&nbsp;Video</label>
        </>
      ),
      value: taskType.VIDEO,
    },
    {
      name: (
        <>
          <DescriptionOutlined className="task-type-select-item-icon" />
          <label className="task-type-select-item-label">&nbsp;&nbsp;Paper</label>
        </>
      ),
      value: taskType.PAPER,
    },
    {
      name: (
        <>
          <TagFacesOutlined className="task-type-select-item-icon" />
          <label className="task-type-select-item-label">&nbsp;&nbsp;Roadmap</label>
        </>
      ),
      value: taskType.ROADMAP,
    },
    {
      name: (
        <>
          <EditOutlined className="task-type-select-item-icon" />
          <label className="task-type-select-item-label">&nbsp;&nbsp;Other</label>
        </>
      ),
      value: taskType.OTHER,
    },
  ];

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
      <input
        className="task-url"
        type="text"
        value={url}
        placeholder="Task URL"
        onChange={(event) => {
          changeTaskUrlHandler(tmpSectionId, tmpTaskId, event.target.value);
        }}
      />
      <input
        className="task-description"
        type="text"
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
