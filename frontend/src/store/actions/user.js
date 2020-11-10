import axios from "axios";
import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const getUserAuthSuccess_ = (data) => {
  return {
    type: actionTypes.GET_USER_AUTH,
    isSignedIn: data.is_signed_in,
    selectedUser: data.user_data,
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    return axios.get("/api/user/").then((res) => {
      dispatch(getUserAuthSuccess_(res.data));
    });
  };
};

export const signInSuccess_ = (userData) => {
  return { type: actionTypes.SIGN_IN_SUCCESS, selectedUser: userData };
};

export const signInFail_ = () => {
  return { type: actionTypes.SIGN_IN_FAILURE };
};

export const signIn = (userCredentials) => {
  return (dispatch) => {
    return axios
      .post("/api/user/signin/", userCredentials)
      .then((response) => {
        dispatch(signInSuccess_(response.data));
        dispatch(push("/home"));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("Email or Password is incorrect!");
            dispatch(signInFail_());
            break;
          default:
            break;
        }
      });
  };
};

export const signOutSuccess_ = () => {
  return { type: actionTypes.SIGN_OUT_SUCCESS };
};

export const signOutFail_ = () => {
  return { type: actionTypes.SIGN_OUT_FAILURE };
};

export const signOut = () => {
  return (dispatch) => {
    return axios
      .get("/api/user/signout/")
      .then(() => {
        alert("Successfully signed out!");
        dispatch(signOutSuccess_());
        dispatch(push("/home"));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("You are not signed in!");
            dispatch(signOutFail_());
            break;
          default:
            break;
        }
      });
  };
};

export const signUpSuccess_ = () => {
  return { type: actionTypes.SIGN_UP_SUCCESS };
};

export const signUpFail_ = () => {
  return { type: actionTypes.SIGN_UP_FAILURE };
};

export const signUp = (userCredentials) => {
  return (dispatch) => {
    return axios
      .post("/api/user/", userCredentials)
      .then(() => {
        alert("Successfully signed up!");
        dispatch(signUpSuccess_());
        dispatch(push("/home"));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            alert("Something wrong with the request! Try again.");
            dispatch(signUpFail_());
            break;
          default:
            break;
        }
      });
  };
};
