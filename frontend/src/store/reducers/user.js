import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isSignedIn: undefined, // undefined: not yet received, false, true
  selectedUser: undefined, // no null state
};

const reducer = (state = initialState, action) => {
  const { selectedUser } = state;
  switch (action.type) {
    case actionTypes.GET_USER_AUTH:
      return { ...state, isSignedIn: action.isSignedIn, selectedUser: action.selectedUser };
    case actionTypes.SIGN_IN_SUCCESS:
      return { ...state, isSignedIn: true, selectedUser: action.selectedUser };
    case actionTypes.SIGN_IN_FAILURE:
      return { ...state };
    case actionTypes.SIGN_OUT_SUCCESS:
      return { ...state, isSignedIn: false, selectedUser: undefined };
    case actionTypes.SIGN_OUT_FAILURE:
      return { ...state };
    case actionTypes.SIGN_UP_SUCCESS:
      return { ...state };
    case actionTypes.SIGN_UP_FAILURE:
      return { ...state };
    case actionTypes.ROADMAP_LIKE:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          liked_roadmaps: selectedUser.liked_roadmaps.concat(action.roadmapData),
        },
      };
    case actionTypes.ROADMAP_UNLIKE:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          liked_roadmaps: selectedUser.liked_roadmaps.filter(
            (roadmap) => roadmap.id !== action.roadmapId,
          ),
        },
      };
    default:
      break;
  }
  return state;
};

export default reducer;
