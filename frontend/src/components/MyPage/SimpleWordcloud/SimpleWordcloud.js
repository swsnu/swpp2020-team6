import React from "react";
import WordCloud from "react-wordcloud";
import PropTypes from "prop-types";

const SimpleWordcloud = (props) => {
  const { myPageUser, selectedUser, tab } = props;
  // eslint-disable-next-line camelcase
  const { my_roadmaps } = myPageUser;
  // eslint-disable-next-line camelcase
  const { pinned_roadmaps } = selectedUser;
  // eslint-disable-next-line camelcase
  const myRoadmaps = tab === 0 ? my_roadmaps : pinned_roadmaps;
  const tags = {};

  // eslint-disable-next-line camelcase
  myRoadmaps.map((roadmap) => {
    roadmap.tags.map((tag) => {
      if (tag.tag_name in tags) {
        tags[tag.tag_name] += 1;
      } else {
        tags[tag.tag_name] = 1;
      }
      return null;
    });
    return null;
  });

  const words = [];
  Object.keys(tags).forEach((key) => {
    words.push({ text: key, value: tags[key] });
  });

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: false,
    deterministic: false,
    fontFamily: "Nunito",
    fontSizes: [20, 60],
    fontStyle: "normal",
    fontWeight: "800",
    padding: 1,
    rotations: 0,
    rotationAngles: [0, 0],
    scale: "sqrt",
    spiral: "archimedean",
  };

  const size = [300, 300];

  return <WordCloud id="worldcloud" options={options} words={words} size={size} />;
};

SimpleWordcloud.propTypes = {
  myPageUser: PropTypes.objectOf(PropTypes.any),
  selectedUser: PropTypes.objectOf(PropTypes.any),
  tab: PropTypes.number.isRequired,
};

export default SimpleWordcloud;
