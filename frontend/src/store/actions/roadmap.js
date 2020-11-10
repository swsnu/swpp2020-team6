import axios from "axios";
import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const getRoadmapSuccess_ = (roadmapData) => {
  return { type: actionTypes.GET_ROADMAP_SUCCESS, roadmapData };
};

export const getRoadmapFail_ = () => {
  return { type: actionTypes.GET_ROADMAP_FAILURE };
};

export const getRoadmap = (roadmapId) => {
  return (dispatch) => {
    return axios
      .get(`/api/roadmap/${roadmapId}/`)
      .then((response) => {
        dispatch(getRoadmapSuccess_(response.data));
      })
      .catch((error) => {
        dispatch(getRoadmapFail_());
        switch (error.response.status) {
          case 404:
            dispatch(alert("No such Roadmap!"));
            break;
          case 400:
            dispatch(alert("Parsing error!"));
            break;
          default:
            break;
        }
      });
  };
};
export const createRoadmapSuccess_ = () => {
  return { type: actionTypes.CREATE_ROADMAP_SUCCESS };
};

export const createRoadmapFail_ = () => {
  return { type: actionTypes.CREATE_ROADMAP_FAILURE };
};

export const createRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios
      .post("/api/roadmap/", roadmapData)
      .then((response) => {
        dispatch(push(`/roadmap/${response.data.id}`));
      })
      .catch((error) => {
        dispatch(createRoadmapFail_());
        switch (error.response.status) {
          case 401:
            alert("Please Sign In!");
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

export const editRoadmapFail_ = () => {
  return { type: actionTypes.CREATE_ROADMAP_FAILURE };
};

export const editRoadmap = (roadmapId, roadmapData) => {
  return (dispatch) => {
    return axios
      .put(`/api/roadmap/${roadmapId}/`, roadmapData)
      .then(() => {
        dispatch(push(`/roadmap/${roadmapId}`));
      })
      .catch((error) => {
        editRoadmapFail_();
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            break;
          case 404:
            alert("No such Roadmap!");
            break;
          case 403:
            alert("Only the author can edit the Roadmap!");
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

export const resetRoadmapErrorStatus_ = () => {
  return { type: actionTypes.RESET_ROADMAP_ERRORSTATUS };
};

export const resetRoadmap_ = () => {
  return {
    type: actionTypes.RESET_ROADMAP,
  };
};

export const deleteRoadmapSuccess_ = () => {
  return { type: actionTypes.DELETE_ROADMAP_SUCCESS };
};

export const deleteRoadmapFail_ = () => {
  return { type: actionTypes.DELETE_ROADMAP_FAILURE };
};

export const deleteRoadmap = (roadmapId) => {
  return (dispatch) => {
    return axios
      .delete(`/api/roadmap/${roadmapId}/`)
      .then(() => {
        dispatch(deleteRoadmapSuccess_());
        dispatch(push(`/home`)); // <---where?!
      })
      .catch((error) => {
        deleteRoadmapFail_(error.response.status);
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            break;
          case 404:
            alert("No such Roadmap!");
            break;
          case 403:
            alert("Only the author can delete the Roadmap!");
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
