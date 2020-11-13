import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import RoadmapDetail from "./RoadmapDetail";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/roadmap";

const dateData = "2020-11-10 16:08:38";
const profileURL = "./misc/rotus.png";
const beforeStudying = 1;
const inProgress = 2;
const finished = 3;

// eslint-disable-next-line no-unused-vars
const stubInitialUserState = {
  isSignedIn: undefined, // undefined: not yet received, false, true
  selectedUser: undefined, // no null state
};

const stubUnauthorizedUserState = {
  isSignedIn: false, // undefined: not yet received, false, true
  selectedUser: undefined, // no null state
};

const stubAuthorizedUserState = {
  isSignedIn: true, // undefined: not yet received, false, true
  selectedUser: {
    user_id: 1,
    username: "user1",
    email: "user1@gmail.com",
    user_picture_url: profileURL,
    pinned_roadmaps: [],
    liked_roadmaps: [],
    my_roadmaps: [],
  }, // no null state
};

const stubInitialRoadmapState = {
  selectedRoadmap: undefined,
};

const stubMyRoadmapBeforeStudyingState = {
  selectedRoadmap: {
    id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: beforeStudying,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: [
      {
        tag_id: 1,
        tag_name: "tag 1",
      },
      {
        tag_id: 2,
        tag_name: "tag 2",
      },
      {
        tag_id: 3,
        tag_name: "tag 3",
      },
    ],
    sections: [
      {
        section_id: 1,
        section_title: "section title 1",
        tasks: [
          {
            task_id: 1,
            task_title: "task title 1-1",
            task_type: 3,
            task_url: "task url 1-1",
            task_description: "task description 1-1",
            task_checked: false,
          },
          {
            task_id: 2,
            task_title: "task title 1-2",
            task_type: 1,
            task_url: "task url 1-2",
            task_description: "task description 1-2",
            task_checked: false,
          },
        ],
      },
      {
        section_id: 2,
        section_title: "section title 2",
        tasks: [
          {
            task_id: 3,
            task_title: "task title 2-1",
            task_type: 3,
            task_url: "task url 2-1",
            task_description: "task description 2-1",
            task_checked: false,
          },
        ],
      },
    ],
    comments: [],
  },
};

const stubMyRoadmapInProgressState = {
  selectedRoadmap: {
    id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: inProgress,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: [
      {
        tag_id: 1,
        tag_name: "tag 1",
      },
      {
        tag_id: 2,
        tag_name: "tag 2",
      },
      {
        tag_id: 3,
        tag_name: "tag 3",
      },
    ],
    sections: [
      {
        section_id: 1,
        section_title: "section title 1",
        tasks: [
          {
            task_id: 1,
            task_title: "task title 1-1",
            task_type: 3,
            task_url: "task url 1-1",
            task_description: "task description 1-1",
            task_checked: true,
          },
          {
            task_id: 2,
            task_title: "task title 1-2",
            task_type: 1,
            task_url: "task url 1-2",
            task_description: "task description 1-2",
            task_checked: true,
          },
        ],
      },
      {
        section_id: 2,
        section_title: "section title 2",
        tasks: [
          {
            task_id: 3,
            task_title: "task title 2-1",
            task_type: 3,
            task_url: "task url 2-1",
            task_description: "task description 2-1",
            task_checked: false,
          },
        ],
      },
    ],
    comments: [],
  },
};

const stubMyRoadmapFinishedState = {
  selectedRoadmap: {
    id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: finished,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: [
      {
        tag_id: 1,
        tag_name: "tag 1",
      },
      {
        tag_id: 2,
        tag_name: "tag 2",
      },
      {
        tag_id: 3,
        tag_name: "tag 3",
      },
    ],
    sections: [
      {
        section_id: 1,
        section_title: "section title 1",
        tasks: [
          {
            task_id: 1,
            task_title: "task title 1-1",
            task_type: 3,
            task_url: "task url 1-1",
            task_description: "task description 1-1",
            task_checked: true,
          },
          {
            task_id: 2,
            task_title: "task title 1-2",
            task_type: 1,
            task_url: "task url 1-2",
            task_description: "task description 1-2",
            task_checked: true,
          },
        ],
      },
      {
        section_id: 2,
        section_title: "section title 2",
        tasks: [
          {
            task_id: 3,
            task_title: "task title 2-1",
            task_type: 3,
            task_url: "task url 2-1",
            task_description: "task description 2-1",
            task_checked: true,
          },
        ],
      },
    ],
    comments: [],
  },
};

