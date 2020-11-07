import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoadmap: undefined,
  selectedRoadmapErrorStatus: null,
  createRoadmapErrorStatus: null,
  editRaodampErrorStatus: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROADMAP_SUCCESS:
      return {
        ...state,
        selectedRoadmap: action.roadmapData,
      };
    case actionTypes.GET_ROADMAP_FAILURE:
      return { ...state, selectedRoadmapErrorStatus: action.errorStatus };
    case actionTypes.CREATE_ROADMAP_SUCCESS:
      return { ...state, createRoadmapErrorStatus: null };
    case actionTypes.CREATE_ROADMAP_FAILURE:
      return { ...state, createRoadmapErrorStatus: action.errorStatus };
    case actionTypes.EDIT_ROADMAP_SUCCESS:
      return { ...state, editRoadmapErrorStatus: null };
    case actionTypes.EDIT_ROADMAP_FAILURE:
      return { ...state, editRoadmapErrorStatus: action.errorStatus };
    default:
      break;
  }
  return state;
};

export default reducer;
