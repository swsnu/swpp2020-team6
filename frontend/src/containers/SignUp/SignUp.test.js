import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";

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

describe("<SignUp />", () => {
  let spySignUp;
  let spyHistoryPush;
  let spyAlert;

  beforeEach(() => {
    spySignUp = jest.spyOn(actionCreatorsUser, "signUp").mockImplementation(() => {
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
            <Route path="/" component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find(".SignUp");
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'signUp' at 'onClickSignUp'`, () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const email = "user1@snu.ac.kr";
    const username = "user1";
    const password = "pw1";
    const passwordConfirm = "pw1";
    let wrapper = component.find("#email-input");
    wrapper.simulate("change", { target: { value: email } });
    wrapper = component.find("#username-input");
    wrapper.simulate("change", { target: { value: username } });
    wrapper = component.find("#password-input");
    wrapper.simulate("change", { target: { value: password } });
    wrapper = component.find("#password-confirm-input");
    wrapper.simulate("change", { target: { value: passwordConfirm } });
    wrapper = component.find("#signup-button");
    wrapper.simulate("click");
    expect(spySignUp).toHaveBeenCalledTimes(1);
  });

  it(`should push at 'onClickSignIn'`, () => {
    const component = mount(
      <Provider store={unauthorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find("#signin-button");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  /* ----------- Authorized User ----------------*/
  it(`should show alert and push to home when user is already signed in`, () => {
    // eslint-disable-next-line no-unused-vars
    const component = mount(
      <Provider store={authorizedMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });
});
