import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import SearchResult from "./SearchResult";

import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreatorsUser from "../../store/actions/search";

const stubUserState = {
  isSignedIn: true,
  selectedUser: {
    user_id: 1,
    username: "user1",
    email: "user1@gmail.com",
    user_picture_url: "",
    pinned_roadmaps: [],
    liked_roadmaps: [],
    my_roadmaps: [],
  },
};

const stubInitialRoadmapState = {
  selectedRoadmap: undefined,
};

const stubInitialSearchState = {
  searchResult: [
    {
      title: "test-search-result-title",
      tags: [
        { tag_id: 1, tag_name: "tag1" },
        { tag_id: 2, tag_name: "tag2" },
      ],
      author_name: "test_user",
      image_id: 1,
    },
  ],
  topTags: ["top_tag1"],
  page: 1,
  totalCount: 1,
};

const stubInitialSearchState2 = {
  searchResult: [
    {
      title: "test-search-result-title",
      tags: [
        { tag_id: 1, tag_name: "tag1" },
        { tag_id: 2, tag_name: "tag2" },
      ],
      author_name: "test_user",
      image_id: 1,
    },
  ],
  topTags: ["top_tag1"],
  page: 1,
  totalCount: 9,
};

const mockStore = getMockStore(stubUserState, stubInitialRoadmapState, stubInitialSearchState);
const mockStore2 = getMockStore(stubUserState, stubInitialRoadmapState, stubInitialSearchState2);

describe("<Search />", () => {
  let searchResult;
  let spyGetSimpleSearch;
  let spyGetAdvancedSearch;
  let spyGetTopTags;
  // let spyHistoryPush;

  beforeEach(() => {
    spyGetSimpleSearch = jest
      .spyOn(actionCreatorsUser, "getSimpleSearch")
      .mockImplementation(() => {
        return () => {};
      });
    spyGetAdvancedSearch = jest
      .spyOn(actionCreatorsUser, "getAdvancedSearch")
      .mockImplementation(() => {
        return () => {};
      });
    spyGetTopTags = jest.spyOn(actionCreatorsUser, "getTopTags").mockImplementation(() => {
      return () => {};
    });
    // spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {});
    searchResult = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <SearchResult history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render properly", () => {
    const component = mount(searchResult);
    const wrapper = component.find(".SearchResult");
    expect(wrapper.length).toBe(1);
    expect(spyGetTopTags).toHaveBeenCalledTimes(1);
  });

  // total_count is 9, searchResult has tags.
  it("should render properly2", () => {
    const component = mount(
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <SearchResult history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find(".SearchResult");
    expect(wrapper.length).toBe(1);
  });

  it("should work properly with tags ", () => {
    const component = mount(searchResult);
    // type new tag
    const testNewTag = "testNewTag";
    let wrapper = component.find("#new-tag");
    wrapper.simulate("change", { target: { value: testNewTag } });

    // add new tag
    wrapper = component.find("#add-tag-button");
    wrapper.simulate("click");
    const searchResultInstance = component.find(SearchResult.WrappedComponent).instance();
    expect(searchResultInstance.state.tags).toEqual(["testNewTag"]);

    // add from top tag
    wrapper = component.find(".add-top-tag-button");
    wrapper.simulate("click");
    expect(searchResultInstance.state.tags).toEqual(["testNewTag", "top_tag1"]);

    // click again for branch coverage
    wrapper = component.find(".add-top-tag-button");
    wrapper.simulate("click");
  });

  it("should work properly with different levels ", () => {
    const component = mount(searchResult);
    const searchResultInstance = component.find(SearchResult.WrappedComponent).instance();
    searchResultInstance.calcLevelData(true, true, true);
    searchResultInstance.calcLevelData(true, true, false);
    searchResultInstance.calcLevelData(true, false, false);
    searchResultInstance.calcLevelData(false, false, false);
    searchResultInstance.calcLevelData(false, false, true);
    searchResultInstance.calcLevelData(false, true, true);
    searchResultInstance.calcLevelData(true, false, true);
    searchResultInstance.calcLevelData(false, true, false);
  });

  it("should work properly when checking levels", () => {
    const component = mount(searchResult);
    let wrapper = component.find("#basic");
    wrapper.simulate("change", { target: { checked: true } });
    wrapper = component.find("#intermediate");
    wrapper.simulate("change", { target: { checked: true } });
    wrapper = component.find("#advanced");
    wrapper.simulate("change", { target: { checked: true } });
  });

  it("should simulate changing SortBy", () => {
    const component = mount(searchResult);
    const searchResultInstance = component.find(SearchResult.WrappedComponent).instance();
    searchResultInstance.onChangeSortBy(1);
  });

  it("should work properly when clicking page button", () => {
    const component = mount(searchResult);
    const wrapper = component.find("#page1");
    wrapper.simulate("click");
    expect(spyGetAdvancedSearch).toHaveBeenCalledTimes(1);
  });

  it("should simulate various methods", () => {
    const component = mount(searchResult);
    const searchResultInstance = component.find(SearchResult.WrappedComponent).instance();
    searchResultInstance.onClickDeleteTag(1);
    searchResultInstance.onClickPageNumber(1);
  });

  it("should work properly with advanced search ", () => {
    const component = mount(searchResult);
    // type title to search
    const exampleTitle = "exampleTitle";
    let wrapper = component.find("#advanced-search-input");
    wrapper.simulate("change", { target: { value: exampleTitle } });

    // click advanced search button
    wrapper = component.find("#advanced-search-button");
    wrapper.simulate("click");
    expect(spyGetAdvancedSearch).toHaveBeenCalledTimes(1);
  });
});
