import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedUser: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_AUTH:
      return { ...state, selectedUser: action.userData };
    case actionTypes.SIGN_IN:
      return { ...state, selectedUser: action.userData };
    default:
      break;
  }
  return state;
};

export default reducer;
