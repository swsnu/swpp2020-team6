import axios from "axios";
import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const getRoadmapKHKSuccess_ = (roadmapData) => {
  return { type: actionTypes.GET_ROADMAP_SUCCESS, roadmapData };
};

export const getRoadmapKHKFail_ = (errorStatus) => {
  return { type: actionTypes.GET_ROADMAP_SUCCESS, errorStatus };
};

export const getRoadmapKHK = (roadmapId) => {
  return (dispatch) => {
    return axios
      .get(`/api/roadmap/${roadmapId}`)
      .then((response) => {
        dispatch(getRoadmapKHKSuccess_(response.data));
      })
      .catch((error) => {
        dispatch(getRoadmapKHKFail_(error.response.status));
        switch (error.response.status) {
          case 404:
            dispatch(alert("No such Roadmap!"));
            dispatch(push("/home"));
            break;
          case 400:
            dispatch(alert("Parsing error!"));
            dispatch(push("/home"));
            break;
          default:
            break;
        }
      });
  };
};

export const createRoadmapSuccess_ = () => {
  return { type: actionTypes.EDIT_ROADMAP_SUCCESS };
};

export const createRoadmapFail_ = (errorType, errorStatus) => {
  return { type: errorType, errorStatus };
};

export const createRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios
      .post("/api/roadmap/", roadmapData)
      .then((response) => {
        dispatch(push(`/roadmap/${response.data.id}`));
      })
      .catch((error) => {
        dispatch(createRoadmapFail_(error.response.status));
        switch (error.response.status) {
          case 401:
            alert("Please Sign In!");
            dispatch(push("/signin"));
            break;
          case 400:
            alert("Parsing Error!");
            break;
          default:
            break;
        }
      });
  };
};

export const editRoadmapSuccess_ = () => {
  return { type: actionTypes.CREATE_ROADMAP_SUCCESS };
};

export const editRoadmapFail_ = (errorStatus) => {
  return { type: actionTypes.CREATE_ROADMAP_FAILURE, errorStatus };
};

export const editRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios
      .post(`/api/roadmap/${roadmapData.id}`)
      .then((response) => {
        dispatch(push(`/roadmap/${response.data.id}`));
      })
      .catch((error) => {
        editRoadmapFail_(error.response.status);
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            dispatch(push("/signin"));
            break;
          case 404:
            alert("No such Roadmap!");
            dispatch(push("/home"));
            break;
          case 403:
            alert("Only the author can edit the Roadmap!");
            dispatch(push("/home"));
            break;
          case 400:
            alert("Parsing error!");
            break;
          default:
            break;
        }
      });
  };
};
