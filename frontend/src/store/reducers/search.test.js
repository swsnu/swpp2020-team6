import reducer from "./search";
import * as actionTypes from "../actions/actionTypes";

const stubSimpleRoadmapData = {
  id: 1,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  description: "description",
  private: false,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 1,
  author_id: 1,
  author_name: "user1",
  author_user_picture_url: "",
  tags: [
    {
      tag_id: 1,
      tag_name: "python",
    },
    {
      tag_id: 2,
      tag_name: "CV",
    },
  ],
};

const stubSimpleRoadmapData2 = {
  id: 2,
  title: "new-rm-title2",
  date: "2020-11-14 05:46:47",
  level: 1,
  description: "description",
  private: false,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 1,
  author_id: 1,
  author_name: "user1",
  author_user_picture_url: "",
  tags: [
    {
      tag_id: 1,
      tag_name: "python",
    },
    {
      tag_id: 2,
      tag_name: "CV",
    },
  ],
};

const stubSearchResult = {
  page: 1,
  total_count: 2,
  roadmaps: [{ stubSimpleRoadmapData }, { stubSimpleRoadmapData2 }],
};

const stubTopTags = { tags: ["stubTag1", "stubTag2"] };

describe("Search Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ searchResult: [], topTags: [], page: 1, totalCount: 1 });
  });

  it("should work properly on 'GET_SIMPLE_SEARCH_SUCCESS'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SIMPLE_SEARCH_SUCCESS,
      searchResult: stubSearchResult,
      topTags: stubTopTags,
      page: 1,
      totalCount: 1,
    });
    expect(newState).toEqual({
      searchResult: stubSearchResult,
      topTags: [],
      page: 1,
      totalCount: 1,
    });
  });

  it("should change nothing for action 'GET_SIMPLE_SEARCH_FAILURE'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SIMPLE_SEARCH_FAILURE,
    });
    expect(newState).toEqual({ searchResult: [], topTags: [], page: 1, totalCount: 1 });
  });

  it("should work properly on 'GET_ADVANCED_SEARCH_SUCCESS'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_ADVANCED_SEARCH_SUCCESS,
      searchResult: stubSearchResult,
      topTags: stubTopTags,
      page: 1,
      totalCount: 1,
    });
    expect(newState).toEqual({
      searchResult: stubSearchResult,
      topTags: [],
      page: 1,
      totalCount: 1,
    });
  });

  it("should change nothing for action 'GET_ADVANCED_SEARCH_FAILURE'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SIMPLE_ADVANCED_FAILURE,
    });
    expect(newState).toEqual({ searchResult: [], topTags: [], page: 1, totalCount: 1 });
  });

  it("should work properly on 'GET_TOP_TAGS_SUCCESS'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_TOP_TAGS_SUCCESS,
      searchResult: stubSearchResult,
      topTags: stubTopTags,
      page: 1,
      totalCount: 1,
    });
    expect(newState).toEqual({
      searchResult: [],
      topTags: stubTopTags,
      page: 1,
      totalCount: 1,
    });
  });

  it("should change nothing for action 'GET_TOP_TAGS_FAILURE'", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_TOP_TAGS_SUCCESS_FAILURE,
    });
    expect(newState).toEqual({ searchResult: [], topTags: [], page: 1, totalCount: 1 });
  });
});
