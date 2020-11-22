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
    {
      name: (
        <div>
          <Book />
          Book
        </div>
      ),
      value: taskType.BOOK,
    },
    {
      name: (
        <div>
          <PublicOutlined />
          Website
        </div>
      ),
      value: taskType.WEBSITE,
    },
    {
      name: (
        <div>
          <OndemandVideo />
          Video
        </div>
      ),
      value: taskType.VIDEO,
    },
    {
      name: (
        <div>
          <DescriptionOutlined />
          Paper
        </div>
      ),
      value: taskType.PAPER,
    },
    {
      name: (
        <div>
          <TagFacesOutlined />
          Roadmap
        </div>
      ),
      value: taskType.ROADMAP,
    },
    {
      name: (
        <div>
          <EditOutlined />
          Other
        </div>
      ),
      value: taskType.OTHER,
    },
  ];

  return (
    <div className="CreateTask">
      <div className="task">
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
          <label className="task-title-label">Task Title</label>
          <input
            className="task-title"
            type="text"
            value={title}
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
        <div className="task-contents-url">
          <label className="task-url-label">Task URL</label>
          <input
            className="task-url"
            type="text"
            value={url}
            onChange={(event) => {
              changeTaskUrlHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
          />
        </div>
        <div className="task-contents-description">
          <label className="task-description-label">Task Description</label>
          <input
            className="task-description"
            type="text"
            value={description}
            onChange={(event) => {
              changeTaskDescriptionHandler(tmpSectionId, tmpTaskId, event.target.value);
            }}
          />
        </div>
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
