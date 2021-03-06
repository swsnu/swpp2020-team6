import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import RoadmapDetail from "./RoadmapDetail";
import getMockStore from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/roadmap";

const dateData = "2020-11-10 16:08:38";
const profileURL = "./misc/rotus.png";
const beforeStudying = 1;
const inProgress = 2;
const finished = 3;
const tagSample = [
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
];
const commentSample = [
  {
    comment_id: 1,
    roadmap_id: 1,
    content: "it is great!",
    author_id: 5,
    author_name: "user5",
    author_picture_url: profileURL,
  },
  {
    comment_id: 2,
    roadmap_id: 1,
    content: "it is great!",
    author_id: 1,
    author_name: "user1",
    author_picture_url: profileURL,
  },
];
const sectionSample = [
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
];

const sectionSampleWithValidUrl = [
  {
    section_id: 1,
    section_title: "section title 1",
    tasks: [
      {
        task_id: 1,
        task_title: "task title 1-1",
        task_type: 3,
        task_url: "https://www.naver.com",
        task_description: "task description 1-1",
        task_checked: true,
      },
    ],
  },
];

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

const stubAuthorizedUserLikePinState = {
  isSignedIn: true, // undefined: not yet received, false, true
  selectedUser: {
    user_id: 1,
    username: "user1",
    email: "user1@gmail.com",
    user_picture_url: profileURL,
    pinned_roadmaps: [
      {
        id: 1,
        image_id: 1,
        title: "title1",
        date: dateData,
        level: 1,
        description: "description",
        private: false,
        like_count: 1,
        comment_count: 0,
        pin_count: 1,
        progress: beforeStudying,
        original_author: 1,
        author_id: 2,
        author_name: "user2",
        author_user_picture_url: profileURL,
        tags: tagSample,
      },
    ],
    liked_roadmaps: [
      {
        id: 1,
        image_id: 1,
        title: "title1",
        date: dateData,
        level: 1,
        description: "description",
        private: false,
        like_count: 1,
        comment_count: 0,
        pin_count: 1,
        progress: beforeStudying,
        original_author: 1,
        author_id: 2,
        author_name: "user2",
        author_user_picture_url: profileURL,
        tags: tagSample,
      },
    ],
    my_roadmaps: [],
  }, // no null state
};

const stubInitialRoadmapState = {
  selectedRoadmap: undefined,
};

