import axios from "axios";
import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const getUserAuthSuccess_ = (data) => {
  return { type: actionTypes.GET_USER_AUTH, is_sign: data.is_signed_in };
};

export const getUserAuth = () => {
  return (dispatch) => {
    return axios.get("/api/user/").then((res) => {
      dispatch(getUserAuthSuccess_(res.data));
    });
  };
};

export const signInSuccess_ = () => {
  return { type: actionTypes.SIGN_IN, is_signed_in: true };
};

export const signIn = (userCredentials) => {
  return (dispatch) => {
    return axios.post("/api/user/signin/", userCredentials).then(() => {
      dispatch(signInSuccess_());
      dispatch(push("/home"));
    });
  };
};
