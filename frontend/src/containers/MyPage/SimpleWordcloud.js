import React from "react";
import ReactWordcloud from "react-wordcloud";
import React, { Component } from "react";
import PropTypes from "prop-types";

const stubMyPageUserData = {
  my_roadmaps: [
    {
      tags: [
        {
          tag_id: 4,
          tag_name: "test",
        },
        {
          tag_id: 5,
          tag_name: "test",
        },
        {
          tag_id: 6,
          tag_name: "test",
        },
      ],
    },
    {
      tags: [],
    },
  ],
};

const SimpleWordcloud = (props) => {
  const { my_roadmaps } = props.myPageUser;
  const tag = null;
  /*
  my_roadmaps.map(roadmap =>{
    roadmap.tags.map(tag=>{
      tag[tag.tag_name]+=1;
    })
  })
  */
  const words = [
    {
      text: "told",
      value: 64,
    },
    {
      text: "mistake",
      value: 11,
    },
    {
      text: "thought",
      value: 16,
    },
    {
      text: "bad",
      value: 17,
    },
  ];
  return <ReactWordcloud words={words} />;
};

SimpleWordcloud.propTypes = {
  myPageUser: PropTypes.objectOf(PropTypes.any),
};

export default SimpleWordcloud;