const stubMyRoadmapBeforeStudyingState = {
  selectedRoadmap: {
    id: 1,
    image_id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    description: "description",
    private: true,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: beforeStudying,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: tagSample,
    sections: [
      {
        section_id: 1,
        section_title: "section title 1",
        tasks: [
          {
            task_id: 1,
            task_title: "task title 1-1",
            task_type: 0,
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
    image_id: 1,
    title: "title1",
    date: dateData,
    level: 2,
    description: "description",
    private: false,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: inProgress,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: tagSample,
    sections: sectionSample,
    comments: [],
  },
};

const stubRoadmapWithValidUrl = {
  selectedRoadmap: {
    ...stubMyRoadmapInProgressState.selectedRoadmap,
    sections: sectionSampleWithValidUrl,
  },
};

const stubMyRoadmapFinishedState = {
  selectedRoadmap: {
    id: 1,
    image_id: 1,
    title: "title1",
    date: dateData,
    level: 3,
    description: "description",
    private: false,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: finished,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: tagSample,
    sections: sectionSample,
    comments: [],
  },
};

const stubBuggyState = {
  selectedRoadmap: {
    id: 1,
    image_id: 1,
    title: "title1",
    date: dateData,
    level: 4,
    description: "description",
    private: false,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: 4,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 1,
    author_name: "user1",
    author_user_picture_url: profileURL,
    tags: tagSample,
    sections: sectionSample,
    comments: [],
  },
};

const stubOtherRoadmapState = {
  selectedRoadmap: {
    id: 1,
    image_id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    description: "description",
    private: false,
    like_count: 0,
    comment_count: 2,
    pin_count: 0,
    progress: beforeStudying,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 2,
    author_name: "user2",
    author_user_picture_url: profileURL,
    tags: tagSample,
    sections: sectionSample,
    comments: commentSample,
  },
};

const stubOtherPrivateRoadmapState = {
  selectedRoadmap: {
    id: 1,
    image_id: 1,
    title: "title1",
    date: dateData,
    level: 1,
    description: "description",
    private: true,
    like_count: 0,
    comment_count: 2,
    pin_count: 0,
    progress: beforeStudying,
    original_author_id: 1,
    original_author_name: "user1",
    author_id: 2,
    author_name: "user2",
    author_user_picture_url: profileURL,
    tags: tagSample,
    sections: sectionSample,
    comments: commentSample,
  },
};

const stubInitialSearchState = {
  searchResult: [],
  topTags: [],
  page: 1,
  totalCount: 1,
};

const mockUnauthorizedUserStore = getMockStore(
  stubUnauthorizedUserState,
  stubInitialRoadmapState,
  stubInitialSearchState,
);

const mockAuthorizedUserInitStore = getMockStore(
  stubAuthorizedUserState,
  stubInitialRoadmapState,
  stubInitialSearchState,
);

const mockAuthorizedUserMyRoadmapBeforeStudyingStore = getMockStore(
  stubAuthorizedUserState,
  stubMyRoadmapBeforeStudyingState,
  stubInitialSearchState,
);

const mockAuthorizedUserMyRoadmapInProgressStore = getMockStore(
  stubAuthorizedUserState,
  stubMyRoadmapInProgressState,
  stubInitialSearchState,
);

const mockAuthorizedUserMyRoadmapFinishedStore = getMockStore(
  stubAuthorizedUserState,
  stubMyRoadmapFinishedState,
  stubInitialSearchState,
);

const mockAuthorizedUserBuggyStore = getMockStore(
  stubAuthorizedUserState,
  stubBuggyState,
  stubInitialSearchState,
);

const mockAuthorizedUserOtherRoadmapStore = getMockStore(
  stubAuthorizedUserState,
  stubOtherRoadmapState,
  stubInitialSearchState,
);

const mockAuthorizedUserOtherPrivateRoadmapStore = getMockStore(
  stubAuthorizedUserState,
  stubOtherPrivateRoadmapState,
  stubInitialSearchState,
);

const mockAuthorizedUserLikePinRoadmapStore = getMockStore(
  stubAuthorizedUserLikePinState,
  stubOtherRoadmapState,
  stubInitialSearchState,
);

const mockAuthorizedUserMyRoadmapValidUrlStore = getMockStore(
  stubAuthorizedUserState,
  stubRoadmapWithValidUrl,
  stubInitialSearchState,
);

describe("<RoadmapDetail />", () => {
  let spyGetRoadmap;
  let spyDeleteRoadmap;
  let spyPostComment;
  let spyPush;
  let spyGoBack;
  let spyEditComment;
  let spyDeleteComment;
  let spyToggleRoadmapLike;
  let spyToggleRoadmapPin;
  let spyChangeProgress;
  let spyChangeCheckbox;
  let spyResetRoadmap;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation(() => {});
    spyGoBack = jest.spyOn(history, "goBack").mockImplementation(() => {});
    spyGetRoadmap = jest.spyOn(actionCreators, "getRoadmap").mockImplementation(() => {
      return () => {};
    });
    spyDeleteRoadmap = jest.spyOn(actionCreators, "deleteRoadmap").mockImplementation(() => {
      return () => {};
    });
    spyPostComment = jest.spyOn(actionCreators, "createComment").mockImplementation(() => {
      return () => {};
    });
    spyEditComment = jest.spyOn(actionCreators, "editComment").mockImplementation(() => {
      return () => {};
    });
    spyDeleteComment = jest.spyOn(actionCreators, "deleteComment").mockImplementation(() => {
      return () => {};
    });
    spyToggleRoadmapLike = jest
      .spyOn(actionCreators, "toggleRoadmapLike")
      .mockImplementation(() => {
        return () => {};
      });
    spyToggleRoadmapPin = jest.spyOn(actionCreators, "toggleRoadmapPin").mockImplementation(() => {
      return () => {};
    });
    spyChangeProgress = jest.spyOn(actionCreators, "changeProgress").mockImplementation(() => {
      return () => {};
    });
    spyChangeCheckbox = jest.spyOn(actionCreators, "changeCheckbox").mockImplementation(() => {
      return () => {};
    });
    spyResetRoadmap = jest.spyOn(actionCreators, "resetRoadmap_").mockImplementation(() => {
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
    expect(wrapper.length).toBe(1);
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

  /* ----------------- Section Collapse ---------------- */
  it(`should call "onClickSectionCollapse"`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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
    const instance = component.find(RoadmapDetail.WrappedComponent).instance();
    expect(instance.state.sectionCollapse).toEqual([false, false]);
    const collapseButton = component.find(".section-collapse");
    collapseButton.at(0).props().onClick();
    expect(instance.state.sectionCollapse).toEqual([true, false]);
  });

  /* ----------------- User Card ------------------- */
  it(`should call "onClickUserCard"`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const userCard = component.find(".UserCard");
    userCard.at(0).props().onClick();
    expect(spyPush).toHaveBeenCalledTimes(1);
  });

  /* ----------------- Roadmap Level ----------------- */
  it(`should show appropriate roadmap level(basic).`, () => {
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
    const basicLevel = component.find("#basic-chip");
    expect(basicLevel.length).toBeTruthy();
    const intermediateLevel = component.find("#intermediate-chip");
    expect(intermediateLevel.length).toBe(0);
    const advancedLevel = component.find("#advanced-chip");
    expect(advancedLevel.length).toBe(0);
  });

  it(`should show appropriate roadmap level(intermediate).`, () => {
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

    const basicLevel = component.find("#basic-chip");
    expect(basicLevel.length).toBe(0);
    const intermediateLevel = component.find("#intermediate-chip");
    expect(intermediateLevel.length).toBeTruthy();
    const advancedLevel = component.find("#advanced-chip");
    expect(advancedLevel.length).toBe(0);
  });

  it(`should show appropriate roadmap level(advanced).`, () => {
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

    const basicLevel = component.find("#basic-chip");
    expect(basicLevel.length).toBe(0);
    const intermediateLevel = component.find("#intermediate-chip");
    expect(intermediateLevel.length).toBe(0);
    const advancedLevel = component.find("#advanced-chip");
    expect(advancedLevel.length).toBeTruthy();
  });

  // My Roadmap Testing
  /* -------------- Description & Sections & Tasks & statistics -------------- */
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

    const authorProfile = component.find(".UserCard");
    expect(authorProfile.at(0).text()).toContain("user1");

    const originalAuthor = component.find(".roadmap-original-author");
    expect(originalAuthor.length).toBe(0);

    const writtenDate = component.find("#roadmap-written-date");
    expect(writtenDate.at(0).text()).toBe(dateData);

    const tags = component.find(".roadmap-tag");
    expect(tags.length).toBe(3);

    const commentCount = component.find("#roadmap-comment-count");
    expect(commentCount.at(0).text()).toBe(`0 Comments`);

    const description = component.find(".roadmap-description");
    expect(description.at(0).text()).toBe(`description`);

    const sections = component.find(".Section");
    expect(sections.length).toBe(2);

    const sectionTitles = component.find(".section-title");
    expect(sectionTitles.at(0).text()).toBe(`1. section title 1`);
    expect(sectionTitles.at(1).text()).toBe(`2. section title 2`);

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

    const editButton = component.find(".MuiButtonBase-root.MuiIconButton-root#edit-roadmap-button");
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

    const spyConfirmFalse = jest.spyOn(window, "confirm").mockImplementation(() => {
      return false;
    });
    const deleteButton = component.find(
      ".MuiButtonBase-root.MuiIconButton-root#delete-roadmap-button",
    );
    expect(deleteButton.length).toBe(1);
    deleteButton.simulate("click");
    expect(spyConfirmFalse).toHaveBeenCalledTimes(1);
    expect(spyDeleteRoadmap).toHaveBeenCalledTimes(0);
    jest.clearAllMocks();

    const spyConfirmTrue = jest.spyOn(window, "confirm").mockImplementation(() => {
      return true;
    });
    deleteButton.simulate("click");
    expect(spyConfirmTrue).toHaveBeenCalledTimes(1);
    expect(spyDeleteRoadmap).toHaveBeenCalledTimes(1);
    expect(spyDeleteRoadmap).toHaveBeenCalledWith(1);
  });

  /* --------------------- Duplicate Roadmap Button --------------------- */
  it(`should duplicate my roadmap successfully.`, () => {
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

    const duplicateButton = component.find(
      ".MuiButtonBase-root.MuiIconButton-root#duplicate-button",
    );
    expect(duplicateButton.length).toBe(1);
    duplicateButton.simulate("click");
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
    startButton.simulate("click");
    expect(spyChangeProgress).toHaveBeenCalledTimes(1);
  });

  /* ----------------------- click checkbox ----------------------- */
  it(`should show change the checkbox state when the box is clicked on a
    'In Progress' state roadmap.`, () => {
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
    const checkbox = component.find(".task-checkbox").at(0);
    checkbox.at(0).props().onChange();
    expect(spyChangeCheckbox).toHaveBeenCalledTimes(1);
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
    quitButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyConfirm).toHaveBeenCalledTimes(1);

    const finishButton = component.find("#finish-progress-button");
    expect(finishButton.at(0).text()).toBe("Finish");
    finishButton.simulate("click");

    const taskCheckboxs = component.find(Checkbox);
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
    clearButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyConfirm).toHaveBeenCalledTimes(1);
  });

  it(`should show not show 'progress-change-buttons on buggy progress state.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserBuggyStore}>
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

  /* ---------------------- Other's Roadmap (public) ---------------------- */
  // No progressbar,edit,delete
  it(`should not show edit, delete, progressbar.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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
    const progress = component.find(".roadmap-progress");
    expect(progress.length).toBe(0);

    const editButton = component.find(".MuiButtonBase-root.MuiIconButton-root#edit-roadmap-button");
    expect(editButton.length).toBe(0);

    const deleteButton = component.find(
      ".MuiButtonBase-root.MuiIconButton-root#delete-roadmap-button",
    );
    expect(deleteButton.length).toBe(0);

    const originalAuthor = component.find(".roadmap-original-author");
    expect(originalAuthor.at(0).text()).toBe("Duplicated from: user1");
  });

  /* ---------------------- Other's Roadmap (private) ---------------------- */
  it(`should not show edit, delete, progressbar.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherPrivateRoadmapStore}>
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

    const dialog = component.find(Dialog);
    expect(dialog.length).toBe(1);

    const content = component.find("#alert-dialog-slide-description");
    expect(content.at(0).text()).toBe(
      `Only the author can access this Roadmap. If you press the OK button, you will be redirected to your previous page.`,
    );

    const buttonOK = component.find(Button);
    expect(buttonOK.at(0).text()).toBe("OK");
    buttonOK.simulate("click");
    expect(spyGoBack).toHaveBeenCalledTimes(1);
  });

  /* --------------------- Like Roadmap Button --------------------- */
  it(`should like the roadmap when like button is clicked.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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
    const likeButton = component.find(".MuiButtonBase-root.MuiIconButton-root#like-button");
    expect(likeButton.length).toBe(1);
    likeButton.simulate("click");
    expect(spyToggleRoadmapLike).toHaveBeenCalledTimes(1);
  });

  it(`should unlike the roadmap when unlike button is clicked.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserLikePinRoadmapStore}>
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
    const likeButton = component.find(".MuiButtonBase-root.MuiIconButton-root#like-button");
    expect(likeButton.length).toBe(1);
    likeButton.simulate("click");
    expect(spyToggleRoadmapLike).toHaveBeenCalledTimes(1);
  });

  /* --------------------- Pin Roadmap Button --------------------- */
  it(`should pin the roadmap when pin button is clicked.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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
    const pinButton = component.find(".MuiButtonBase-root.MuiIconButton-root#pin-button");
    expect(pinButton.length).toBe(1);
    pinButton.simulate("click");
    expect(spyToggleRoadmapPin).toHaveBeenCalledTimes(1);
  });

  it(`should unpin the roadmap when unpin button is clicked.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserLikePinRoadmapStore}>
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
    const pinButton = component.find(".MuiButtonBase-root.MuiIconButton-root#pin-button");
    expect(pinButton.length).toBe(1);
    pinButton.simulate("click");
    expect(spyToggleRoadmapPin).toHaveBeenCalledTimes(1);
  });

  /* --------------------- Duplicate Roadmap Button --------------------- */
  it(`should duplicate successfully.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const duplicateButton = component.find(
      ".MuiButtonBase-root.MuiIconButton-root#duplicate-button",
    );
    expect(duplicateButton.length).toBe(1);
    duplicateButton.simulate("click");
    // need to mock onChangeRoadmapProgressStatus
    // expect(spyLike).toHaveBeenCalledTimes(1);
  });

  /* --------------------- Comment Functionality --------------------- */
  it(`should not post empty comments.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const instance = component.find(RoadmapDetail.WrappedComponent).instance();
    const commentInput = component.find("#new-comment-content-input");
    commentInput.simulate("change", { target: { value: "" } });
    expect(instance.state.comment).toEqual("");
    expect(instance.state.commentEditMode).toEqual([false, false]);
    expect(instance.state.edittedComments.length).toBe(2);
    const confirmComment = component.find("#confirm-create-comment-button");
    confirmComment.simulate("click");
    expect(spyPostComment).toHaveBeenCalledTimes(0);
    expect(instance.state.comment).toEqual("");
    expect(instance.state.commentEditMode).toEqual([false, false]);
    expect(instance.state.edittedComments.length).toBe(2);
  });

  it(`should post non-empty comments.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const instance = component.find(RoadmapDetail.WrappedComponent).instance();
    const commentInput = component.find("#new-comment-content-input");
    commentInput.simulate("change", { target: { value: "comment" } });
    expect(instance.state.comment).toEqual("comment");
    expect(instance.state.commentEditMode).toEqual([false, false]);
    expect(instance.state.edittedComments.length).toBe(2);
    const confirmComment = component.find("#confirm-create-comment-button");
    confirmComment.simulate("click");
    expect(spyPostComment).toHaveBeenCalledTimes(1);
    expect(instance.state.comment).toEqual("");
    expect(instance.state.commentEditMode).toEqual([false, false, false]);
    expect(instance.state.edittedComments.length).toBe(3);
  });

  it(`should only let the author edit the comment.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const instance = component.find(RoadmapDetail.WrappedComponent).instance();
    expect(instance.state.commentEditMode).toEqual([false, false]);
    const editButton = component.find(".edit-comment-button.MuiButtonBase-root.MuiIconButton-root");
    expect(editButton.length).toBe(1);
    editButton.at(0).simulate("click");
    expect(instance.state.commentEditMode).toEqual([false, true]);
    const editCommentInput = component.find(".comment-edit-input");
    editCommentInput.simulate("change", { target: { value: "EDITTED" } });
    expect(instance.state.edittedComments[1]).toEqual("EDITTED");
    const editCommentConfirm = component.find(".comment-edit-confirm-button");
    editCommentConfirm.simulate("click");
    expect(spyEditComment).toHaveBeenCalledTimes(1);
  });

  it(`should not edit when the new comment is empty.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const editButton = component.find(".edit-comment-button.MuiButtonBase-root.MuiIconButton-root");
    editButton.at(0).simulate("click");
    const editCommentInput = component.find(".comment-edit-input");
    editCommentInput.simulate("change", { target: { value: "" } });
    const editCommentConfirm = component.find(".comment-edit-confirm-button");
    editCommentConfirm.simulate("click");
    expect(spyEditComment).toHaveBeenCalledTimes(0);
  });

  it(`should only let the author delete the comment.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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

    const spyConfirmFalse = jest.spyOn(window, "confirm").mockImplementation(() => {
      return false;
    });
    const deleteButton = component.find(".delete-comment-button");
    expect(deleteButton.length).toBeTruthy();
    deleteButton.at(0).props().onClick();
    expect(spyConfirmFalse).toHaveBeenCalledTimes(1);
    expect(spyDeleteComment).toHaveBeenCalledTimes(0);
    jest.clearAllMocks();

    const spyConfirmTrue = jest.spyOn(window, "confirm").mockImplementation(() => {
      return true;
    });
    deleteButton.at(0).props().onClick();
    expect(spyConfirmTrue).toHaveBeenCalledTimes(1);
    expect(spyDeleteComment).toHaveBeenCalledTimes(1);
  });

  it("should clear selectedRoadmap before unmount", () => {
    const component = mount(
      <Provider store={mockAuthorizedUserOtherRoadmapStore}>
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
    component.unmount();
    expect(spyResetRoadmap).toHaveBeenCalledTimes(1);
  });

  it(`should show Task type properly.`, () => {
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

    const wrapper = component.find(".task-type");

    const empty = wrapper.at(0).find(".task-type-select-item-icon");
    const notEmpty = wrapper.at(1).find(".task-type-select-item-icon");
    expect(empty.length).toBeFalsy();
    expect(notEmpty.length).toBeTruthy();
  });

  it(`should collapse/expand sections properly.`, () => {
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
    const instance = component.find(RoadmapDetail.WrappedComponent).instance();

    const collapseButton = component.find("#collapse-all-button");
    collapseButton.at(0).simulate("click");
    expect(instance.state.sectionCollapse).toEqual([true, true]);

    const expandButton = component.find("#expand-all-button");
    expandButton.at(0).simulate("click");
    expect(instance.state.sectionCollapse).toEqual([false, false]);
  });

  it(`should show link properly if the url is valid.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapValidUrlStore}>
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

    const url = component.find(".url-valid");
    expect(url.length).toBe(1);
  });

  it(`should change state if tasks are all checked properly.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapValidUrlStore}>
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

    const finishButton = component.find("#finish-progress-button");
    expect(finishButton.at(0).text()).toBe("Finish");
    finishButton.simulate("click");
    expect(spyChangeProgress).toHaveBeenCalledTimes(1);
  });

  it(`should operate anchor properly.`, () => {
    const component = mount(
      <Provider store={mockAuthorizedUserMyRoadmapValidUrlStore}>
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

    const anchorButton = component.find(".section-anchor-button");
    anchorButton.simulate("click");
  });
});
