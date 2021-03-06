import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import CreateTask from "../CreateTask/CreateTask";
import "./CreateSection.scss";

const CreateSection = (props) => {
  const {
    tmpSectionId,
    sectionLastId,
    title,
    tasks,
    collapse,
    clickDeleteSectionHandler,
    clickUpSectionHandler,
    clickDownSectionHandler,
    changeSectionTitleHandler,
    clickSectionCollapse,
    clickCreateTaskHandler,
    clickDeleteTaskHandler,
    clickUpTaskHandler,
    clickDownTaskHandler,
    changeTaskTitleHandler,
    changeTaskTypeHandler,
    changeTaskUrlHandler,
    changeTaskDescriptionHandler,
  } = props;

  const Tasks = tasks.map((task, index) => {
    return (
      <CreateTask
        tmpSectionId={tmpSectionId}
        tmpTaskId={index}
        taskLastId={tasks.length - 1}
        title={task.task_title}
        type={task.task_type}
        url={task.task_url}
        description={task.task_description}
        clickDeleteTaskHandler={clickDeleteTaskHandler}
        clickUpTaskHandler={clickUpTaskHandler}
        clickDownTaskHandler={clickDownTaskHandler}
        changeTaskTitleHandler={changeTaskTitleHandler}
        changeTaskTypeHandler={changeTaskTypeHandler}
        changeTaskUrlHandler={changeTaskUrlHandler}
        changeTaskDescriptionHandler={changeTaskDescriptionHandler}
      />
    );
  });

  return (
    <div className="CreateSection">
      <Tooltip title={collapse ? "Expand" : "Collapse"}>
        <button
          className="section-collapse"
          type="button"
          onClick={() => clickSectionCollapse(tmpSectionId)}
        >
          {collapse ? "+" : "-"}
        </button>
      </Tooltip>
      <div className="title-up-down">
        <input
          className="section-title"
          type="text"
          value={title}
          placeholder={`Section ${tmpSectionId + 1} Title`}
          onChange={(event) => {
            changeSectionTitleHandler(tmpSectionId, event.target.value);
          }}
        />
        <button
          className="up-section-button"
          type="button"
          disabled={tmpSectionId === 0}
          onClick={() => clickUpSectionHandler(tmpSectionId)}
        >
          ▲
        </button>
        <button
          className="down-section-button"
          type="button"
          disabled={tmpSectionId === sectionLastId}
          onClick={() => clickDownSectionHandler(tmpSectionId)}
        >
          ▼
        </button>
      </div>
      <div
        className="section"
        style={{ maxHeight: collapse ? "0px" : `${tasks.length * 450 + 100}px` }}
      >
        {Tasks}
        <button
          className="create-task-button"
          type="button"
          onClick={() => {
            clickCreateTaskHandler(tmpSectionId);
          }}
        >
          Create Task
        </button>
      </div>
      <Tooltip title="Delete Section">
        <button
          className="delete-section-button"
          type="button"
          onClick={() => {
            clickDeleteSectionHandler(tmpSectionId);
          }}
        >
          <DeleteIcon className="delete-icon" />
        </button>
      </Tooltip>
    </div>
  );
};

CreateSection.propTypes = {
  tmpSectionId: PropTypes.number.isRequired,
  sectionLastId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickDeleteSectionHandler: PropTypes.func.isRequired,
  clickUpSectionHandler: PropTypes.func.isRequired,
  clickDownSectionHandler: PropTypes.func.isRequired,
  changeSectionTitleHandler: PropTypes.func.isRequired,
  clickSectionCollapse: PropTypes.func.isRequired,
  clickCreateTaskHandler: PropTypes.func.isRequired,
  clickDeleteTaskHandler: PropTypes.func.isRequired,
  clickUpTaskHandler: PropTypes.func.isRequired,
  clickDownTaskHandler: PropTypes.func.isRequired,
  changeTaskTitleHandler: PropTypes.func.isRequired,
  changeTaskTypeHandler: PropTypes.func.isRequired,
  changeTaskUrlHandler: PropTypes.func.isRequired,
  changeTaskDescriptionHandler: PropTypes.func.isRequired,
  collapse: PropTypes.bool.isRequired,
};

export default CreateSection;
