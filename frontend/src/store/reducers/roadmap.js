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
    default:
      break;
  }
  return state;
};

export default reducer;
