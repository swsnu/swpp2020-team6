import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import CreateRoadmap from "./CreateRoadmap";
import Roadmap from "../Roadmap/Roadmap";
import CreateSection from "../../components/CreateSection/CreateSection";
import * as actionCreators from "../../store/actions/roadmap";

const initialUserStateUndefined = {
  selectedUser: undefined,
};
const initialUserState = {
  selectedUser: { user_id: 1, username: "test" },
};
const initialRoadmapState = {
  selectedRoadmap: null,
};

const mockStore = getMockStore(initialUserState, initialRoadmapState);
const mockStoreUndefined = getMockStore(initialUserStateUndefined, initialRoadmapState);

describe("<CreateRoadmap />", () => {
  let createRoadmap;
  let spyHistoryGoBack;
  let spyAlert;

  beforeEach(() => {
    createRoadmap = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <CreateRoadmap selectedUser={initialUserState.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyHistoryGoBack = jest.spyOn(history, "goBack").mockImplementation(() => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
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
                return <CreateRoadmap selectedUser={initialUserStateUndefined.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    mount(tmpCreateRoadmap);
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledTimes(1);
    spyHistoryGoBack.mockRestore();
    spyAlert.mockRestore();
  });

  it("should set state on input changes", () => {
    const title = "test-title";
    const level = 2;
    const newTag = "test";
    const isPrivate = true;
    const description = "test";
    const component = mount(createRoadmap);
    let wrapper = component.find("#roadmap-title");
    wrapper.simulate("change", { target: { value: title } });
    wrapper = component.find("#roadmap-level");
    wrapper.simulate("change", { target: { value: level } });
    wrapper = component.find("#new-tag");
    wrapper.simulate("change", { target: { value: newTag } });
    wrapper = component.find("#roadmap-private");
    wrapper.at(2).simulate("click");
    wrapper = component.find("#roadmap-description");
    wrapper.simulate("change", { target: { value: description } });
    const instance = component.find(Roadmap).instance();
    expect(instance.state.title).toBe(title);
    expect(instance.state.level).toBe(level);
    expect(instance.state.newTag).toBe(newTag);
    expect(instance.state.isPrivate).toBe(isPrivate);
    expect(instance.state.description).toBe(description);
  });

  it("should call 'onClickAddTag', 'onClickDeleteTag'", () => {
    const component = mount(createRoadmap);
    const newTag = "test";
    let wrapper = component.find("#new-tag");
    wrapper.simulate("change", { target: { value: newTag } });
    wrapper = component.find("#add-tag-button");
    wrapper.simulate("click");
    const instance = component.find(Roadmap).instance();
    expect(instance.state.tags).toEqual([newTag]);
    wrapper = component.find(".delete-tag");
    wrapper.at(0).simulate("click");
    expect(instance.state.tags).toEqual([]);
  });

  it("should call 'onClickCreateSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0]).toEqual({ section_title: "", tasks: [] });
    wrapper = component.find(CreateSection);
    expect(wrapper.length).toBe(1);
  });

  // Integration Test

  it("should call 'onClickDeleteSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    const instance = component.find(Roadmap).instance();
    const sectionsNum = instance.state.sections.length;
    wrapper = component.find(".delete-section-button");
    wrapper.simulate("click");
    expect(instance.state.sections.length).toBe(sectionsNum - 1);
  });

  it("should call 'onChangeSectionTitle'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find(".section-title");
    wrapper.simulate("change", { target: { value: "1" } });
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].section_title).toBe("1");
  });

  it("should call 'onClickUpSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".section-title");
    wrapper.at(0).simulate("change", { target: { value: "0" } });
    wrapper.at(1).simulate("change", { target: { value: "1" } });
    wrapper.at(2).simulate("change", { target: { value: "2" } });
    wrapper = component.find(".up-section-button");
    wrapper.at(1).simulate("click");
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].section_title).toBe("1");
    expect(instance.state.sections[1].section_title).toBe("0");
    expect(instance.state.sections[2].section_title).toBe("2");
  });

  it("should call 'onClickDownSection'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".section-title");
    wrapper.at(0).simulate("change", { target: { value: "0" } });
    wrapper.at(1).simulate("change", { target: { value: "1" } });
    wrapper.at(2).simulate("change", { target: { value: "2" } });
    wrapper = component.find(".down-section-button");
    wrapper.at(0).simulate("click");
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].section_title).toBe("1");
    expect(instance.state.sections[1].section_title).toBe("0");
    expect(instance.state.sections[2].section_title).toBe("2");
  });

  it("should call 'onClickCreateTask'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].tasks[0]).toEqual({
      task_title: "",
      task_type: 0,
      task_url: "",
      task_description: "",
    });
    expect(instance.state.sections[1].tasks.length).toBe(0);
  });

  it("should call 'onClickDeleteTask'", () => {
    const component = mount(createRoadmap);
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(1).simulate("click");
    const instance = component.find(Roadmap).instance();
    const tasksNum0 = instance.state.sections[0].tasks.length;
    const tasksNum1 = instance.state.sections[1].tasks.length;
    wrapper = component.find(".delete-task-button");
    wrapper.at(0).simulate("click");
    expect(instance.state.sections[0].tasks.length).toBe(tasksNum0 - 1);
    expect(instance.state.sections[1].tasks.length).toBe(tasksNum1);
  });

  it("should call 'onChangeTaskTitle'", () => {
    const component = mount(createRoadmap);
    const testTitle = "test";
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".task-title");
    wrapper.at(0).simulate("change", { target: { value: testTitle } });
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].tasks[0].task_title).toEqual(testTitle);
    expect(instance.state.sections[0].tasks[1].task_title).toEqual("");
    expect(instance.state.sections[1]).toEqual({ section_title: "", tasks: [] });
  });

  it("should call 'onChangeTaskType'", () => {
    const component = mount(createRoadmap);
    const testType = 2;
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".task-type");
    wrapper.at(0).simulate("change", { target: { value: testType } });
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].tasks[0].task_type).toEqual(testType);
    expect(instance.state.sections[0].tasks[1].task_type).toEqual(0);
    expect(instance.state.sections[1]).toEqual({ section_title: "", tasks: [] });
  });

  it("should call 'onChangeTaskUrl'", () => {
    const component = mount(createRoadmap);
    const testUrl = "test";
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".task-url");
    wrapper.at(0).simulate("change", { target: { value: testUrl } });
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].tasks[0].task_url).toEqual(testUrl);
    expect(instance.state.sections[0].tasks[1].task_url).toEqual("");
    expect(instance.state.sections[1]).toEqual({ section_title: "", tasks: [] });
  });

  it("should call 'onChangeTaskDescription'", () => {
    const component = mount(createRoadmap);
    const testDescription = "test";
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".task-description");
    wrapper.at(0).simulate("change", { target: { value: testDescription } });
    const instance = component.find(Roadmap).instance();
    expect(instance.state.sections[0].tasks[0].task_description).toEqual(testDescription);
    expect(instance.state.sections[0].tasks[1].task_description).toEqual("");
    expect(instance.state.sections[1]).toEqual({ section_title: "", tasks: [] });
  });

  it("should call 'onClickUpTask'", () => {
    const component = mount(createRoadmap);
    const instance = component.find(Roadmap).instance();
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".task-title");
    wrapper.at(0).simulate("change", { target: { value: "0" } });
    wrapper.at(1).simulate("change", { target: { value: "1" } });
    wrapper.at(2).simulate("change", { target: { value: "2" } });
    wrapper = component.find(".up-task-button");
    wrapper.at(1).simulate("click");
    expect(instance.state.sections[0].tasks[0].task_title).toBe("1");
    expect(instance.state.sections[0].tasks[1].task_title).toBe("0");
    expect(instance.state.sections[0].tasks[2].task_title).toBe("2");
    expect(instance.state.sections[1]).toEqual({ section_title: "", tasks: [] });
  });

  it("should call 'onClickDownTask'", () => {
    const component = mount(createRoadmap);
    const instance = component.find(Roadmap).instance();
    let wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".task-title");
    wrapper.at(0).simulate("change", { target: { value: "0" } });
    wrapper.at(1).simulate("change", { target: { value: "1" } });
    wrapper.at(2).simulate("change", { target: { value: "2" } });
    wrapper = component.find(".down-task-button");
    wrapper.at(0).simulate("click");
    expect(instance.state.sections[0].tasks[0].task_title).toBe("1");
    expect(instance.state.sections[0].tasks[1].task_title).toBe("0");
    expect(instance.state.sections[0].tasks[2].task_title).toBe("2");
    expect(instance.state.sections[1]).toEqual({ section_title: "", tasks: [] });
  });

  it("should call 'onClickCreateBack' - no confirm", () => {
    const component = mount(createRoadmap);
    const wrapper = component.find("#back-roadmap-button");
    wrapper.simulate("click");
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
    spyHistoryGoBack.mockRestore();
  });

  it("should call 'onClickCreateBack' - confirm=True", () => {
    const spyBackConfirmTrue = jest.spyOn(window, "confirm").mockImplementation(() => true);
    const component = mount(createRoadmap);
    const wrapper = component.find("#back-roadmap-button");
    const wrapper2 = component.find("#create-section-button");
    wrapper2.simulate("click");
    wrapper.simulate("click");
    expect(spyBackConfirmTrue).toHaveBeenCalledTimes(1);
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
    spyHistoryGoBack.mockRestore();
  });

  it("should call 'onClickCreateBack' - confirm=False", () => {
    const spyBackConfirmFalse = jest.spyOn(window, "confirm").mockImplementation(() => false);
    const component = mount(createRoadmap);
    const wrapper = component.find("#back-roadmap-button");
    const wrapper2 = component.find("#create-section-button");
    wrapper2.simulate("click");
    wrapper.simulate("click");
    expect(spyBackConfirmFalse).toHaveBeenCalledTimes(1);
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(0);
    spyHistoryGoBack.mockRestore();
  });

  it("should call 'onClickCreateConfirm'", () => {
    const spyCreateRoadmap = jest.spyOn(actionCreators, "createRoadmap");
    const component = mount(createRoadmap);
    const testTitle = "test";
    const testLevel = 2;
    let wrapper = component.find("#roadmap-title");
    wrapper.simulate("change", { target: { value: testTitle } });
    wrapper = component.find("#roadmap-level");
    wrapper.simulate("change", { target: { value: testLevel } });
    wrapper = component.find("#create-section-button");
    wrapper.simulate("click");
    wrapper = component.find("#confirm-roadmap-button");
    wrapper.simulate("click");
    expect(spyCreateRoadmap).toHaveBeenCalledTimes(1);
  });
});
