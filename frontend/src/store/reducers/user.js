/* User reducer.
 * Changes redux state according to actions done about user.
 */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isSignedIn: undefined, // undefined: not yet received, false, true
  selectedUser: undefined, // no null state
  myPageUser: undefined,
};

const user = (state = initialState, action = null) => {
  const { selectedUser } = state;
  if (action.type === actionTypes.CREATE_ROADMAP || action.type === actionTypes.DUPLICATE_ROADMAP) {
    return {
      ...state,
      selectedUser: {
        ...selectedUser,
        my_roadmaps: selectedUser.my_roadmaps.concat(action.roadmapData),
      },
    };
  }
  switch (action.type) {
    case actionTypes.GET_USER_AUTH:
      return { ...state, isSignedIn: action.isSignedIn, selectedUser: action.selectedUser };
    case actionTypes.SIGN_IN_SUCCESS:
      return { ...state, isSignedIn: true, selectedUser: action.selectedUser };
    case actionTypes.SIGN_IN_OUT_FAILURE:
      return { ...state };
    case actionTypes.SIGN_OUT_SUCCESS:
      return { ...state, isSignedIn: false, selectedUser: undefined };
    case actionTypes.EDIT_ROADMAP:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          my_roadmaps: selectedUser.my_roadmaps.map((roadmap) => {
            if (roadmap.id === action.roadmapData.id) {
              return action.roadmapData;
            }
            return roadmap;
          }),
        },
      };
    case actionTypes.DELETE_ROADMAP:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          my_roadmaps: selectedUser.my_roadmaps.filter(
            (roadmap) => roadmap.id !== action.roadmapId,
          ),
        },
      };
    case actionTypes.ROADMAP_LIKE:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          liked_roadmaps: selectedUser.liked_roadmaps.concat(action.responseData.roadmapData),
        },
      };
    case actionTypes.ROADMAP_UNLIKE:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          liked_roadmaps: selectedUser.liked_roadmaps.filter(
            (roadmap) => roadmap.id !== action.responseData.roadmapId,
          ),
        },
      };
    case actionTypes.ROADMAP_PIN:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          pinned_roadmaps: selectedUser.pinned_roadmaps.concat(action.responseData.roadmapData),
        },
      };
    case actionTypes.ROADMAP_UNPIN:
      return {
        ...state,
        selectedUser: {
          ...selectedUser,
          pinned_roadmaps: selectedUser.pinned_roadmaps.filter(
            (roadmap) => roadmap.id !== action.responseData.roadmapId,
          ),
        },
      };
    case actionTypes.GET_MYPAGE_USER:
      return {
        ...state,
        myPageUser: action.userData,
      };
    case actionTypes.RESET_MYPAGE_USER:
      return {
        ...state,
        myPageUser: undefined,
      };
    default:
      break;
  }
  return state;
};

export default user;
