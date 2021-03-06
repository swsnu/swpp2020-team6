/* User actions.
 * Send request to the backend using the desired API, then receive response.
 */
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
  return { type: actionTypes.SIGN_IN_OUT_FAILURE };
};

export const signIn = (userCredentials) => {
  return (dispatch) => {
    return axios
      .post("/api/user/signin/", userCredentials)
      .then((response) => {
        dispatch(signInSuccess_(response.data));
        dispatch(push("/main"));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.alert("Can't find user data! Try again or sign up!");
        } else {
          window.alert("Sorry! Something went wrong!");
        }
        dispatch(signInFail_());
      });
  };
};

export const signOutSuccess_ = () => {
  return { type: actionTypes.SIGN_OUT_SUCCESS };
};

export const signOutFail_ = () => {
  return { type: actionTypes.SIGN_IN_OUT_FAILURE };
};

export const signOut = () => {
  return (dispatch) => {
    return axios
      .get("/api/user/signout/")
      .then(() => {
        window.alert("Successfully signed out!");
        dispatch(signOutSuccess_());
        dispatch(push("/main"));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.alert("You are not signed in!");
        } else {
          window.alert("Sorry! Something went wrong!");
        }
        dispatch(signOutFail_());
      });
  };
};

export const signUp = (userCredentials) => {
  return (dispatch) => {
    return axios
      .post("/api/user/", userCredentials)
      .then(() => {
        window.alert("Successfully signed up!");
        dispatch(
          signIn({ username: userCredentials.username, password: userCredentials.password }),
        );
        dispatch(push("/main"));
      })
      .catch(() => {
        window.alert("Something wrong with the request! Try again.");
        dispatch(signInFail_());
      });
  };
};

export const getMyPageUser_ = (userData) => {
  return { type: actionTypes.GET_MYPAGE_USER, userData };
};

export const getMyPageUser = (userId) => {
  return (dispatch) => {
    return axios
      .get(`/api/user/${userId}/`)
      .then((response) => {
        dispatch(getMyPageUser_(response.data));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            window.alert("Please sign in!");
            break;
          case 404:
            window.alert("No such user!");
            break;
          default:
            break;
        }
        dispatch(push("/"));
      });
  };
};

export const resetMyPageUser_ = () => {
  return { type: actionTypes.RESET_MYPAGE_USER };
};
