import * as actionTypes from "../actions/actionTypes";

const initialState = {
  is_signed_in: false,

  myRoadmaps: [],
  pinnedRoadmaps: [],
  likedRoadmaps: [],
  recommendedRoadmaps: [],
  selectedUser: undefined,
  allUsers: undefined,

  errStatus: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_AUTH:
      return { ...state, is_signed_in: action.is_signed_in };
    case actionTypes.SIGN_IN_SUCCESS:
      return { ...state, is_signed_in: true };
    case actionTypes.SIGN_IN_FAILURE:
      return { ...state, errStatus: action.errStatus };
    case actionTypes.SIGN_OUT_SUCCESS:
      return { ...state, is_signed_in: false };
    case actionTypes.SIGN_OUT_FAILURE:
      return { ...state, errStatus: action.errStatus };
    case actionTypes.SIGN_UP_SUCCESS:
      return { ...state };
    case actionTypes.SIGN_UP_FAILURE:
      return { ...state, errStatus: action.errStatus };
    default:
      break;
  }
  return state;
};

export default reducer;
