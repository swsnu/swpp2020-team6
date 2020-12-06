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
            window.alert("No such Roadmap!");
            break;
          case 401:
            window.alert("Please sign in!");
            break;
          case 400:
            window.alert("Parsing error!");
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
            window.alert("Please sign in!");
            break;
          case 400:
            window.alert("Parsing error!");
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
            window.alert("Please sign in!");
            break;
          case 404:
            window.alert("No such Roadmap!");
            break;
          case 403:
            window.alert("Only the author can edit the Roadmap!");
            break;
          case 400:
            window.alert("Parsing error!");
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
        window.alert("Roadmap successfully deleted!");
        dispatch(deleteRoadmap_(roadmapId));
        dispatch(push(`/main`));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Please sign in!");
            break;
          case 404:
            window.alert("No such Roadmap!");
            break;
          case 403:
            window.alert("Only the author can delete the Roadmap!");
            break;
          case 400:
            window.alert("Parsing error!");
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
      .post(`/api/roadmap/${roadmapId}/`)
      .then((response) => {
        dispatch(duplicateRoadmap_(response.data));
        const edit = window.confirm("Successfully duplicated! Would you like to edit?");
        if (edit) {
          dispatch(push(`/roadmap/${response.data.id}/edit`));
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Please sign in!");
            break;
          case 404:
            window.alert("No such Roadmap!");
            break;
          case 400:
            window.alert("Parsing error!");
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
export const createComment = (commentData) => {
  return (dispatch) => {
    return axios
      .post("/api/comment/", commentData)
      .then((response) => {
        dispatch(createCommentSuccess_(response.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Please sign in!");
            break;
          case 400:
            window.alert("Parsing error!");
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

export const editComment = (commentID, commentData) => {
  return (dispatch) => {
    return axios
      .put(`/api/comment/${commentID}/`, commentData)
      .then((response) => {
        dispatch(editCommentSuccess_(response.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Please sign in!");
            break;
          case 404:
            window.alert("No such comment!");
            break;
          case 403:
            window.alert("Only the author can edit the comment!");
            break;
          case 400:
            window.alert("Parsing error!");
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

export const deleteComment = (commentID) => {
  return (dispatch) => {
    return axios
      .delete(`/api/comment/${commentID}/`)
      .then(() => {
        window.alert("Successfully deleted comment!");
        dispatch(deleteCommentSuccess_(commentID));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Please sign in!");
            break;
          case 404:
            window.alert("No such comment!");
            break;
          case 403:
            window.alert("Only the author can delete the comment!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
      });
  };
};

export const RoadmapLike_ = (responseData) => {
  return { type: actionTypes.ROADMAP_LIKE, responseData };
};

export const RoadmapUnLike_ = (responseData) => {
  return { type: actionTypes.ROADMAP_UNLIKE, responseData };
};

export const toggleRoadmapLike = (roadmapId) => {
  return (dispatch) => {
    return axios
      .put(`/api/roadmap/${roadmapId}/like/`)
      .then((response) => {
        if (response.data.liked) {
          dispatch(
            RoadmapLike_({
              roadmapId,
              roadmapData: response.data.roadmap_data,
            }),
          );
        } else {
          dispatch(
            RoadmapUnLike_({
              roadmapId,
              likeCount: response.data.like_count,
            }),
          );
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Only signed in users can like/unlike Roadmaps! Please sign in!");
            break;
          case 404:
            window.alert("No such Roadmap!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(goBack());
      });
  };
};

export const RoadmapPin_ = (responseData) => {
  return { type: actionTypes.ROADMAP_PIN, responseData };
};

export const RoadmapUnPin_ = (responseData) => {
  return { type: actionTypes.ROADMAP_UNPIN, responseData };
};

export const toggleRoadmapPin = (roadmapId) => {
  return (dispatch) => {
    return axios
      .put(`/api/roadmap/${roadmapId}/pin/`)
      .then((response) => {
        if (response.data.pinned) {
          dispatch(
            RoadmapPin_({
              roadmapId,
              roadmapData: response.data.roadmap_data,
            }),
          );
        } else {
          dispatch(
            RoadmapUnPin_({
              roadmapId,
              pinCount: response.data.pin_count,
            }),
          );
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Only signed in users can pin/unpin Roadmaps! Please sign in!");
            break;
          case 404:
            window.alert("No such Roadmap!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(goBack());
      });
  };
};

export const changeProgress_ = (responseData) => {
  return {
    type: actionTypes.PROGRESS_CHANGE,
    progress: responseData.progress_state,
    sections: responseData.sections,
  };
};

export const changeProgress = (newState, roadmapId) => {
  return (dispatch) => {
    return axios
      .put(`/api/roadmap/${roadmapId}/progress/`, newState)
      .then((response) => {
        dispatch(changeProgress_(response.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert(
              "Only signed in users can change the progress state of their Roadmaps! Please sign in!",
            );
            dispatch(goBack());
            break;
          case 404:
            window.alert("No such Roadmap!");
            dispatch(goBack());
            break;
          case 403:
            window.alert("only the author can change the progress!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
      });
  };
};

export const changeCheckbox_ = (checked, taskId) => {
  return {
    type: actionTypes.CHANGE_CHECKBOX,
    checked,
    taskId,
  };
};

export const changeCheckbox = (taskId) => {
  return (dispatch) => {
    return axios
      .put(`/api/task/${taskId}/`)
      .then((response) => {
        dispatch(changeCheckbox_(response.data.checked, taskId));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Only signed in users can check/uncheck Tasks! Please sign in!");
            dispatch(goBack());
            break;
          case 404:
            window.alert("No such Roadmap!");
            dispatch(goBack());
            break;
          case 403:
            window.alert("only the author can change the Task's checked state!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
      });
  };
};

export const getBestRoadmapsSuccess_ = (roadmapData) => {
  return { type: actionTypes.GET_BEST_ROADMAP_SUCCESS, roadmaps: roadmapData.roadmaps };
};

export const getBestRoadmapsFail_ = (errorStatus) => {
  return { type: actionTypes.GET_BEST_ROADMAP_FAILURE, errorStatus };
};

export const resetBestRoadmaps_ = () => {
  return { type: actionTypes.RESET_BEST_ROADMAP };
};

export const getBestRoadmaps = (topN) => {
  return (dispatch) => {
    return axios
      .get(`/api/roadmap/best/${topN}/`)
      .then((response) => {
        dispatch(getBestRoadmapsSuccess_(response.data));
      })
      .catch((error) => {
        dispatch(getBestRoadmapsFail_(error.response.status));
      });
  };
};

export const getNewRoadmapsSuccess_ = (roadmapData) => {
  return { type: actionTypes.GET_NEW_ROADMAP_SUCCESS, roadmaps: roadmapData.roadmaps };
};

export const getNewRoadmapsFail_ = (errorStatus) => {
  return { type: actionTypes.GET_NEW_ROADMAP_FAILURE, errorStatus };
};

export const resetNewRoadmaps_ = () => {
  return { type: actionTypes.RESET_NEW_ROADMAP };
};

export const getNewRoadmaps = (topN) => {
  return (dispatch) => {
    return axios
      .get(`/api/roadmap/new/${topN}/`)
      .then((response) => {
        dispatch(getNewRoadmapsSuccess_(response.data));
      })
      .catch((error) => {
        dispatch(getNewRoadmapsFail_(error.response.status));
      });
  };
};
