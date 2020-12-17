import * as actionTypes from "../actions/actionTypes";

const initialState = {
  searchResult: [],
  topTags: [],
  page: 1,
  totalCount: null,
};

const search = (state = initialState, action = { type: null }) => {
  if (action.type === actionTypes.GET_ADVANCED_SEARCH_SUCCESS) {
    return {
      ...state,
      searchResult: action.searchResult,
      page: action.page,
      totalCount: action.totalCount,
    };
  }
  switch (action.type) {
    case actionTypes.GET_ADVANCED_SEARCH_FAILURE:
      return { ...state };
    case actionTypes.GET_TOP_TAGS_SUCCESS:
      return { ...state, topTags: action.topTags };
    case actionTypes.GET_TOP_TAGS_FAILURE:
      return { ...state };
    default:
      break;
  }
  return state;
};

export default search;
