import React from "react";
import { mount } from "enzyme";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import UpperUserBar from "./UpperUserBar";
import { history } from "../../store/store";
import getMockStore from "../../test-utils/mocks";
import * as actionCreatorsUser from "../../store/actions/user";

const stubUserData = { user_id: 1, username: "john" };
const stubUserState = {
  isSignedIn: true,
  selectedUser: stubUserData,
};
const stubRoadmapState = { selectedRoadmap: undefined };
const stubSearchState = {
  searchResult: [],
  topTags: [],
  page: 1,
  totalCount: 1,
};
const mockStore = getMockStore(stubUserState, stubRoadmapState, stubSearchState);

describe("UpperUserBar", () => {
  let spyPush;
  let spyAlert;
  let upperUserBar;
  let spySignOut;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    spySignOut = jest.spyOn(actionCreatorsUser, "signOut").mockImplementation(() => {
      return () => {};
    });
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

  it("should sign out correctly", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#signout-button");
    expect(buttonWrapper.length).toBeTruthy();
    buttonWrapper.at(0).props().onClick();
    expect(spySignOut).toHaveBeenCalledTimes(1);
  });

  it("should redirect to create roadmap page when it's clicked", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#create-roadmap-button");
    expect(buttonWrapper.length).toBeTruthy();
    buttonWrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/roadmap/create");
  });
  it("should redirect to my page when it's clicked", () => {
    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#my-page-button");
    expect(buttonWrapper.length).toBeTruthy();
    buttonWrapper.at(0).props().onClick();
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(`/mypage/${stubUserData.user_id}`);
  });
  it("should not redirect to my page when user is not sign in", () => {
    const stubEmptyUserState = { selectedUser: undefined };
    const mockEmptyStore = getMockStore(stubEmptyUserState, stubRoadmapState, stubSearchState);
    upperUserBar = (
      <Provider store={mockEmptyStore}>
        <ConnectedRouter history={history}>
          <UpperUserBar />
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(upperUserBar);
    const buttonWrapper = component.find("#my-page-button");
    buttonWrapper.at(0).props().onClick();
    expect(spyPush).toHaveBeenCalledTimes(0);
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });
});
