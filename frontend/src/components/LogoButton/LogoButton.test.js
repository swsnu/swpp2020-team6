import React from "react";
import { mount } from "enzyme";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { history } from "../../store/store";
import getMockStore from "../../test-utils/mocks";
import LogoButton from "./LogoButton";

const stubUserState = { selectedUser: undefined };
const stubRoadmapState = { selectedRoadmap: undefined };
const stubSearchState = {
  searchResult: [],
  topTags: [],
  page: 1,
  totalCount: 1,
};
const mockStore = getMockStore(stubUserState, stubRoadmapState, stubSearchState);

describe("LogoButton", () => {
  let spyPush;
  let logoButton;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    logoButton = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <LogoButton />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const component = mount(logoButton);
    const wrapper = component.find(".LogoButton");
    expect(wrapper.length).toBe(1);
  });

  it("should redirect to home page when it's clicked", () => {
    const component = mount(logoButton);
    const wrapper = component.find("#logo-button");
    expect(wrapper.length).toBe(1);
    wrapper.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith("/home");
  });
});
