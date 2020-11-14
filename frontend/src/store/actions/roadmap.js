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
            alert("No such Roadmap!!!!");
            break;
          case 401:
            alert("Please sign in!");
            break;
          case 400:
            alert("Parsing error!@");
            break;
          default:
            break;
        }
        dispatch(goBack());
        dispatch(getRoadmapFail_());
      });
  };
};
export const createRoadmap_ = () => {
  return { type: actionTypes.CREATE_ROADMAP };
};

export const createRoadmap = (roadmapData) => {
  return (dispatch) => {
    return axios
      .post("/api/roadmap/", roadmapData)
      .then((response) => {
        dispatch(createRoadmap_());
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

export const editRoadmap_ = () => {
  return { type: actionTypes.EDIT_ROADMAP };
};

export const editRoadmap = (roadmapId, roadmapData) => {
  return (dispatch) => {
    return axios
      .put(`/api/roadmap/${roadmapId}/`, roadmapData)
      .then(() => {
        dispatch(editRoadmap_());
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

export const deleteRoadmap_ = () => {
  return { type: actionTypes.DELETE_ROADMAP };
};

export const deleteRoadmap = (roadmapId) => {
  return (dispatch) => {
    return axios
      .delete(`/api/roadmap/${roadmapId}/`)
      .then(() => {
        alert("Roadmap successfully deleted!");
        dispatch(deleteRoadmap_());
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

export const createCommentSuccess_ = (newComment) => {
  return { type: actionTypes.CREATE_COMMENT_SUCCESS, newComment };
};

export const createCommentFail_ = () => {
  return { type: actionTypes.CREATE_COMMENT_FAILURE };
};

export const createComment = (commentData) => {
  return (dispatch) => {
    return axios
      .post("/api/comment/", commentData)
      .then((response) => {
        dispatch(createCommentSuccess_(response.data));
      })
      .catch((error) => {
        dispatch(createCommentFail_());
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
      });
  };
};

export const editCommentSuccess_ = (newComment) => {
  return { type: actionTypes.EDIT_COMMENT_SUCCESS, newComment };
};

export const editCommentFail_ = () => {
  return { type: actionTypes.EDIT_COMMENT_FAILURE };
};

export const editComment = (commentID, commentData) => {
  return (dispatch) => {
    return axios
      .put(`/api/comment/${commentID}/`, commentData)
      .then((response) => {
        dispatch(editCommentSuccess_(response.data));
      })
      .catch((error) => {
        editCommentFail_();
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            break;
          case 404:
            alert("No such comment!");
            break;
          case 403:
            alert("Only the author can edit the comment!");
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

export const deleteCommentSuccess_ = (commentID) => {
  return { type: actionTypes.DELETE_COMMENT_SUCCESS, commentID };
};

export const deleteCommentFail_ = () => {
  return { type: actionTypes.DELETE_COMMENT_FAILURE };
};

export const deleteComment = (commentID) => {
  return (dispatch) => {
    return axios
      .delete(`/api/comment/${commentID}/`)
      .then(() => {
        alert("Successfully deleted comment!");
        dispatch(deleteCommentSuccess_(commentID));
      })
      .catch((error) => {
        deleteCommentFail_();
        switch (error.response.status) {
          case 401:
            alert("Please sign in!");
            break;
          case 404:
            alert("No such comment!");
            break;
          case 403:
            alert("Only the author can delete the comment!");
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
