/* eslint-disable no-case-declarations */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoadmap: undefined,
  selectedEditRoadmap: undefined,
  bestRoadmaps: [],
  bestRoadmapsError: null,
  newRoadmaps: [],
  newRoadmapsError: null,
  recommendedRoadmaps: [],
  recommendedRoadmapsError: null,
};

const roadmap = (state = initialState, action = { type: null }) => {
  switch (action.type) {
    case actionTypes.GET_ROADMAP_SUCCESS:
      return { ...state, selectedRoadmap: action.roadmapData };
    case actionTypes.GET_ROADMAP_FAILURE:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.GET_EDIT_ROADMAP_SUCCESS:
      return { ...state, selectedEditRoadmap: action.roadmapData };
    case actionTypes.GET_EDIT_ROADMAP_FAILURE:
      return { ...state, selectedEditRoadmap: undefined };
    case actionTypes.CREATE_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.EDIT_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.RESET_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.RESET_EDIT_ROADMAP:
      return { ...state, selectedEditRoadmap: undefined };
    case actionTypes.DELETE_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.CREATE_COMMENT_SUCCESS:
      const addedComments = state.selectedRoadmap.comments.concat(action.newComment);
      const commentCountBeforeCreate = state.selectedRoadmap.comment_count;
      const commentAddedRoadmap = {
        ...state.selectedRoadmap,
        comment_count: commentCountBeforeCreate + 1,
        comments: addedComments,
      };
      return { ...state, selectedRoadmap: commentAddedRoadmap };
    case actionTypes.EDIT_COMMENT_SUCCESS:
      const { newComment } = action;
      const modifiedComments = state.selectedRoadmap.comments.map((comment) => {
        if (comment.comment_id === newComment.comment_id) {
          return { ...newComment };
        }
        return { ...comment };
      });
      const commentModifiedRoadmap = { ...state.selectedRoadmap, comments: modifiedComments };
      return { ...state, selectedRoadmap: commentModifiedRoadmap };
    case actionTypes.DELETE_COMMENT_SUCCESS:
      const { commentID } = action;
      const deletedComments = state.selectedRoadmap.comments.filter((comment) => {
        return comment.comment_id !== commentID;
      });
      const commentCountBeforeDelete = state.selectedRoadmap.comment_count;
      const commentDeletedRoadmap = {
        ...state.selectedRoadmap,
        comment_count: commentCountBeforeDelete - 1,
        comments: deletedComments,
      };
      return { ...state, selectedRoadmap: commentDeletedRoadmap };
    case actionTypes.ROADMAP_LIKE:
      return {
        ...state,
        selectedRoadmap: {
          ...state.selectedRoadmap,
          like_count: action.responseData.roadmapData.like_count,
        },
      };
    case actionTypes.ROADMAP_UNLIKE:
      return {
        ...state,
        selectedRoadmap: {
          ...state.selectedRoadmap,
          like_count: action.responseData.likeCount,
        },
      };
    case actionTypes.ROADMAP_PIN:
      return {
        ...state,
        selectedRoadmap: {
          ...state.selectedRoadmap,
          pin_count: action.responseData.roadmapData.pin_count,
        },
      };
    case actionTypes.ROADMAP_UNPIN:
      return {
        ...state,
        selectedRoadmap: {
          ...state.selectedRoadmap,
          pin_count: action.responseData.pinCount,
        },
      };
    case actionTypes.PROGRESS_CHANGE:
      return {
        ...state,
        selectedRoadmap: {
          ...state.selectedRoadmap,
          progress: action.progress,
          sections: action.sections,
        },
      };
    case actionTypes.CHANGE_CHECKBOX:
      const updatedSections = state.selectedRoadmap.sections.map((section) => {
        const updatedTasks = section.tasks.map((task) => {
          if (task.task_id === action.taskId) {
            return { ...task, task_checked: action.checked };
          }
          return task;
        });
        return { ...section, tasks: updatedTasks };
      });

      return {
        ...state,
        selectedRoadmap: {
          ...state.selectedRoadmap,
          sections: updatedSections,
        },
      };
    case actionTypes.GET_BEST_ROADMAP_SUCCESS:
      return { ...state, bestRoadmaps: action.roadmaps, bestRoadmapsError: null };
    case actionTypes.GET_BEST_ROADMAP_FAILURE:
      return { ...state, bestRoadmaps: [], bestRoadmapsError: action.errorStatus };
    case actionTypes.RESET_BEST_ROADMAP:
      return { ...state, bestRoadmaps: [], bestRoadmapsError: null };
    case actionTypes.GET_NEW_ROADMAP_SUCCESS:
      return { ...state, newRoadmaps: action.roadmaps, newRoadmapsError: null };
    case actionTypes.GET_NEW_ROADMAP_FAILURE:
      return { ...state, newRoadmaps: [], newRoadmapsError: action.errorStatus };
    case actionTypes.RESET_NEW_ROADMAP:
      return { ...state, newRoadmaps: [], newRoadmapsError: null };
    case actionTypes.GET_RECOMMENDED_ROADMAP_SUCCESS:
      return { ...state, recommendedRoadmaps: action.roadmaps, recommendedRoadmapsError: null };
    case actionTypes.GET_RECOMMENDED_ROADMAP_FAILURE:
      return { ...state, recommendedRoadmaps: [], recommendedRoadmapsError: action.errorStatus };
    case actionTypes.RESET_RECOMMENDED_ROADMAP:
      return { ...state, recommendedRoadmaps: [], recommendedRoadmapsError: null };
    default:
      break;
  }
  return state;
};

export default roadmap;
