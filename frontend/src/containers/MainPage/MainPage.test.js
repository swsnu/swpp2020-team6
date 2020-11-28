import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../../store/store";
import getMockStore from "../../test-utils/mocks";

import MainPage from "./MainPage";

jest.mock("./RoadmapCarousel", () => {
  return jest.fn(() => {
    return <div className="spyRoadmapCarousel" />;
  });
});

const stubUserData = { user_id: 1, username: "test" };

const sutbUserState = {
  isSignedIn: true,
  selectedUser: stubUserData,
};

const unAuthorizedUserState = {
  isSignedIn: false,
  selectedUser: undefined,
};

const initialRoadmapState = {
  selectedRoadmap: undefined,
  bestRoadmaps: [],
  bestRoadmapsError: null,
  newRoadmaps: [],
  newRoadmapsError: null,
};
const mockStore = getMockStore(sutbUserState, initialRoadmapState);
const mockUnauthorizedUserStore = getMockStore(unAuthorizedUserState, initialRoadmapState);

describe("App", () => {
  let spyPush;
  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
  });

  afterEach(() => jest.clearAllMocks());

  it("should render contents when user is singedin", () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <MainPage history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find(".carousel-item").length).toBe(3);
  });

  it("should redirect to login page when user isn't logged in", () => {
    const component = mount(
      <Provider store={mockUnauthorizedUserStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <MainPage history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const divWrapper = component.find("h1");
    expect(divWrapper.length).toBe(1);
    expect(spyPush).toHaveBeenCalledTimes(1);
  });
});
