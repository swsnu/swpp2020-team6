import React from "react";
import { mount } from "enzyme";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import UpperUserBar from "./UpperUserBar";
import { history } from "../../store/store";
import getMockStore from "../../test-utils/mocks";

const stubUserData = { user_id: 1, username: "john" };
const stubUserState = { selectedUser: stubUserData };
const stubRoadmapState = { selectedRoadmap: undefined };
const mockStore = getMockStore(stubUserState, stubRoadmapState);

describe("UpperUserBar", () => {
  let spyPush;
  let upperUserBar;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
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
    const logoButton = component.find("#signin-button");
    expect(logoButton.length).toBe(1);
    logoButton.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/signin");
  });
  it("should redirect to signup page when it's clicked", () => {
    const component = mount(upperUserBar);
    const logoButton = component.find("#signup-button");
    expect(logoButton.length).toBe(1);
    logoButton.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/signup");
  });
  it("should redirect to signin page when it's clicked", () => {
    const component = mount(upperUserBar);
    const logoButton = component.find("#create-roadmap-button");
    expect(logoButton.length).toBe(1);
    logoButton.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/roadmap/create");
  });
  it("should redirect to signin page when it's clicked", () => {
    const component = mount(upperUserBar);
    const logoButton = component.find("#my-page-button");
    expect(logoButton.length).toBe(1);
    logoButton.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(`/mypage/${stubUserData.user_id}`);
  });
});
