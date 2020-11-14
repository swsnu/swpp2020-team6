/* eslint-disable no-unused-vars */
import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";

import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import store, { history } from "./store/store";
import * as roadmapActionCreators from "./store/actions/roadmap";
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

jest.mock("./containers/Home/Home", () => {
  return jest.fn(() => {
    return (
      <div className="spyHome">
        <p>test</p>
      </div>
    );
  });
});

const stubUserData = { user_id: 1, username: "test" };

const sutbUserState = {
  isSignedIn: true,
  selectedUser: stubUserData,
};

const initialUserState = {
  isSignedIn: undefined,
  selectedUser: undefined,
};

const initialRoadmapState = {
  selectedRoadmap: undefined,
};
const mockStore = getMockStore(sutbUserState, initialRoadmapState);

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

  it("should render", () => {
    const mockInitStore = getMockStore(initialUserState, initialRoadmapState);
    const component = mount(
      <Provider store={mockInitStore}>
        <App history={history} />
      </Provider>,
    );
    expect(component.find(".App").length).toBe(1);
    expect(component.find(".loading").length).toBe(1);
  });

  it("should render Home", () => {
    history.push("/home");
    const component = mount(app);
    const wrapper = component.find(".spyHome");
    expect(wrapper.length).toEqual(1);
  });
  it("should render SignUp", () => {
    history.push("/signup");
    const component = mount(app);
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
