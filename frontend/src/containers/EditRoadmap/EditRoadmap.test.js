import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import EditRoadmap from "./EditRoadmap";
import * as actionCreators from "../../store/actions/roadmap";

const initialUserStateUndefined = {
  selectedUser: undefined,
};
const initialUserStateNonAuthor = {
  selectedUser: { user_id: 2, username: "nonauthor" },
};
const initialUserState = {
  selectedUser: { user_id: 1, username: "test" },
};
const initialRoadmapStateUndefined = {
  selectedRoadmap: undefined,
};

const initialRoadmapState = {
  selectedRoadmap: {
    author_id: 1,
    title: "test",
    level: 2,
    sections: [
      {
        section_title: "test-section0",
        tasks: [
          {
            task_title: "task0-title",
            task_type: 3,
            task_url: "task0-url",
            task_description: "task0-des",
          },
          {
            task_title: "task1-title",
            task_type: 2,
            task_url: "task1-url",
            task_description: "task1-des",
          },
          {
            task_title: "task2-title",
            task_type: 2,
            task_url: "task2-url",
            task_description: "task2-des",
          },
        ],
      },
      {
        section_title: "test-section1",
        tasks: [
          {
            task_title: "task0-title",
            task_type: 3,
            task_url: "task0-url",
            task_description: "task0-des",
          },
          {
            task_title: "task1-title",
            task_type: 2,
            task_url: "task1-url",
            task_description: "task1-des",
          },
        ],
      },
      {
        section_title: "test-section2",
        tasks: [
          {
            task_title: "task0-title",
            task_type: 3,
            task_url: "task0-url",
            task_description: "task0-des",
          },
          {
            task_title: "task1-title",
            task_type: 2,
            task_url: "task1-url",
            task_description: "task1-des",
          },
        ],
      },
    ],
    tags: [
      { tag_id: 2, tag_name: "tag0" },
      { tag_id: 4, tag_name: "tag1" },
    ],
  },
};

const mockStore = getMockStore(initialUserState, initialRoadmapState);
const mockStoreUserUndefined = getMockStore(initialUserStateUndefined, initialRoadmapState);
const mockStoreUserNonAuthor = getMockStore(initialUserStateNonAuthor, initialRoadmapState);
const mockStoreRoadmapUndefined = getMockStore(initialUserState, initialRoadmapStateUndefined);

