import React from "react";
import { mount } from "enzyme";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import UpperUserBar from "./UpperUserBar";
import { history } from "../../store/store";
import getMockStore from "../../test-utils/mocks";

const stubUserData = { user_id: 1, username: "john" };
const stubUserState = {
  isSignedIn: true,
  selectedUser: stubUserData,
};
const stubRoadmapState = { selectedRoadmap: undefined };
const mockStore = getMockStore(stubUserState, stubRoadmapState);

describe("UpperUserBar", () => {
  let spyPush;
  let spyAlert;
  let upperUserBar;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    upperUserBar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UpperUserBar />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const component = mount(upperUserBar);
    const wrapper = component.find(".UpperUserBar");
    expect(wrapper.length).toBe(1);
  });

  it("should redirect to signin page when it's clicked", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#signin-button");
    expect(buttonWrapper.length).toBe(1);
    buttonWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/signin");
  });
  it("should redirect to signup page when it's clicked", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#signup-button");
    expect(buttonWrapper.length).toBe(1);
    buttonWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/signup");
  });
  it("should redirect to create roadmap page when it's clicked", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#create-roadmap-button");
    expect(buttonWrapper.length).toBe(1);
    buttonWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/roadmap/create");
  });
  it("should redirect to my page when it's clicked", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#my-page-button");
    expect(buttonWrapper.length).toBe(1);
    buttonWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(`/mypage/${stubUserData.user_id}`);
  });
  it("should not redirect to my page when user is not sign in", () => {
    const stubEmptyUserState = { selectedUser: undefined };
    const mockEmptyStore = getMockStore(stubEmptyUserState, stubRoadmapState);
    upperUserBar = (
      <Provider store={mockEmptyStore}>
        <ConnectedRouter history={history}>
          <UpperUserBar />
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#my-page-button");
    expect(buttonWrapper.length).toBe(1);
    buttonWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(0);
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });
});
