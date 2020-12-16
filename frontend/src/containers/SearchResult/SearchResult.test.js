import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import SearchResult from "./SearchResult";
import SimpleRoadmap from "../../components/SimpleRoadmap/SimpleRoadmap";

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

const stubInitialSearchState3 = {
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
  page: 2,
  totalCount: 10,
};

const stubInitialSearchState4 = {
  searchResult: [
    {
      id: 1,
      private: false,
      image_id: 1,
      title: "test-search-result-title",
      date: "2020-11-20 02:45:00",
      level: 2,
      description: "test",
      like_count: 0,
      comment_count: 1,
      pin_count: 1,
      progress: 1,
      original_author: 1,
      author_id: 1,
      author_name: "test_user",
      author_user_picture_url: "",
      tags: [
        { tag_id: 1, tag_name: "tag1" },
        { tag_id: 2, tag_name: "tag2" },
      ],
    },
  ],
  topTags: ["top_tag1"],
  page: 1,
  totalCount: 1,
};

const advancedSearchInput = "test";
const tagQuery = "tag1+tag2";
const levelQuery = "011";
const sortBy = 1;
const page = 1;
const perpage = 9;

const stubSearchQuery = `/search/?${advancedSearchInput}&${tagQuery}&${levelQuery}&${sortBy}&${page}&${perpage}`;
const stubSearchQueryEmptyTags = `/search/?${advancedSearchInput}&&${levelQuery}&${sortBy}&${page}&${perpage}`;

const mockStore = getMockStore(stubUserState, stubInitialRoadmapState, stubInitialSearchState);
const mockStore3 = getMockStore(stubUserState, stubInitialRoadmapState, stubInitialSearchState3);
const mockStore4 = getMockStore(stubUserState, stubInitialRoadmapState, stubInitialSearchState4);

describe("<Search />", () => {
  let searchResult;
  let spyGetAdvancedSearch;
  let spyGetTopTags;
  let spyReplace;
  let spyPush;

  beforeEach(() => {
    spyReplace = jest.spyOn(window.location, "replace").mockImplementation(() => {});
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyGetAdvancedSearch = jest
      .spyOn(actionCreatorsUser, "getAdvancedSearch")
      .mockImplementation(() => {
        return () => {};
      });
    spyGetTopTags = jest.spyOn(actionCreatorsUser, "getTopTags").mockImplementation(() => {
      return () => {};
    });
    searchResult = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchResult history={history} location={{ search: stubSearchQuery }} />
              )}
            />
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

  // total_count is 1, searchResult has tags.
  it("should render properly2 and handle SimpleRoadmap click", () => {
    const component = mount(
      <Provider store={mockStore4}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchResult history={history} location={{ search: stubSearchQuery }} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find(".SearchResult");
    expect(wrapper.length).toBe(1);
    const simpleRoadmapWrapper = component.find(SimpleRoadmap);
    simpleRoadmapWrapper.props().onClick();
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  it("should rencer tags properly with no tag inputs", () => {
    const component = mount(
      <Provider store={mockStore4}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchResult history={history} location={{ search: stubSearchQueryEmptyTags }} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const instance = component.find(SearchResult.WrappedComponent).instance();
    expect(instance.state.tags).toEqual([]);
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
    expect(searchResultInstance.state.tags).toEqual(["tag1", "tag2", "testNewTag"]);

    // add from top tag
    wrapper = component.find(".add-top-tag-button");
    wrapper.simulate("click");
    expect(searchResultInstance.state.tags).toEqual(["tag1", "tag2", "testNewTag", "top_tag1"]);

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
    const wrapper = component.find("#sortBy");
    wrapper
      .at(0)
      .props()
      .onChange({ target: { value: "1" } });
  });

  it("should work properly when clicking page button", () => {
    let component = mount(searchResult);
    let wrapper = component.find("#page1");
    expect(wrapper.length).toBe(0);
    component.unmount();

    component = mount(
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <SearchResult history={history} location={{ search: stubSearchQuery }} />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    wrapper = component.find("#page1");
    wrapper.simulate("click");
    expect(spyReplace).toHaveBeenCalledTimes(1);
  });

  it("should add & delete tag properly", () => {
    const component = mount(searchResult);
    const searchResultInstance = component.find(SearchResult.WrappedComponent).instance();

    // add tag
    const addTagButton = component.find("#add-tag-button");
    const tagInput = component.find("#new-tag");
    tagInput.simulate("change", { target: { value: "tag" } });
    addTagButton.simulate("click");

    // delete tag
    const deleteTagButton = component.find(".delete-tag-button");
    expect(deleteTagButton.length).toBe(3);
    deleteTagButton.at(0).simulate("click");
    expect(searchResultInstance.state.tags.length).toBe(2);
  });

  it("should work properly with advanced search ", () => {
    const component = mount(searchResult);
    // type title to search
    const exampleTitle = "exampleTitle";
    let wrapper = component.find("#advanced-search-input");
    wrapper.simulate("change", { target: { value: exampleTitle } });

    // click advanced search button
    wrapper = component.find("#advanced-search-button");
    wrapper.at(0).simulate("click");
    expect(spyGetAdvancedSearch).toHaveBeenCalledTimes(1);
    expect(spyReplace).toHaveBeenCalledTimes(1);
  });
});
