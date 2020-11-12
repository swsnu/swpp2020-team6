import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import CreateRoadmap from "./CreateRoadmap";

const userInitUndefined = {
  selectedUser: undefined,
};
const roadmapInit = {
  selectedRoadmap: null,
  selectedRoadmapErrorStatus: null,
  createRoadmapErrorStatus: null,
  editRoadmapErrorStatus: null,
};

// const mockStore = getMockStore(userInit, roadmapInit);
const mockStoreUndefined = getMockStore(userInitUndefined, roadmapInit);

describe("<CreateRoadmap />", () => {
  let spyHistoryGoBack;
  beforeEach(() => {
    spyHistoryGoBack = jest.spyOn(history, "goBack").mockImplementation(() => {});
  });

  afterEach(() => jest.clearAllMocks());

  // Unit Test

  it("should redirect to sign in page if not signed in", () => {
    const tmpCreateRoadmap = (
      <Provider store={mockStoreUndefined}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <CreateRoadmap selectedUser={userInitUndefined.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(tmpCreateRoadmap);
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.props.selectedUser).toBe(undefined);
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
    spyHistoryGoBack.mockRestore();
  });
});