const stubBuggyProgressState = {
  selectedRoadmap: {
    id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: 4,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: [
      {
        tag_id: 1,
        tag_name: "tag 1",
      },
      {
        tag_id: 2,
        tag_name: "tag 2",
      },
      {
        tag_id: 3,
        tag_name: "tag 3",
      },
    ],
    sections: [
      {
        section_id: 1,
        section_title: "section title 1",
        tasks: [
          {
            task_id: 1,
            task_title: "task title 1-1",
            task_type: 3,
            task_url: "task url 1-1",
            task_description: "task description 1-1",
            task_checked: true,
          },
          {
            task_id: 2,
            task_title: "task title 1-2",
            task_type: 1,
            task_url: "task url 1-2",
            task_description: "task description 1-2",
            task_checked: true,
          },
        ],
      },
      {
        section_id: 2,
        section_title: "section title 2",
        tasks: [
          {
            task_id: 3,
            task_title: "task title 2-1",
            task_type: 3,
            task_url: "task url 2-1",
            task_description: "task description 2-1",
            task_checked: false,
          },
        ],
      },
    ],
    comments: [],
  },
};

const stubOtherRoadmapState = {
  selectedRoadmap: {
    id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: beforeStudying,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 2,
    author_name: "user2",
    author_user_picture_url: profileURL,
    tags: [
      {
        tag_id: 1,
        tag_name: "tag 1",
      },
      {
        tag_id: 2,
        tag_name: "tag 2",
      },
      {
        tag_id: 3,
        tag_name: "tag 3",
      },
    ],
    sections: [
      {
        section_id: 1,
        section_title: "section title 1",
        tasks: [
          {
            task_id: 1,
            task_title: "task title 1-1",
            task_type: 3,
            task_url: "task url 1-1",
            task_description: "task description 1-1",
            task_checked: false,
          },
          {
            task_id: 2,
            task_title: "task title 1-2",
            task_type: 1,
            task_url: "task url 1-2",
            task_description: "task description 1-2",
            task_checked: false,
          },
        ],
      },
      {
        section_id: 2,
        section_title: "section title 2",
        tasks: [
          {
            task_id: 3,
            task_title: "task title 2-1",
            task_type: 3,
            task_url: "task url 2-1",
            task_description: "task description 2-1",
            task_checked: false,
          },
        ],
      },
    ],
    comments: [],
  },
};

const mockUnauthorizedUserStore = getMockStore(stubUnauthorizedUserState, stubInitialRoadmapState);

const mockAuthorizedUserInitStore = getMockStore(stubAuthorizedUserState, stubInitialRoadmapState);

const mockAuthorizedUserMyRoadmapBeforeStudyingStore = getMockStore(
  stubAuthorizedUserState,
  stubMyRoadmapBeforeStudyingState,
);

const mockAuthorizedUserMyRoadmapInProgressStore = getMockStore(
  stubAuthorizedUserState,
  stubMyRoadmapInProgressState,
);

const mockAuthorizedUserMyRoadmapFinishedStore = getMockStore(
  stubAuthorizedUserState,
  stubMyRoadmapFinishedState,
);

const mockAuthorizedUserBuggyProgressStore = getMockStore(
  stubAuthorizedUserState,
  stubBuggyProgressState,
);

// eslint-disable-next-line no-unused-vars
const mockAuthorizedUserOtherRoadmapStore = getMockStore(
  stubAuthorizedUserState,
  stubOtherRoadmapState,
);

