import * as actionTypes from "../actions/actionTypes";

const initialState = {
  searchResult: [{ title: "test search result1", id: 1, author_name: "test author name" }],
  topTags: [{ tag_id: "tag_id_1", tag_content: "test_top_tag_1" }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SIMPLE_SEARCH_SUCCESS:
      return { ...state, searchResult: action.searchResult };
    case actionTypes.GET_SIMPLE_SEARCH_FAILURE:
      return { ...state };
    case actionTypes.GET_ADVANCED_SEARCH_SUCCESS:
      return { ...state, searchResult: action.searchResult };
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

export default reducer;
