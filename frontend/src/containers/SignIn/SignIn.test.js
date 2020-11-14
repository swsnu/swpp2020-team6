import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";

import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreatorsUser from "../../store/actions/user";

const stubAuthorizedUserState = {
  isSignedIn: true,
  selectedUser: undefined,
};

const stubUnauthorizedUserState = {
  isSignedIn: false,
  selectedUser: undefined,
};

const stubInitialRoadmapState = {
  selectedRoadmap: undefined,
};

const authorizedMockStore = getMockStore(stubAuthorizedUserState, stubInitialRoadmapState);
const unauthorizedMockStore = getMockStore(stubUnauthorizedUserState, stubInitialRoadmapState);

describe("<SignIn />", () => {
  let spySignIn;
  let spyHistoryPush;
  let spyAlert;

  beforeEach(() => {
    spySignIn = jest.spyOn(actionCreatorsUser, "signIn").mockImplementation(() => {
      return () => {};
    });
    spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* ----------- Unauthorized User ----------------*/
  it("should render properly", () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find(".SignIn");
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'signIn' at 'onClickSignIn'`, () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const username = "user1";
    const password = "pw1";
    let wrapper = component.find("#username-input");
    wrapper.simulate("change", { target: { value: username } });
    wrapper = component.find("#password-input");
    wrapper.simulate("change", { target: { value: password } });
    wrapper = component.find("#signin-button");
    wrapper.simulate("click");
    expect(spySignIn).toHaveBeenCalledTimes(1);
  });

  it(`should push at 'onClickSignUp'`, () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find("#signup-button");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it(`should push at 'onClickHome'`, () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find("#home-button");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it(`should show alert at 'onClickForgotPassword'`, () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find("#forgot-password-button");
    wrapper.simulate("click");
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });

  /* ----------- Authorized User ----------------*/
  it(`should show alert when user is already signed in`, () => {
    // eslint-disable-next-line no-unused-vars
    const component = mount(
      <Provider store={authorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignIn} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });
});
