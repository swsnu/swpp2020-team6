/* eslint-disable no-case-declarations */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoadmap: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROADMAP_SUCCESS:
      return { ...state, selectedRoadmap: action.roadmapData };
    case actionTypes.GET_ROADMAP_FAILURE:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.CREATE_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.EDIT_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
    case actionTypes.RESET_ROADMAP:
      return { ...state, selectedRoadmap: undefined };
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
    default:
      break;
  }
  return state;
};

export default reducer;
