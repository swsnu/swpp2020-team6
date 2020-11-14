import reducer from "./user";
import * as actionTypes from "../actions/actionTypes";

const stubSelectedUser = {
  user_id: 1,
  username: "user1",
  email: "user1@snu.ac.kr",
  user_picture_url: "",
  pinned_roadmaps: [],
  liked_roadmaps: [],
  my_roadmaps: [],
};

describe("User Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ isSignedIn: undefined, selectedUser: undefined });
  });

  it("should get user authentication info for action 'GET_USER_AUTH'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_USER_AUTH,
      isSignedIn: false,
      selectedUser: stubSelectedUser,
    });
    expect(newState).toEqual({
      isSignedIn: false,
      selectedUser: stubSelectedUser,
    });
  });

  it("should set signed in to true for action 'SIGN_IN_SUCCESS'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_IN_SUCCESS,
      selectedUser: stubSelectedUser,
    });
    expect(newState).toEqual({
      isSignedIn: true,
      selectedUser: stubSelectedUser,
    });
  });

  it("should change nothing for action 'SIGN_IN_FAILURE'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_IN_FAILURE,
    });
    expect(newState).toEqual({
      isSignedIn: undefined,
      selectedUser: undefined,
    });
  });

  it("should set signed in to false for action 'SIGN_OUT_SUCCESS'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_OUT_SUCCESS,
    });
    expect(newState).toEqual({
      isSignedIn: false,
      selectedUser: undefined,
    });
  });

  it("should change nothing for action 'SIGN_OUT_FAILURE'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_OUT_FAILURE,
    });
    expect(newState).toEqual({
      isSignedIn: undefined,
      selectedUser: undefined,
    });
  });

  it("should change nothing for action 'SIGN_UP'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_UP,
    });
    expect(newState).toEqual({
      isSignedIn: undefined,
      selectedUser: undefined,
    });
  });
});