describe("<EditRoadmap />", () => {
  let editRoadmap;
  let spyHistoryGoBack;
  let spyAlert;

  beforeEach(() => {
    editRoadmap = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <EditRoadmap selectedUser={initialUserState.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyHistoryGoBack = jest.spyOn(history, "goBack").mockImplementation(() => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(history, "push").mockImplementation(() => {});
    jest.spyOn(actionCreators, "getRoadmap").mockImplementation(() => {
      return () => {};
    });
  });

  afterEach(() => jest.clearAllMocks());

  it("should render nothing if not signed in", () => {
    const tmpEditRoadmap = (
      <Provider store={mockStoreUserUndefined}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <EditRoadmap selectedUser={initialUserStateUndefined.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(tmpEditRoadmap);
    const wrapper = component.find(".CreateRoadmap");
    expect(wrapper.length).toBe(0);
    expect(spyAlert).toHaveBeenCalledTimes(1);
    spyAlert.mockRestore();
  });

  it("should wait if 'selectedRoadmap' has not been received", () => {
    const tmpEditRoadmap = (
      <Provider store={mockStoreRoadmapUndefined}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <EditRoadmap selectedUser={initialUserState.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(tmpEditRoadmap);
    const wrapper = component.find(".loading");
    expect(wrapper.length).toBe(1);
  });

  it("should go back if non-author", () => {
    const tmpEditRoadmap = (
      <Provider store={mockStoreUserNonAuthor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <EditRoadmap selectedUser={initialUserStateNonAuthor.selectedUser} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(tmpEditRoadmap);
    const wrapper = component.find(".CreateRoadmap");
    expect(wrapper.length).toBe(0);
    expect(spyAlert).toHaveBeenCalledTimes(1);
    spyAlert.mockRestore();
  });

  it("should set state if selectedRoadmap has been received", () => {
    const component = mount(editRoadmap);
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state).toEqual({
      ...initialRoadmapState.selectedRoadmap,
      received: true,
      author_id: undefined,
      tags: ["tag0", "tag1"],
      newTag: "",
      addedTagList: [],
      deletedTagList: [],
    });
  });

  it("should set state on input changes", () => {
    const title = "test-title";
    const level = 2;
    const newTag = "test";
    const component = mount(editRoadmap);
    let wrapper = component.find("#roadmap-title");
    wrapper.simulate("change", { target: { value: title } });
    wrapper = component.find("#roadmap-level");
    wrapper.simulate("change", { target: { value: level } });
    wrapper = component.find("#new-tag");
    wrapper.simulate("change", { target: { value: newTag } });
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.title).toBe(title);
    expect(instance.state.level).toBe(level);
    expect(instance.state.newTag).toBe(newTag);
  });

  it("should call 'onClickAddTag', 'onClickDeleteTag'", () => {
    const component = mount(editRoadmap);
    const newTag = "test";
    let wrapper = component.find("#new-tag");
    wrapper.simulate("change", { target: { value: newTag } });
    wrapper = component.find("#add-tag-button");
    wrapper.simulate("click");
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.tags).toEqual(["tag0", "tag1", newTag]);
    expect(instance.state.addedTagList).toEqual([newTag]);
    wrapper = component.find(".delete-tag");
    wrapper.at(0).simulate("click");
    expect(instance.state.tags).toEqual(["tag1", newTag]);
    expect(instance.state.deletedTagList).toEqual(["tag0"]);
  });

  it("should call 'onClickCreateSection'", () => {
    const component = mount(editRoadmap);
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    const sectionsNum = instance.state.sections.length;
    const wrapper2 = component.find("#create-section-button");
    wrapper2.simulate("click");
    expect(instance.state.sections.length).toBe(sectionsNum + 1);
  });

  it("should call 'onClickDeleteSection'", () => {
    const component = mount(editRoadmap);
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    const sectionsNum = instance.state.sections.length;
    const wrapper = component.find(".delete-section-button");
    wrapper.at(0).simulate("click");
    expect(instance.state.sections.length).toBe(sectionsNum - 1);
  });

  it("should call 'onClickUpSection'", () => {
    const component = mount(editRoadmap);
    const wrapper = component.find(".up-section-button");
    wrapper.at(1).simulate("click");
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].section_title).toBe("test-section1");
    expect(instance.state.sections[1].section_title).toBe("test-section0");
    expect(instance.state.sections[2].section_title).toBe("test-section2");
  });

  it("should call 'onClickDownSection'", () => {
    const component = mount(editRoadmap);
    const wrapper = component.find(".down-section-button");
    wrapper.at(0).simulate("click");
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].section_title).toBe("test-section1");
    expect(instance.state.sections[1].section_title).toBe("test-section0");
    expect(instance.state.sections[2].section_title).toBe("test-section2");
  });

  it("should call 'onChangeSectionTitle'", () => {
    const component = mount(editRoadmap);
    const wrapper = component.find(".section-title");
    wrapper.at(0).simulate("change", { target: { value: "55" } });
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].section_title).toBe("55");
    expect(instance.state.sections[1].section_title).toBe("test-section1");
  });

  it("should call 'onClickCreateTask'", () => {
    const component = mount(editRoadmap);
    const wrapper = component.find(".create-task-button");
    wrapper.at(0).simulate("click");
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].tasks[3]).toEqual({
      task_title: "",
      task_type: 0,
      task_url: "",
      task_description: "",
    });
    expect(instance.state.sections[1].tasks.length).toBe(2);
  });

  it("should call 'onClickDeleteTask'", () => {
    const component = mount(editRoadmap);
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    const tasksNum0 = instance.state.sections[0].tasks.length;
    const tasksNum1 = instance.state.sections[1].tasks.length;
    const wrapper = component.find(".delete-task-button");
    wrapper.at(0).simulate("click");
    expect(instance.state.sections[0].tasks.length).toBe(tasksNum0 - 1);
    expect(instance.state.sections[1].tasks.length).toBe(tasksNum1);
  });

  it("should call 'onChangeTaskTitle'", () => {
    const component = mount(editRoadmap);
    const testTitle = "test";
    const wrapper = component.find(".task-title");
    wrapper.at(0).simulate("change", { target: { value: testTitle } });
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].tasks[0].task_title).toEqual(testTitle);
    expect(instance.state.sections[0].tasks[1].task_title).toEqual("task1-title");
    expect(instance.state.sections[1]).toEqual({
      section_title: "test-section1",
      tasks: [
        {
          task_title: "task0-title",
          task_type: 3,
          task_url: "task0-url",
          task_description: "task0-des",
        },
        {
          task_title: "task1-title",
          task_type: 2,
          task_url: "task1-url",
          task_description: "task1-des",
        },
      ],
    });
  });

  it("should call 'onChangeTaskType'", () => {
    const component = mount(editRoadmap);
    const testType = 2;
    const wrapper = component.find(".task-type");
    wrapper.at(0).simulate("change", { target: { value: testType } });
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].tasks[0].task_type).toEqual(testType);
    expect(instance.state.sections[0].tasks[1].task_type).toEqual(2);
    expect(instance.state.sections[1]).toEqual({
      section_title: "test-section1",
      tasks: [
        {
          task_title: "task0-title",
          task_type: 3,
          task_url: "task0-url",
          task_description: "task0-des",
        },
        {
          task_title: "task1-title",
          task_type: 2,
          task_url: "task1-url",
          task_description: "task1-des",
        },
      ],
    });
  });

  it("should call 'onChangeTaskUrl'", () => {
    const component = mount(editRoadmap);
    const testUrl = "test";
    const wrapper = component.find(".task-url");
    wrapper.at(0).simulate("change", { target: { value: testUrl } });
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].tasks[0].task_url).toEqual(testUrl);
    expect(instance.state.sections[0].tasks[1].task_url).toEqual("task1-url");
    expect(instance.state.sections[1]).toEqual({
      section_title: "test-section1",
      tasks: [
        {
          task_title: "task0-title",
          task_type: 3,
          task_url: "task0-url",
          task_description: "task0-des",
        },
        {
          task_title: "task1-title",
          task_type: 2,
          task_url: "task1-url",
          task_description: "task1-des",
        },
      ],
    });
  });

  it("should call 'onChangeTaskDescription'", () => {
    const component = mount(editRoadmap);
    const testDescription = "test";
    const wrapper = component.find(".task-description");
    wrapper.at(0).simulate("change", { target: { value: testDescription } });
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    expect(instance.state.sections[0].tasks[0].task_description).toEqual(testDescription);
    expect(instance.state.sections[0].tasks[1].task_description).toEqual("task1-des");
    expect(instance.state.sections[1]).toEqual({
      section_title: "test-section1",
      tasks: [
        {
          task_title: "task0-title",
          task_type: 3,
          task_url: "task0-url",
          task_description: "task0-des",
        },
        {
          task_title: "task1-title",
          task_type: 2,
          task_url: "task1-url",
          task_description: "task1-des",
        },
      ],
    });
  });

  it("should call 'onClickUpTask'", () => {
    const component = mount(editRoadmap);
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    const wrapper = component.find(".up-task-button");
    wrapper.at(1).simulate("click");
    expect(instance.state.sections[0].tasks[0].task_title).toBe("task1-title");
    expect(instance.state.sections[0].tasks[1].task_title).toBe("task0-title");
    expect(instance.state.sections[0].tasks[2].task_title).toBe("task2-title");
    expect(instance.state.sections[1]).toEqual({
      section_title: "test-section1",
      tasks: [
        {
          task_title: "task0-title",
          task_type: 3,
          task_url: "task0-url",
          task_description: "task0-des",
        },
        {
          task_title: "task1-title",
          task_type: 2,
          task_url: "task1-url",
          task_description: "task1-des",
        },
      ],
    });
  });

  it("should call 'onClickDownTask'", () => {
    const component = mount(editRoadmap);
    const instance = component.find(EditRoadmap.WrappedComponent).instance();
    const wrapper = component.find(".down-task-button");
    wrapper.at(0).simulate("click");
    expect(instance.state.sections[0].tasks[0].task_title).toBe("task1-title");
    expect(instance.state.sections[0].tasks[1].task_title).toBe("task0-title");
    expect(instance.state.sections[0].tasks[2].task_title).toBe("task2-title");
    expect(instance.state.sections[1]).toEqual({
      section_title: "test-section1",
      tasks: [
        {
          task_title: "task0-title",
          task_type: 3,
          task_url: "task0-url",
          task_description: "task0-des",
        },
        {
          task_title: "task1-title",
          task_type: 2,
          task_url: "task1-url",
          task_description: "task1-des",
        },
      ],
    });
  });

  it("should call 'onClickCreateBack' - confirm=True", () => {
    const spyBackConfirmTrue = jest.spyOn(window, "confirm").mockImplementation(() => true);
    const component = mount(editRoadmap);
    const wrapper = component.find("#back-edit-roadmap-button");
    wrapper.simulate("click");
    expect(spyBackConfirmTrue).toHaveBeenCalledTimes(1);
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(1);
    spyHistoryGoBack.mockRestore();
  });

  it("should call 'onClickEditBack' - confirm=False", () => {
    const spyBackConfirmFalse = jest.spyOn(window, "confirm").mockImplementation(() => false);
    const component = mount(editRoadmap);
    const wrapper = component.find("#back-edit-roadmap-button");
    wrapper.simulate("click");
    expect(spyBackConfirmFalse).toHaveBeenCalledTimes(1);
    expect(spyHistoryGoBack).toHaveBeenCalledTimes(0);
    spyHistoryGoBack.mockRestore();
  });

  it("should call 'onClickEditConfirm'", () => {
    const spyEditRoadmap = jest.spyOn(actionCreators, "editRoadmap");
    const component = mount(editRoadmap);
    const wrapper = component.find("#confirm-edit-roadmap-button");
    wrapper.simulate("click");
    expect(spyEditRoadmap).toHaveBeenCalledTimes(1);
  });
});
