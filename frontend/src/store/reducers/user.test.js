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

const stubSimpleRoadmapData = {
  id: 1,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 1,
  author_id: 1,
  author_name: "user1",
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

const stubSimpleRoadmapData2 = {
  id: 2,
  title: "new-rm-title2",
  date: "2020-11-14 05:46:47",
  level: 1,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 1,
  author_id: 1,
  author_name: "user1",
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

const stubSimpleRoadmapOnLike = {
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

const stubSimpleRoadmapOnPin = {
  id: 11,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  like_count: 0,
  comment_count: 0,
  pin_count: 1,
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

const stubMyPageUserData = {
  user_id: 1,
  username: "test",
  email: "user@user.com",
  user_picture_url: "",
  my_roadmaps: [
    {
      id: 1,
      private: false,
      title: "test",
      date: "2020-11-20 02:45:00",
      level: 2,
      description: "test",
      like_count: 0,
      comment_count: 1,
      pin_count: 1,
      progress: 1,
      original_author: 1,
      author_id: 1,
      author_name: "test",
      author_user_picture_url: "",
      tags: [
        {
          tag_id: 4,
          tag_name: "test",
        },
        {
          tag_id: 5,
          tag_name: "test",
        },
        {
          tag_id: 6,
          tag_name: "test",
        },
      ],
    },
    {
      id: 2,
      private: false,
      title: "test2",
      date: "2020-11-20 02:54:29",
      level: 2,
      description: "",
      like_count: 0,
      comment_count: 0,
      pin_count: 0,
      progress: 1,
      original_author: 1,
      author_id: 1,
      author_name: "test",
      author_user_picture_url: "",
      tags: [],
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

  it("should change my_roadmaps on CREATE_ROADMAP", () => {
    const newState = reducer(
      { isSignedIn: true, selectedUser: stubSelectedUser },
      {
        type: actionTypes.CREATE_ROADMAP,
        roadmapData: stubSimpleRoadmapData,
      },
    );

    expect(newState.selectedUser.my_roadmaps.length).toBe(1);
  });

  it("should change my_roadmaps on EDIT_ROADMAP", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: {
          ...stubSelectedUser,
          my_roadmaps: [stubSimpleRoadmapData, stubSimpleRoadmapData2],
        },
      },
      {
        type: actionTypes.EDIT_ROADMAP,
        roadmapData: { ...stubSimpleRoadmapData2, title: "test" },
      },
    );

    expect(newState.selectedUser.my_roadmaps).toEqual([
      stubSimpleRoadmapData,
      { ...stubSimpleRoadmapData2, title: "test" },
    ]);
  });

  it("should change my_roadmaps on DELETE_ROADMAP", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: {
          ...stubSelectedUser,
          my_roadmaps: [stubSimpleRoadmapData, stubSimpleRoadmapData2],
        },
      },
      {
        type: actionTypes.DELETE_ROADMAP,
        roadmapId: 2,
      },
    );

    expect(newState.selectedUser.my_roadmaps).toEqual([stubSimpleRoadmapData]);
  });

  it("should change my_roadmaps on DUPLICATE_ROADMAP", () => {
    const newState = reducer(
      { isSignedIn: true, selectedUser: stubSelectedUser },
      {
        type: actionTypes.DUPLICATE_ROADMAP,
        roadmapData: stubSimpleRoadmapData,
      },
    );

    expect(newState.selectedUser.my_roadmaps.length).toBe(1);
  });

  it("should change liked_roadmaps on roadmap like ", () => {
    const newState = reducer(
      { isSignedIn: true, selectedUser: stubSelectedUser },
      {
        type: actionTypes.ROADMAP_LIKE,
        responseData: {
          roadmapId: stubSimpleRoadmapOnLike.id,
          roadmapData: stubSimpleRoadmapOnLike,
        },
      },
    );

    const previousLikeRoadmapsCount = stubSelectedUser.liked_roadmaps.length;
    expect(newState.selectedUser.liked_roadmaps.length).toEqual(previousLikeRoadmapsCount + 1);
    expect(newState.selectedUser).toEqual({
      ...stubSelectedUser,
      liked_roadmaps: stubSelectedUser.liked_roadmaps.concat(stubSimpleRoadmapOnLike),
    });
  });

  it("should change liked_roadmaps list on roadmap unlike ", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: {
          ...stubSelectedUser,
          liked_roadmaps: stubSelectedUser.liked_roadmaps.concat(stubSimpleRoadmapOnLike),
        },
      },
      {
        type: actionTypes.ROADMAP_UNLIKE,
        responseData: {
          roadmapId: stubSimpleRoadmapOnLike.id,
          likeCount: stubSimpleRoadmapOnLike.like_count - 1,
        },
      },
    );
    expect(newState.selectedUser).toEqual(stubSelectedUser);
  });

  it("should change pinned_roadmaps list on roadmap pin ", () => {
    const newState = reducer(
      { isSignedIn: true, selectedUser: stubSelectedUser },
      {
        type: actionTypes.ROADMAP_PIN,
        responseData: {
          roadmapId: stubSimpleRoadmapOnPin.id,
          roadmapData: stubSimpleRoadmapOnPin,
        },
      },
    );

    const previousPinRoadmapsCount = stubSelectedUser.pinned_roadmaps.length;
    expect(newState.selectedUser.pinned_roadmaps.length).toEqual(previousPinRoadmapsCount + 1);
    expect(newState.selectedUser).toEqual({
      ...stubSelectedUser,
      pinned_roadmaps: stubSelectedUser.pinned_roadmaps.concat(stubSimpleRoadmapOnPin),
    });
  });

  it("should change pinned_roadmaps list on roadmap unlike ", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: {
          ...stubSelectedUser,
          pinned_roadmaps: stubSelectedUser.pinned_roadmaps.concat(stubSimpleRoadmapOnPin),
        },
      },
      {
        type: actionTypes.ROADMAP_UNPIN,
        responseData: {
          roadmapId: stubSimpleRoadmapOnPin.id,
          pinCount: stubSimpleRoadmapOnPin.pin_count - 1,
        },
      },
    );
    expect(newState.selectedUser).toEqual(stubSelectedUser);
  });

  it("should get myPageUser on 'GET_MYPAGE_USER'", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: stubSelectedUser,
        myPageUser: undefined,
      },
      {
        type: actionTypes.GET_MYPAGE_USER,
        userData: stubMyPageUserData,
      },
    );
    expect(newState).toEqual({
      isSignedIn: true,
      selectedUser: stubSelectedUser,
      myPageUser: stubMyPageUserData,
    });
  });

  it("should clear myPageUser on 'RESET_MYPAGE_USER'", () => {
    const newState = reducer(
      {
        isSignedIn: true,
        selectedUser: stubSelectedUser,
        myPageUser: stubMyPageUserData,
      },
      {
        type: actionTypes.RESET_MYPAGE_USER,
      },
    );
    expect(newState).toEqual({
      isSignedIn: true,
      selectedUser: stubSelectedUser,
      myPageUser: undefined,
    });
  });
});
