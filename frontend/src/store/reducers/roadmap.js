import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoadmap: null,
  errStatus: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SELECTED_ROADMAP_SUCCESS:
      return { ...state, selectedRoadmap: action.roadmap, errStatus: null };
    case actionTypes.GET_SELECTED_ROADMAP_FAIL:
      return { ...state, selectedRoadmap: null, errStatus: action.errStatus };
    default:
      break;
  }
  return state;
};

export default reducer;
