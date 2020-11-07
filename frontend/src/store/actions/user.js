import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getUserAuthKHKSuccess_ = (userData) => {
  return { type: actionTypes.GET_USER_AUTH, userData };
};

export const getUserAuthKHK = () => {
  return (dispatch) => {
    return axios.get("/api/user/").then((res) => {
      dispatch(getUserAuthKHKSuccess_(res.data));
    });
  };
};
