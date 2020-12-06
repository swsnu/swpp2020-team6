import React from "react";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import HighlightIcon from "@material-ui/icons/Highlight";

import "./RoadmapLevelIcon.scss";

const RoadmapLevelIcon = (props) => {
  const { roadmapLevel } = props;
  let levelChip;

  if (roadmapLevel === 2) {
    levelChip = (
      <Chip
        id="intermediate-chip"
        icon={<HighlightIcon id="intermediate-icon" />}
        label="Intermediate"
      />
    );
  } else if (roadmapLevel === 3) {
    levelChip = (
      <Chip id="advanced-chip" icon={<OfflineBoltIcon id="advanced-icon" />} label="Advanced" />
    );
  } else {
    levelChip = <Chip id="basic-chip" icon={<ChildCareIcon id="basic-icon" />} label="Basic" />;
  }

  return <div className="RoadmapLevelIcon">{levelChip}</div>;
};

RoadmapLevelIcon.propTypes = {
  roadmapLevel: PropTypes.number,
};

export default RoadmapLevelIcon;
