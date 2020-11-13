import axios from "axios";
import { push, goBack } from "connected-react-router";

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
        switch (error.response.status) {
          case 404:
            alert("No such Roadmap!");
            break;
          case 401:
            alert("Please sign in!");
            break;
          case 400:
            alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(goBack());
        dispatch(getRoadmapFail_());
      });
  };
};
export const createRoadmap_ = (roadmapData) => {
  return { type: actionTypes.CREATE_ROADMAP, roadmapData };
};

export const createRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios
      .post("/api/roadmap/", roadmapData)
      .then((response) => {
        dispatch(createRoadmap_(response.data));
        dispatch(push(`/roadmap/${response.data.id}`));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            break;
          case 400:
            alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(goBack());
      });
  };
};

export const editRoadmap_ = (roadmapData) => {
  return { type: actionTypes.EDIT_ROADMAP, roadmapData };
};

export const editRoadmap = (roadmapId, roadmapData) => {
  return (dispatch) => {
    return axios
      .put(`/api/roadmap/${roadmapId}/`, roadmapData)
      .then((response) => {
        dispatch(editRoadmap_(response.data));
        dispatch(push(`/roadmap/${roadmapId}`));
      })
      .catch((error) => {
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
        dispatch(goBack());
      });
  };
};

export const resetRoadmap_ = () => {
  return {
    type: actionTypes.RESET_ROADMAP,
  };
};

export const deleteRoadmap_ = (roadmapId) => {
  return { type: actionTypes.DELETE_ROADMAP, roadmapId };
};

export const deleteRoadmap = (roadmapId) => {
  return (dispatch) => {
    return axios
      .delete(`/api/roadmap/${roadmapId}/`)
      .then(() => {
        alert("Roadmap successfully deleted!");
        dispatch(deleteRoadmap_(roadmapId));
        dispatch(push(`/home`));
      })
      .catch((error) => {
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
        dispatch(goBack());
      });
  };
};

export const duplicateRoadmap_ = (roadmapData) => {
  return { type: actionTypes.DUPLICATE_ROADMAP, roadmapData };
};

export const duplicateRoadmap = (roadmapId) => {
  return (dispatch) => {
    return axios
      .post(`/api/roadmap/${roadmapId}`)
      .then((response) => {
        duplicateRoadmap_(response.data);
        const edit = confirm("Successfully duplicated! Would you like to edit?");
        if (edit) {
          dispatch(push(`/roadmap/${response.data.id}`));
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            break;
          case 404:
            alert("No such Roadmap!");
            break;
          case 400:
            alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(goBack());
      });
  };
};
