/* eslint-disable no-case-declarations */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoadmap: undefined,
  errorStatus: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROADMAP_SUCCESS:
      return {
        ...state,
        selectedRoadmap: action.roadmapData,
        errorStatus: false,
      };
    case actionTypes.GET_ROADMAP_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: true };
    case actionTypes.CREATE_ROADMAP_SUCCESS:
      return { ...state, selectedRoadmap: undefined, errorStatus: false };
    case actionTypes.CREATE_ROADMAP_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: true };
    case actionTypes.EDIT_ROADMAP_SUCCESS:
      return { ...state, selectedRoadmap: undefined, errorStatus: false };
    case actionTypes.EDIT_ROADMAP_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: true };
    case actionTypes.RESET_ROADMAP_ERRORSTATUS:
      return { ...state, selectedRoadmap: undefined, errorStatus: false };
    case actionTypes.RESET_ROADMAP:
      return { ...state, selectedRoadmap: undefined, errorStatus: false };
    case actionTypes.DELETE_ROADMAP_SUCCESS:
      return { ...state, selectedRoadmap: undefined, errorStatus: false };
    case actionTypes.DELETE_ROADMAP_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: true };
    case actionTypes.CREATE_COMMENT_SUCCESS:
      const addedComments = state.selectedRoadmap.comments.concat(action.newComment);
      const commentAddedRoadmap = { ...state.selectedRoadmap, comments: addedComments };
      return { ...state, selectedRoadmap: commentAddedRoadmap, errorStatus: false };
    case actionTypes.CREATE_COMMENT_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: true };
    case actionTypes.EDIT_COMMENT_SUCCESS:
      const { newComment } = action;
      const modifiedComments = state.selectedRoadmap.comments.map((comment) => {
        if (comment.comment_id === newComment.comment_id) {
          return { newComment };
        }
        return { ...comment };
      });
      const commentModifiedRoadmap = { ...state.selectedRoadmap, comments: modifiedComments };
      return { ...state, selectedRoadmap: commentModifiedRoadmap, errorStatus: false };
    case actionTypes.EDIT_COMMENT_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: true };
    case actionTypes.DELETE_COMMENT_SUCCESS:
      const { commentID } = action;
      const deletedComments = state.selectedRoadmap.comments.filter((comment) => {
        return comment.comment_id !== commentID;
      });
      const commentDeletedRoadmap = { ...state.selectedRoadmap, comments: deletedComments };
      return { ...state, selectedRoadmap: commentDeletedRoadmap, errorStatus: false };
    case actionTypes.DELETE_COMMENT_FAILURE:
      return { ...state, selectedRoadmap: undefined, errorStatus: false };
    default:
      break;
  }
  return state;
};

export default reducer;
