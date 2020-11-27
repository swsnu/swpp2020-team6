import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "../../store/store";
import * as roadmapActionCreators from "../../store/actions/roadmap";
import getMockStore from "../../test-utils/mocks";

import RoadmapCarousel from "./RoadmapCarousel";

const stubUserData = { user_id: 1, username: "test" };

const sutbUserState = {
  isSignedIn: true,
  selectedUser: stubUserData,
};

const initialRoadmapState = {
  selectedRoadmap: undefined,
  bestRoadmaps: [],
  bestRoadmapsError: null,
  newRoadmaps: [],
  newRoadmapsError: null,
};

const stubSimpleRoadmap = {
  id: 11,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  description: "description",
  private: false,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 5,
  author_id: 5,
  author_name: "swpp",
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
    {
      tag_id: 3,
      tag_name: "swpp2020",
    },
    {
      tag_id: 5,
      tag_name: "js",
    },
    {
      tag_id: 6,
      tag_name: "django",
    },
    {
      tag_id: 7,
      tag_name: "agile",
    },
    {
      tag_id: 8,
      tag_name: "redux",
    },
    {
      tag_id: 9,
      tag_name: "git",
    },
  ],
};

const filledRoadmapState = {
  selectedRoadmap: undefined,
  bestRoadmaps: [stubSimpleRoadmap],
  bestRoadmapsError: null,
  newRoadmaps: [stubSimpleRoadmap],
  newRoadmapsError: null,
};

const mockStore = getMockStore(sutbUserState, initialRoadmapState);
const mockStoreFilled = getMockStore(sutbUserState, filledRoadmapState);

describe("App", () => {
  let spyGetBestRoadmaps;
  let spyGetNewRoadmaps;
  beforeEach(() => {
    spyGetBestRoadmaps = jest
      .spyOn(roadmapActionCreators, "getBestRoadmaps")
      .mockImplementation(() => {
        return () => {};
      });
    spyGetNewRoadmaps = jest
      .spyOn(roadmapActionCreators, "getNewRoadmaps")
      .mockImplementation(() => {
        return () => {};
      });
  });

  afterEach(() => jest.clearAllMocks());

  it("should show new, best roadmaps", () => {
    const component = mount(
      <Provider store={mockStoreFilled}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={RoadmapCarousel} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const bestRoadmaps = component.find(".best-roadmaps");
    expect(bestRoadmaps.length).toBe(1);
  });
});
