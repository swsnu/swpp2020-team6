import React from "react";
import PropTypes from "prop-types";
import CreateTask from "../CreateTask/CreateTask";

const CreateSection = (props) => {
  const {
    tmpSectionId,
    sectionLastId,
    title,
    tasks,
    clickDeleteSectionHandler,
    clickUpSectionHandler,
    clickDownSectionHandler,
    changeSectionTitleHandler,
    clickCreateTaskHandler,
    clickDeleteTaskHandler,
    clickUpTaskHandler,
    clickDownTaskHandler,
    changeTaskTitleHandler,
    changeTaskTypeHandler,
    changeTaskUrlHandler,
    changeTaskDescriptionHandler,
  } = props;

  const CreateTasks = tasks.map((task, index) => {
    return (
      <CreateTask
        tmpSectionId={tmpSectionId}
        tmpTaskId={index}
        taskLastId={tasks.length - 1}
        title={task.title}
        type={task.type}
        url={task.url}
        description={task.description}
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
    <div className="create-section">
      <button
        className="create-section-up"
        type="button"
        disabled={tmpSectionId === 0}
        onClick={() => clickUpSectionHandler(tmpSectionId)}
      >
        Up
      </button>
      <button
        className="create-section-down"
        type="button"
        disabled={tmpSectionId === sectionLastId}
        onClick={() => clickDownSectionHandler(tmpSectionId)}
      >
        Down
      </button>
      <label>Section Title</label>
      <input
        className="create-section-title"
        type="text"
        value={title}
        onChange={(event) => {
          changeSectionTitleHandler(tmpSectionId, event.target.value);
        }}
      />
      {CreateTasks}
      <button
        className="create-task-button"
        type="button"
        onClick={() => {
          clickCreateTaskHandler(tmpSectionId);
        }}
      >
        Create Task
      </button>
      <button
        className="delete-section-button"
        type="button"
        onClick={() => {
          clickDeleteSectionHandler(tmpSectionId);
        }}
      >
        Delete Section
      </button>
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
  clickCreateTaskHandler: PropTypes.func.isRequired,
  clickDeleteTaskHandler: PropTypes.func.isRequired,
  clickUpTaskHandler: PropTypes.func.isRequired,
  clickDownTaskHandler: PropTypes.func.isRequired,
  changeTaskTitleHandler: PropTypes.func.isRequired,
  changeTaskTypeHandler: PropTypes.func.isRequired,
  changeTaskUrlHandler: PropTypes.func.isRequired,
  changeTaskDescriptionHandler: PropTypes.func.isRequired,
};

export default CreateSection;
