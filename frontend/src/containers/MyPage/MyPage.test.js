import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/user";

import MyPage from "./MyPage";

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

const stubMyPageUserData2 = { user_id: 2 };

const stubSelectedUserData = {
  user_id: 2,
  username: "test",
  email: "user@user.com",
  user_picture_url: "",
  my_roadmaps: [
    {
      id: 3,
      private: false,
      title: "test3",
      date: "2020-11-20 02:45:00",
      level: 2,
      description: "test3",
      like_count: 0,
      comment_count: 1,
      pin_count: 1,
      progress: 1,
      original_author: 2,
      author_id: 2,
      author_name: "test3",
      author_user_picture_url: "",
      tags: [
        {
          tag_id: 4,
          tag_name: "test3",
        },
        {
          tag_id: 5,
          tag_name: "test3",
        },
        {
          tag_id: 6,
          tag_name: "test3",
        },
      ],
    },
    {
      id: 4,
      private: false,
      title: "test4",
      date: "2020-11-20 02:54:29",
      level: 2,
      description: "",
      like_count: 0,
      comment_count: 0,
      pin_count: 0,
      progress: 1,
      original_author: 2,
      author_id: 2,
      author_name: "test4",
      author_user_picture_url: "",
      tags: [],
    },
  ],
  pinned_roadmaps: [
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
  liked_roadmaps: [],
};

const initialUserStateNotSignedIn = {
  isSignedIn: false,
  selectedUser: undefined,
  myPageUser: undefined,
};

const initialUserStateMyPageUserUndefined = {
  isSignedIn: true,
  selectedUser: stubSelectedUserData,
  myPageUser: undefined,
};

const initialUserStateMy = {
  isSignedIn: true,
  selectedUser: stubSelectedUserData,
  myPageUser: stubMyPageUserData2,
};

const initialUserStateOther = {
  isSignedIn: true,
  selectedUser: stubSelectedUserData,
  myPageUser: stubMyPageUserData,
};

const initialRoadmapState = { selectedRoadmap: undefined };

const mockStoreNotSignedIn = getMockStore(initialUserStateNotSignedIn, initialRoadmapState);
const mockStoreMyPageUserUndefined = getMockStore(
  initialUserStateMyPageUserUndefined,
  initialRoadmapState,
);
const mockStoreMy = getMockStore(initialUserStateMy, initialRoadmapState);
const mockStoreOther = getMockStore(initialUserStateOther, initialRoadmapState);

describe("<MyPage />", () => {
  let spyHistoryPush;
  let spyAlert;

  beforeEach(() => {
    spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => jest.clearAllMocks());

  it("should render nothing if not signed in", () => {
    const myPage = (
      <Provider store={mockStoreNotSignedIn}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);
    const wrapper = component.find(".MyPage");
    expect(wrapper.length).toBe(0);
    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it("should wait if 'myPageUser' has not been received", () => {
    const myPage = (
      <Provider store={mockStoreMyPageUserUndefined}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage selectedUser={stubSelectedUserData} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);
    const wrapper = component.find(".loading");
    expect(wrapper.length).toBe(1);
  });

  it("should activate My Roadmaps only on the other user's MyPage", () => {
    const myPage = (
      <Provider store={mockStoreOther}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage selectedUser={stubSelectedUserData} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);
    const wrapper = component.find("#mypage-tab");
    wrapper.at(0).props().onChange(null, 0);
    const instance = component.find(MyPage.WrappedComponent).instance();
    expect(instance.state.tab).toBe(0);
  });

  it("should activate both My Roadmaps and Pinned Roadmaps on the user's MyPage", () => {
    const myPage = (
      <Provider store={mockStoreMy}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage selectedUser={stubSelectedUserData} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);
    const wrapper = component.find("#mypage-tab");
    wrapper.at(0).props().onChange(null, 0);
    const instance = component.find(MyPage.WrappedComponent).instance();
    expect(instance.state.tab).toBe(0);
    wrapper.at(0).props().onChange(null, 1);
    expect(instance.state.tab).toBe(1);
  });

  it("should clear MyPageUser before unmount", () => {
    const myPage = (
      <Provider store={mockStoreMy}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage selectedUser={stubSelectedUserData} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const spyReset = jest.spyOn(actionCreators, "resetMyPageUser_");
    const component = mount(myPage);
    component.unmount();
    expect(spyReset).toHaveBeenCalledTimes(1);
  });
});