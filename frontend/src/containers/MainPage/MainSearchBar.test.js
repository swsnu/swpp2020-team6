import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import MainSearchBar from "./MainSearchBar";
import getMockStore from "../../test-utils/mocks";

const stubUserData = { user_id: 1, username: "john" };
const stubUserState = { selectedUser: stubUserData };
const stubRoadmapState = { selectedRoadmap: undefined };
const stubSearchState = {
  searchResult: [],
  topTags: [],
  page: 1,
  totalCount: 1,
};
const mockStore = getMockStore(stubUserState, stubRoadmapState, stubSearchState);

describe("MainSearchBar", () => {
  let spyReplace;
  let mainSearchBar;

  beforeEach(() => {
    spyReplace = jest.spyOn(window.location, "replace").mockImplementation(() => {
      return () => {};
    });
    mainSearchBar = (
      <Provider store={mockStore}>
        <MainSearchBar />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const component = mount(mainSearchBar);
    const wrapper = component.find(".MainSearchBar");
    expect(wrapper.length).toBe(1);
    const buttonWrapper = component.find("#search-button");
    expect(buttonWrapper.length).toBeTruthy();
  });

  it("should not search when input is empty", () => {
    const component = mount(mainSearchBar);
    const buttonWrapper = component.find(
      ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.Mui-disabled.Mui-disabled",
    );
    buttonWrapper.simulate("click");
    expect(spyReplace).toHaveBeenCalledTimes(0);
  });

  it("should search with the input and redirect to search result page", () => {
    const component = mount(mainSearchBar);
    const buttonWrapper = component.find("#search-button");
    const inputWrapper = component.find("#search-input");
    inputWrapper.simulate("change", { target: { value: "swpp" } });
    buttonWrapper.at(0).props().onClick();
    expect(spyReplace).toHaveBeenCalledTimes(1);
  });
});
