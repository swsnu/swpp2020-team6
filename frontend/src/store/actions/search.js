/* Search actions.
 * Send request to the backend using the desired API, then receive response.
 */
import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getSimpleSearchFailure_ = () => {
  return { type: actionTypes.GET_SIMPLE_SEARCH_FAILURE };
};

export const getSimpleSearchSuccess_ = (data) => {
  return {
    type: actionTypes.GET_SIMPLE_SEARCH_SUCCESS,
    searchResult: data.roadmaps,
    page: data.page,
    totalCount: data.total_count,
  };
};

export const getSimpleSearch = (searchData) => {
  return (dispatch) => {
    return axios
      .get("/api/roadmap/search/", { params: searchData })
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
  return {
    type: actionTypes.GET_ADVANCED_SEARCH_SUCCESS,
    searchResult: data.roadmaps,
    page: data.page,
    totalCount: data.total_count,
  };
};

export const getAdvancedSearch = (searchData) => {
  return (dispatch) => {
    return axios
      .get("/api/roadmap/search/", { params: searchData })
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

export const getTopTagsFailure_ = () => {
  return { type: actionTypes.GET_TOP_TAGS_FAILURE };
};

export const getTopTagsSuccess_ = (data) => {
  return { type: actionTypes.GET_TOP_TAGS_SUCCESS, topTags: data.tags };
};

export const getTopTags = (tagCount) => {
  return (dispatch) => {
    return axios
      .get(`/api/tag/${tagCount}/`)
      .then((response) => {
        dispatch(getTopTagsSuccess_(response.data));
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
        dispatch(getTopTagsFailure_());
      });
  };
};
