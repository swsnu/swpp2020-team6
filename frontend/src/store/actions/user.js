import axios from "axios";
import { push } from "connected-react-router";

import * as actionTypes from "./actionTypes";

export const getUserAuthSuccess_ = (data) => {
  return {
    type: actionTypes.GET_USER_AUTH,
    selectedUser: data.selectedUser,
    isSignedIn: data.is_signed_in,
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    return axios.get("/api/user/").then((res) => {
      dispatch(getUserAuthSuccess_(res.data));
    });
  };
};

export const signInSuccess_ = () => {
  return { type: actionTypes.SIGN_IN_SUCCESS };
};

export const signInFail_ = (err) => {
  return { type: actionTypes.SIGN_IN_FAILURE, errStatus: err };
};

export const signIn = (userCredentials) => {
  return (dispatch) => {
    return axios
      .post("/api/user/signin/", userCredentials)
      .then(() => {
        dispatch(signInSuccess_());
        dispatch(push("/home"));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("Email or Password is incorrect!");
            dispatch(signInFail_(401));
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

export const signOutFail_ = (err) => {
  return { type: actionTypes.SIGN_OUT_FAILURE, errStatus: err };
};

export const signOut = () => {
  return (dispatch) => {
    return axios
      .get("/api/user/signout/")
      .then(() => {
        dispatch(signOutSuccess_());
        dispatch(push("/home"));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            alert("You are not signed in!");
            dispatch(signOutFail_(401));
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

export const signUpFail_ = (err) => {
  return { type: actionTypes.SIGN_UP_FAILURE, errStatus: err };
};

export const signUp = (userCredentials) => {
  return (dispatch) => {
    return axios
      .post("/api/user/", userCredentials)
      .then(() => {
        dispatch(signUpSuccess_());
        dispatch(push("/home"));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            alert("Something wrong with the request! Try again.");
            dispatch(signUpFail_(400));
            break;
          default:
            break;
        }
      });
  };
};
