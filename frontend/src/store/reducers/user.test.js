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

const stubSimpleRoadmap = {
  id: 11,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 5,
  author_id: 5,
  author_name: "swpp",
  author_user_picture_url: "",
  tags: [
    {
      tag_id: 1,
      tag_name: "python",
    },
    {
      tag_id: 2,
      tag_name: "CV",
    },
  ],
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

  it("should change like_count on roadmap like ", () => {
    const newState = reducer(
      { isSignedIn: true, selectedUser: stubSelectedUser },
      {
        type: actionTypes.ROADMAP_LIKE,
        responseData: {
          roadmapId: stubSimpleRoadmap.id,
          roadmapData: stubSimpleRoadmap,
        },
      },
    );

    const previousLikeRoadmapsCount = stubSelectedUser.liked_roadmaps.length;
    expect(newState.selectedUser.liked_roadmaps.length).toEqual(previousLikeRoadmapsCount + 1);
    expect(newState.selectedUser).toEqual({
      ...stubSelectedUser,
      liked_roadmaps: stubSelectedUser.liked_roadmaps.concat(stubSimpleRoadmap),
    });
  });

  it("should change like_count on roadmap unlike ", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: {
          ...stubSelectedUser,
          liked_roadmaps: stubSelectedUser.liked_roadmaps.concat(stubSimpleRoadmap),
        },
      },
      {
        type: actionTypes.ROADMAP_UNLIKE,
        responseData: {
          roadmapId: stubSimpleRoadmap.id,
          likeCount: stubSimpleRoadmap.like_count - 1,
        },
      },
    );
    expect(newState.selectedUser).toEqual(stubSelectedUser);
  });
});
