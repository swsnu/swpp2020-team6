import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

import "./Section.scss";

const Section = (props) => {
  const { title, tasks, isAuthor, progressStatus } = props;
  const taskList = tasks.map((task) => {
    return (
      <Task
        isAuthor={isAuthor}
        progressStatus={progressStatus}
        title={task.task_title}
        type={task.task_type}
        url={task.task_url}
        description={task.task_description}
        checked={task.task_checked}
      />
    );
  });
  return (
    <div className="Section">
      <h3 className="section-title">{`section title: ${title}`}</h3>
      {taskList}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.any).isRequired,
  isAuthor: PropTypes.bool.isRequired,
  progressStatus: PropTypes.number.isRequired,
};

export default Section;
