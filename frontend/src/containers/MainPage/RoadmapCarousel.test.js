import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../../store/store";
import * as roadmapActionCreators from "../../store/actions/roadmap";
import getMockStore from "../../test-utils/mocks";

import RoadmapCarousel from "./RoadmapCarousel";

const stubUserData = { user_id: 1, username: "test" };

const stubUserState = {
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
  image_id: 1,
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

const stubSearchState = {
  searchResult: [{ title: "test-search-result-title" }],
  topTags: ["top_tag1"],
  page: 1,
  totalCount: 1,
};

const mockStore = getMockStore(stubUserState, initialRoadmapState, stubSearchState);
const mockStoreFilled = getMockStore(stubUserState, filledRoadmapState, stubSearchState);

describe("App", () => {
  let spyGetBestRoadmaps;
  let spyGetNewRoadmaps;
  let spyResetBestRoadmaps;
  let spyResetNewRoadmaps;
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
    spyResetBestRoadmaps = jest
      .spyOn(roadmapActionCreators, "resetBestRoadmaps_")
      .mockImplementation(() => {
        return () => {};
      });
    spyResetNewRoadmaps = jest
      .spyOn(roadmapActionCreators, "resetNewRoadmaps_")
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

  it("should get new, best roadmaps", () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={RoadmapCarousel} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const bestRoadmaps = component.find(".carousels");
    expect(bestRoadmaps.length).toBe(1);
    expect(spyGetBestRoadmaps).toHaveBeenCalledTimes(1);
    expect(spyGetNewRoadmaps).toHaveBeenCalledTimes(1);
  });

  it("should redirect on clicking Card", () => {
    const component = mount(
      <Provider store={mockStoreFilled}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={RoadmapCarousel} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const spyPush = jest.spyOn(history, "push").mockImplementation(() => {});

    const cardWrapper = component.find(".MuiPaper-root.MuiPaper-rounded.MuiPaper-elevation1");
    cardWrapper.at(0).simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  it("should reset new, best roadmaps on unmount", () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={RoadmapCarousel} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    component.unmount();
    expect(spyResetNewRoadmaps).toHaveBeenCalledTimes(1);
    expect(spyResetBestRoadmaps).toHaveBeenCalledTimes(1);
  });
});
