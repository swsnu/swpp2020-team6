/* Search actions.
 * Send request to the backend using the desired API, then receive response.
 */
import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getSimpleSearchFailure_ = () => {
  return { type: actionTypes.GET_SIMPLE_SEARCH_FAILURE };
};

export const getSimpleSearchSuccess_ = (data) => {
  return { type: actionTypes.GET_SIMPLE_SEARCH_SUCCESS, searchResult: data.roadmaps };
};

export const getSimpleSearch = (searchWord) => {
  return (dispatch) => {
    return axios
      .get("/api/roadmap/simple_search/", { params: { title: searchWord } })
      .then((res) => {
        dispatch(getSimpleSearchSuccess_(res.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 405:
            window.alert("Bad Request!");
            break;
          case 401:
            window.alert("Please sign in!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(getSimpleSearchFailure_());
      });
  };
};

export const getAdvancedSearchFailure_ = () => {
  return { type: actionTypes.GET_ADVANCED_SEARCH_FAILURE };
};

export const getAdvancedSearchSuccess_ = (data) => {
  return { type: actionTypes.GET_ADVANCED_SEARCH_SUCCESS, searchResult: data.roadmaps };
};

export const getAdvancedSearch = (searchData) => {
  return (dispatch) => {
    return axios
      .get("/api/roadmap/advanced_search/", { params: searchData })
      .then((res) => {
        dispatch(getAdvancedSearchSuccess_(res.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 405:
            window.alert("Bad Request!");
            break;
          case 401:
            window.alert("Please sign in!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(getAdvancedSearchFailure_());
      });
  };
};

export const getTagsFailure_ = () => {
  return { type: actionTypes.GET_TAGS_FAILURE };
};

export const getTagsSuccess_ = (data) => {
  return { type: actionTypes.GET_TAGS_SUCCESS, topTags: data.tags };
};

export const getTags = (tagCount) => {
  return (dispatch) => {
    return axios
      .get(`/api/tag/${tagCount}/`)
      .then((response) => {
        dispatch(getTagsSuccess_(response.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 405:
            window.alert("Bad Request!");
            break;
          case 401:
            window.alert("Please sign in!");
            break;
          case 400:
            window.alert("Parsing error!");
            break;
          default:
            break;
        }
        dispatch(getTagsFailure_());
      });
  };
};
