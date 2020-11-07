import axios from "axios";
// import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const getSelectedRoadmapSuccess_ = (data) => {
  return { type: actionTypes.GET_SELECTED_ROADMAP_SUCCESS, roadmap: data };
};

export const getSelectedRoadmapFAIL_ = (errStatus) => {
  return { type: actionTypes.GET_SELECTED_ROADMAP_FAIL, errStatus };
};

export const getSelectedRoadmap = (id) => {
  return (dispatch) => {
    return axios
      .get(`/api/roadmap/${id}/`)
      .then((res) => dispatch(getSelectedRoadmapSuccess_(res.data)))
      .catch((err) => dispatch(getSelectedRoadmapFAIL_(err.response.status)));
  };
};
