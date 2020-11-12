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
    default:
      break;
  }
  return state;
};

export default reducer;
