import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import CreateRoadmap from "./CreateRoadmap";
import CreateSection from "../../components/CreateSection/CreateSection";

const userInitNull = {
  selectedUser: null,
};
const userInit = {
  selectedUser: { id: 1, username: "test" },
};
const roadmapInit = {
  selectedRoadmap: null,
  selectedRoadmapErrorStatus: null,
  createRoadmapErrorStatus: null,
  editRoadmapErrorStatus: null,
};

const mockStore = getMockStore(userInit, roadmapInit);
const mockStoreNull = getMockStore(userInitNull, roadmapInit);

describe("<CreateRoadmap />", () => {
  let createRoadmap;
  let spyHistoryPush;
  beforeEach(() => {
    createRoadmap = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <CreateRoadmap selectedUser={userInit.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyHistoryPush = jest.spyOn(history, "push").mockImplementation(() => {});
  });

  afterEach(() => jest.clearAllMocks());

  // Unit Test

  it("should redirect to sign in page if not signed in", () => {
    const tmpCreateRoadmap = (
      <Provider store={mockStoreNull}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <CreateRoadmap selectedUser={userInitNull.selectedUser} />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(tmpCreateRoadmap);
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.props.selectedUser).toBe(null);
    expect(spyHistoryPush).toHaveBeenCalledWith("/signin");
    spyHistoryPush.mockRestore();
  });

  it("should set state on input changes", () => {
    const title = "test-title";
    const level = 2;
    const component = mount(createRoadmap);
    let wrapper = component.find("#roadmap-title");
    wrapper.simulate("change", { target: { value: title } });
    let instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.title).toBe(title);
    wrapper = component.find("#roadmap-level");
    wrapper.simulate("change", { target: { value: level } });
    instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.level).toBe(level);
  });

  it("should call 'onClickCreateSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0]).toEqual({ title: "", tasks: [] });
    wrapper = component.find(CreateSection);
    expect(wrapper.length).toBe(1);
  });

  it("should call 'onClickDeleteSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    const sectionsNum = instance.state.sections.length;
    wrapper = component.find(".delete-section-button");
    wrapper.simulate("click");
    expect(instance.state.sections.length).toBe(sectionsNum - 1);
  });

  it("should call 'onChangeSectionTitle'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".create-section-title");
    wrapper.simulate("change", { target: { value: "1" } });
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].title).toBe("1");
  });

  it("should call 'onClickUpSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".create-section-title");
    wrapper.at(0).simulate("change", { target: { value: "1" } });
    wrapper.at(1).simulate("change", { target: { value: "2" } });
    wrapper = component.find(".create-section-up");
    wrapper.at(1).simulate("click");
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].title).toBe("2");
    expect(instance.state.sections[1].title).toBe("1");
  });

  it("should call 'onClickDownSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".create-section-title");
    wrapper.at(0).simulate("change", { target: { value: "1" } });
    expect();
    wrapper.at(1).simulate("change", { target: { value: "2" } });
    wrapper = component.find(".create-section-down");
    wrapper.at(0).simulate("click");
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].title).toBe("2");
    expect(instance.state.sections[1].title).toBe("1");
  });

  it("should call 'onClickCreateTask'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.simulate("click");
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].tasks[0]).toEqual({
      title: "",
      type: 0,
      url: "",
      description: "",
    });
  });

  it("should call 'onClickDeleteTask'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.simulate("click");
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    const tasksNum = instance.state.sections[0].tasks.length;
    wrapper = component.find(".delete-task-button");
    wrapper.simulate("click");
    expect(instance.state.sections[0].tasks.length).toBe(tasksNum - 1);
  });

  it("should call 'onChangeTaskTitle', 'onChangeTaskType', 'onChangeTaskUrl', and 'onChangeTaskDescription'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".create-section-title");
    wrapper.simulate("change", { target: { value: "1" } });
    const instance = component.find(CreateRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].title).toBe("1");
  });
});
