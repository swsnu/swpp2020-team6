import React from "react";
import WordCloud from "react-wordcloud";
import PropTypes from "prop-types";

const SimpleWordcloud = (props) => {
  const myRoadmaps = props.myPageUser.my_roadmaps;
  const tags = {};

  myRoadmaps.map((roadmap) => {
    roadmap.tags.map((tag) => {
      if (tag.tag_name in tags) {
        tags[tag.tag_name] += 1;
      } else {
        tags[tag.tag_name] = 1;
      }
    });
  });

  let words = [];
  for (const [key, value] of Object.entries(tags)) {
    words.push({ text: key, value: value });
  }

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
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
};

export default SimpleWordcloud;
