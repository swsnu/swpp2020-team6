import React from "react";
import OndemandVideo from "@material-ui/icons/OndemandVideo";
import Book from "@material-ui/icons/Book";
import DescriptionOutlined from "@material-ui/icons/DescriptionOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import PublicOutlined from "@material-ui/icons/PublicOutlined";
import TagFacesOutlined from "@material-ui/icons/TagFacesOutlined";
import { taskType } from "../../constants";

const taskTypeIcons = [
  { name: <em style={{ color: "#aaaaaa" }}>Choose type</em>, value: 0 },
  {
    name: (
      <>
        <Book className="task-type-select-item-icon" />
        <div className="task-type-select-item-label">&nbsp;&nbsp;Book</div>
      </>
    ),
    value: taskType.BOOK,
  },
  {
    name: (
      <>
        <PublicOutlined className="task-type-select-item-icon" />
        <div className="task-type-select-item-label">&nbsp;&nbsp;Website</div>
      </>
    ),
    value: taskType.WEBSITE,
  },
  {
    name: (
      <>
        <OndemandVideo className="task-type-select-item-icon" />
        <div className="task-type-select-item-label">&nbsp;&nbsp;Video</div>
      </>
    ),
    value: taskType.VIDEO,
  },
  {
    name: (
      <>
        <DescriptionOutlined className="task-type-select-item-icon" />
        <div className="task-type-select-item-label">&nbsp;&nbsp;Paper</div>
      </>
    ),
    value: taskType.PAPER,
  },
  {
    name: (
      <>
        <TagFacesOutlined className="task-type-select-item-icon" />
        <div className="task-type-select-item-label">&nbsp;&nbsp;Roadmap</div>
      </>
    ),
    value: taskType.ROADMAP,
  },
  {
    name: (
      <>
        <EditOutlined className="task-type-select-item-icon" />
        <div className="task-type-select-item-label">&nbsp;&nbsp;Other</div>
      </>
    ),
    value: taskType.OTHER,
  },
];

export default taskTypeIcons;
