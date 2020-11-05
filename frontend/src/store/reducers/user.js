import * as actionTypes from "../actions/actionTypes";

const initialState = {
  is_signed_in: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_AUTH:
      return { ...state, is_signed_in: action.is_signed_in };
    case actionTypes.SIGN_IN:
      return { ...state, is_signed_in: action.is_signed_in };
    default:
      break;
  }
  return state;
};

export default reducer;
