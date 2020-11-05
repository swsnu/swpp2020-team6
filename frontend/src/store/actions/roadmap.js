import axios from "axios";
import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const createRoadmapSuccess = () => {
  return { type: actionTypes.CREATE_ROADMAP };
};

export const createRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios.post("/api/roadmap/", roadmapData).then((res) => {
      dispatch(createRoadmapSuccess(res.data));
      dispatch(push(`/roadmap/${res.data.id}`));
    });
  };
};

export const editRoadmapSuccess = () => {
  return { type: actionTypes.CREATE_ROADMAP };
};

export const editRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios.post(`/api/roadmap/${roadmapData.id}`).then((res) => {
      dispatch(createRoadmapSuccess(res.data));
    });
  };
};
