import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
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

  const taskList = tasks.map((task) => {
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
      />
    );
  });
  return (
    <div className="Section">
      <div className="title">
        <Tooltip title={collapse ? "Expand" : "Collapse"}>
          <IconButton
            className="section-collapse"
            onClick={() => clickSectionCollapse(tmpSectionId)}
          >
            {collapse ? <AddOutlinedIcon /> : <RemoveOutlinedIcon />}
          </IconButton>
        </Tooltip>
        <div className="section-title">{`${tmpSectionId + 1}. ${title}`}</div>
      </div>
      <div
        className="section"
        style={{
          maxHeight: collapse ? "0px" : `${tasks.length}000px`,
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
