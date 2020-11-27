import React from "react";
import { mount } from "enzyme";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import UpperSearchBar from "./UpperSearchBar";
import { history } from "../../store/store";
import getMockStore from "../../test-utils/mocks";
import * as searchActionCreators from "../../store/actions/search";

const stubUserData = { user_id: 1, username: "john" };
const stubUserState = { selectedUser: stubUserData };
const stubRoadmapState = { selectedRoadmap: undefined };
const mockStore = getMockStore(stubUserState, stubRoadmapState);

describe("UpperSearchBar", () => {
  let spyPush;
  let spySearch;
  let upperSearchBar;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spySearch = jest.spyOn(searchActionCreators, "getSimpleSearch").mockImplementation(() => {});
    upperSearchBar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UpperSearchBar />
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const component = mount(upperSearchBar);
    const wrapper = component.find(".UpperSearchBar");
    expect(wrapper.length).toBe(1);
    const buttonWrapper = component.find("#search-button");
    expect(buttonWrapper.length).toBe(1);
  });

  it("should not search when input is empty", () => {
    const component = mount(upperSearchBar);
    const buttonWrapper = component.find("#search-button");
    buttonWrapper.simulate("click");
    expect(spySearch).toHaveBeenCalledTimes(0);
  });

  it("should search with the input and redirect to search result page", () => {
    const component = mount(upperSearchBar);
    const buttonWrapper = component.find("#search-button");
    const inputWrapper = component.find("#search-input");
    inputWrapper.simulate("change", { target: { value: "swpp" } });
    buttonWrapper.simulate("click");
    expect(spySearch).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledTimes(1);
  });
});
