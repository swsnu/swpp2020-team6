import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import CreateTask from "../CreateTask/CreateTask";
// import "./CreateSection.scss";

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
      <Box
        className="section"
        flexDirection="column"
        flexWrap="nowrap"
        p={2}
        m={2}
        border="1px solid"
        bgcolor="background.paper"
      >
        <Box
          className="up-down"
          flexDirection="column"
          flexWrap="nowrap"
          p={2}
          m={2}
          bgcolor="#FFF4E8"
        >
          <button
            className="up-section-button"
            type="button"
            disabled={tmpSectionId === 0}
            onClick={() => clickUpSectionHandler(tmpSectionId)}
          >
            Up
          </button>
          <button
            className="down-section-button"
            type="button"
            disabled={tmpSectionId === sectionLastId}
            onClick={() => clickDownSectionHandler(tmpSectionId)}
          >
            Down
          </button>
        </Box>
        <label>Section Title</label>
        <input
          className="section-title"
          type="text"
          value={title}
          onChange={(event) => {
            changeSectionTitleHandler(tmpSectionId, event.target.value);
          }}
        />
        <Box
          className="tasks"
          flexDirection="column"
          flexWrap="nowrap"
          p={2}
          m={2}
          bgcolor="#FFF4E8"
        >
          {Tasks}
        </Box>
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
      </Box>
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
