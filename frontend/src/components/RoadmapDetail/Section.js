import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

import "./Section.scss";

const Section = (props) => {
  const {
    collapse,
    title,
    tasks,
    isAuthor,
    progressStatus,
    clickSectionCollapse,
    tmpSectionId,
    changeCheckbox,
  } = props;
  const taskList = tasks.map((task, id) => {
    return (
      <Task
        taskId={task.task_id}
        isAuthor={isAuthor}
        progressStatus={progressStatus}
        title={task.task_title}
        type={task.task_type}
        url={task.task_url}
        description={task.task_description}
        checked={task.task_checked}
        changeCheckbox={changeCheckbox}
        tmpSectionId={tmpSectionId}
      />
    );
  });
  return (
    <div className="Section">
      <div className="title">
        <button
          className="section-collapse"
          type="button"
          onClick={() => clickSectionCollapse(tmpSectionId)}
        >
          {collapse ? "+" : "-"}
        </button>
        <div className="section-title">{`section title: ${title}`}</div>
      </div>
      <div
        className="section"
        style={{
          maxHeight: collapse ? "0px" : "100vh",
        }}
      >
        {taskList}
      </div>
    </div>
  );
};

Section.propTypes = {
  collapse: PropTypes.bool,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  isAuthor: PropTypes.bool.isRequired,
  progressStatus: PropTypes.number.isRequired,
  clickSectionCollapse: PropTypes.func.isRequired,
  tmpSectionId: PropTypes.number.isRequired,
  changeCheckbox: PropTypes.func.isRequired,
};

export default Section;
