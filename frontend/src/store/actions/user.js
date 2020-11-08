import axios from "axios";

import * as actionTypes from "./actionTypes";

export const getUserAuthSuccess_ = (userData) => {
  return { type: actionTypes.GET_USER_AUTH, userData };
};

export const getUserAuth = () => {
  return (dispatch) => {
    return axios.get("/api/user/").then((res) => {
      dispatch(getUserAuthSuccess_(res.data));
    });
  };
};
