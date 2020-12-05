/* eslint-disable no-unused-vars */
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import App from "./App";
import { history } from "./store/store";
import * as userActionCreators from "./store/actions/user";
import getMockStore from "./test-utils/mocks";

jest.mock("./containers/SignIn/SignIn", () => {
  return jest.fn(() => {
    return <div className="spySignIn">hi</div>;
  });
});

jest.mock("./containers/SignUp/SignUp", () => {
  return jest.fn(() => {
    return <div className="spySignUp">hi</div>;
  });
});

jest.mock("./containers/CreateRoadmap/CreateRoadmap", () => {
  return jest.fn(() => {
    return <div className="spyCreateRoadmap">hi</div>;
  });
});

jest.mock("./containers/EditRoadmap/EditRoadmap", () => {
  return jest.fn(() => {
    return <div className="spyEditRoadmap">hi</div>;
  });
});

jest.mock("./containers/RoadmapDetail/RoadmapDetail", () => {
  return jest.fn(() => {
    return <div className="spyRoadmapDetail">hi</div>;
  });
});


jest.mock("./containers/MainPage/MainPage", () => {
  return jest.fn(() => {
    return (
      <div className="spyMain">
        <p>test</p>
      </div>
    );
  });
});

const stubUserData = { user_id: 1, username: "test" };

const stubUserState = {
  isSignedIn: true,
  selectedUser: stubUserData,
  myPageUser: undefined,
};

const stubFalseUserState = {
  isSignedIn: false,
  selectedUser: undefined,
  myPageUser: undefined,
};

const initialUserState = {
  isSignedIn: undefined,
  selectedUser: undefined,
  myPageUser: undefined,
};

const initialRoadmapState = {
  selectedRoadmap: undefined,
  bestRoadmaps: [],
  bestRoadmapsError: null,
  newRoadmaps: [],
  newRoadmapsError: null,
};

const stubInitialSearchState = {
  searchResult: [],
  topTags: [],
  page: 1,
  totalCount: 1,
};

const mockStore = getMockStore(stubUserState, initialRoadmapState, stubInitialSearchState);

const mockFalseStore = getMockStore(
  stubFalseUserState,
  initialRoadmapState,
  stubInitialSearchState,
);


describe("App", () => {
  let app;
  let spyGetUserAuth;
  let spyGetRoadmap;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    spyGetUserAuth = jest.spyOn(userActionCreators, "getUserAuth").mockImplementation(() => {
      return () => {};
    });
  });

  afterEach(() => jest.clearAllMocks());

  it("should render signin for unsigned in user", () => {
    const component = mount(
      <Provider store={mockFalseStore}>
        <App history={history} />
      </Provider>,
    );
    const wrapper = component.find(".spySignIn");
    expect(wrapper.length).toEqual(1);
  });

  it("should render", () => {
    const mockInitStore = getMockStore(
      initialUserState,
      initialRoadmapState,
      stubInitialSearchState,
    );
    const component = mount(
      <Provider store={mockInitStore}>
        <App history={history} />
      </Provider>,
    );
    expect(component.find(".App").length).toBe(1);
    expect(component.find(".loading").length).toBe(1);
  });


  it("should render main", () => {
    history.push("/main");
    const component = mount(app);
    const wrapper = component.find(".spyMain");
    expect(wrapper.length).toEqual(1);
  });

  it("should render SignUp", () => {
    history.push("/signup");
    const mockInitStore = getMockStore(stubFalseUserState, initialRoadmapState, stubInitialSearchState);
    const component = mount(
      <Provider store={mockInitStore}>
        <App history={history} />
      </Provider>,
    );
    const wrapper = component.find(".spySignUp");
    expect(wrapper.length).toEqual(1);
  });

  it("should render SignIn", () => {
    history.push("/signin");
    const component = mount(app);
    const wrapper = component.find(".spySignIn");
    expect(wrapper.length).toEqual(1);
  });

  it("should render CreateRoadmap", () => {
    history.push("/roadmap/create");
    const component = mount(app);
    const wrapper = component.find(".spyCreateRoadmap");
    expect(wrapper.length).toEqual(1);
  });

  it("should render EditRoadmap", () => {
    history.push(`/roadmap/1/edit`);
    const component = mount(app);
    const wrapper = component.find(".spyEditRoadmap");
    expect(wrapper.length).toEqual(1);
  });

  it("should render RoadmapDetail", () => {
    history.push(`/roadmap/${1}`);
    const component = mount(app);
    const wrapper = component.find(".spyRoadmapDetail");
    expect(wrapper.length).toEqual(1);
  });

  it("should render RoadmapDetail", () => {
    history.push(`/anythingblahbalh`);
    const component = mount(app);
    const wrapper = component.find("h1");
    expect(wrapper.length).toEqual(1);
  });
});