describe("<RoadmapDetail />", () => {
  let spyGetRoadmap, spyDeleteRoadmap;
  let spyPush;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyGetRoadmap = jest.spyOn(actionCreators, "getRoadmap").mockImplementation(() => {
      return () => {};
    });
    spyDeleteRoadmap = jest.spyOn(actionCreators, "deleteRoadmap").mockImplementation(() => {
      return () => {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* -------------------- Unauthorized User -------------------- */
  it(`should render a empty div & go back to previous page
    when a unauthorized user comes in`, () => {
    const component = mount(
      <Provider store={mockUnauthorizedUserStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find(".RoadmapDetail");
    expect(wrapper.length).toBe(0);
    expect(spyGetRoadmap).toHaveBeenCalledTimes(1);
  });

  /* -------------------- Refresh -------------------- */
  it(`should render a div with class name 'Loading' and get roadmap
    when the user is authorized and roadmap data is undefined.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserInitStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const outerWrapper = component.find(".RoadmapDetail");
    expect(outerWrapper.length).toBe(1);
    const innerWrapper = component.find(".Loading");
    expect(innerWrapper.length).toBe(1);
    expect(spyGetRoadmap).toHaveBeenCalledTimes(1);
  });

  // My Roadmap Testing
  /* ----------------- Sections & Tasks & statistics ----------------- */
  it(`should render sections, taks, progress state, 
    statistics(like, pin, comment) when the author comes in.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapBeforeStudyingStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const outerWrapper = component.find(".roadmap-title");
    expect(outerWrapper.length).toBe(1);
    expect(outerWrapper.at(0).text()).toBe("title1");

    const authorProfile = component.find("#roadmap-author-picture-url");
    expect(authorProfile.at(0).text()).toBe(profileURL);

    const authorName = component.find("#roadmap-author-name");
    expect(authorName.at(0).text()).toBe("user1");

    const originalAuthor = component.find(".roadmap-original-author");
    expect(originalAuthor.length).toBe(0);

    const writtenDate = component.find("#roadmap-written-date");
    expect(writtenDate.at(0).text()).toBe(dateData);

    const tags = component.find(".roadmap-tag");
    expect(tags.length).toBe(3);

    const likeCount = component.find("#roadmap-like-count");
    expect(likeCount.at(0).text()).toBe(`Like0`);

    const pinCount = component.find("#roadmap-pin-count");
    expect(pinCount.at(0).text()).toBe(`Pinned0`);

    const commentCount = component.find("#roadmap-comment-count");
    expect(commentCount.at(0).text()).toBe(`Comments0`);

    const sections = component.find(".Section");
    expect(sections.length).toBe(2);

    const sectionTitles = component.find(".section-title");
    expect(sectionTitles.at(0).text()).toBe(`section title: section title 1`);
    expect(sectionTitles.at(1).text()).toBe(`section title: section title 2`);

    const tasks = component.find(".Task");
    expect(tasks.length).toBe(3);

    const taskCheckboxs = component.find(".task-checkbox");
    expect(taskCheckboxs.length).toBe(0);
  });

  /* ---------------------- Edit Roadmap Button ---------------------- */
  it(`should redirect to edit roadmap page.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapInProgressStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const editButton = component.find("#edit-roadmap-button");
    expect(editButton.length).toBe(1);
    editButton.simulate("click");
    expect(spyPush).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledWith(`/roadmap/1/edit`);
  });

  /* --------------------- Delete Roadmap Button --------------------- */
  it(`should delete roadmap.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapInProgressStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );

    const deleteButton = component.find("#delete-roadmap-button");
    expect(deleteButton.length).toBe(1);
    deleteButton.simulate("click");
    expect(spyDeleteRoadmap).toHaveBeenCalledTimes(1);
    expect(spyDeleteRoadmap).toHaveBeenCalledWith(1);
  });

  /* ----------------------- progress tracking ----------------------- */
  it(`should show progress buttons properly and they should work well when 
    the user is the author and progress state is 'before studying.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapBeforeStudyingStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const outerWrapper = component.find(".RoadmapDetail");
    expect(outerWrapper.length).toBe(1);
    const startButton = component.find("#start-progress-button");
    expect(startButton.at(0).text()).toBe("Start");
    // startButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyConfirm).toHaveBeenCalledTimes(1);
  });

  it(`should show progress buttons properly and they should work well when 
  the user is the author and progress state is 'in progress.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapInProgressStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const outerWrapper = component.find(".RoadmapDetail");
    expect(outerWrapper.length).toBe(1);
    const progressButton = component.find(".progress-change-buttons");
    expect(progressButton.length).toBe(1);

    const quitButton = component.find("#quit-progress-button");
    expect(quitButton.at(0).text()).toBe("Quit");
    // quitButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyConfirm).toHaveBeenCalledTimes(1);

    const finishButton = component.find("#finish-progress-button");
    expect(finishButton.at(0).text()).toBe("Finish");
    finishButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyConfirm).toHaveBeenCalledTimes(1);

    const taskCheckboxs = component.find(".task-checkbox");
    expect(taskCheckboxs.length).toBe(3);
  });

  it(`should show progress buttons properly and they should work well when 
  the user is the author and progress state is 'finished.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapFinishedStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const outerWrapper = component.find(".RoadmapDetail");
    expect(outerWrapper.length).toBe(1);
    const clearButton = component.find("#clear-progress-button");
    expect(clearButton.at(0).text()).toBe("Clear");
    // clearButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyConfirm).toHaveBeenCalledTimes(1);
  });

  it(`should show not show 'progress-change-buttons on buggy progress state.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserBuggyProgressStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RoadmapDetail history={history} match={{ params: { id: 1 } }} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>,
    );
    const outerWrapper = component.find(".RoadmapDetail");
    expect(outerWrapper.length).toBe(1);
    const wrapper = component.find(".progress-change-buttons");
    expect(wrapper.length).toBe(0);
  });

  // Other's Roadmap Testing
  /* ---------------------- Pin Roadmap Button ---------------------- */

  /* --------------------- Like Roadmap Button --------------------- */

  /* --------------------- Duplicate Roadmap Button --------------------- */

  /* --------------------- Original Author Roadmap --------------------- */
});
