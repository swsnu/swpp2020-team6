/* eslint-disable no-unused-vars */
import axios from "axios";
import * as actionCreators from "./roadmap";
import * as userActionCreators from "./user";
import store, { history } from "../store";
import * as actionTypes from "./actionTypes";

const stubRoadmapData = {
  selectedRoadmap: {
    id: 1,
    title: "title1",
    date: "2020-11-14 05:18:20",
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: 1,
    original_author_id: 1,
    original_author_name: "username",
    author_id: 5,
    author_name: "username",
    author_user_picture_url: "",
    tags: [
      {
        tag_id: 1,
        tag_name: "tag1",
      },
      {
        tag_id: 2,
        tag_name: "tag2",
      },
    ],
    sections: [
      {
        section_title: "section0_title",
        tasks: [
          {
            task_title: "task0_title",
            task_url: "tasl0_url",
            task_type: 1,
            task_description: "task0_description",
          },
          {
            task_title: "task1_title",
            task_url: "tasl1_url",
            task_type: 1,
            task_description: "task1_description",
          },
        ],
      },
      {
        section_title: "section1_title",
        tasks: [
          {
            task_title: "task0_title",
            task_url: "tasl0_url",
            task_type: 1,
            task_description: "task0_description",
          },
          {
            task_title: "task1_title",
            task_url: "tasl1_url",
            task_type: 1,
            task_description: "task1_description",
          },
        ],
      },
    ],
    comments: [],
  },
};

const stubCreateRoadmapData = {
  title: "title2",
  level: 1,
  sections: [
    {
      section_title: "section0_title",
      tasks: [
        {
          task_title: "task0_title",
          task_url: "tasl0_url",
          task_type: 1,
          task_description: "task0_description",
        },
        {
          task_title: "task1_title",
          task_url: "tasl1_url",
          task_type: 1,
          task_description: "task1_description",
        },
      ],
    },
    {
      section_title: "section1_title",
      tasks: [
        {
          task_title: "task0_title",
          task_url: "tasl0_url",
          task_type: 1,
          task_description: "task0_description",
        },
        {
          task_title: "task1_title",
          task_url: "tasl1_url",
          task_type: 1,
          task_description: "task1_description",
        },
      ],
    },
  ],
  tags: ["tag1", "tag2"],
};

const stubRoadmapSimpleData = {
  id: 1,
  title: "title1",
  date: "2020-11-14 05:18:20",
  level: 1,
  like_count: 0,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author_id: 1,
  original_author_name: "username",
  author_id: 5,
  author_name: "username",
  author_user_picture_url: "",
  tags: [
    {
      tag_id: 1,
      tag_name: "tag1",
    },
    {
      tag_id: 2,
      tag_name: "tag2",
    },
  ],
};

const stubRoadmapSimpleData2 = {
  id: 2,
  title: "title2",
  date: "2020-11-14 05:18:20",
  level: 1,
  like_count: 0,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author_id: 1,
  original_author_name: "username",
  author_id: 5,
  author_name: "username",
  author_user_picture_url: "",
  tags: [
    {
      tag_id: 1,
      tag_name: "tag1",
    },
    {
      tag_id: 2,
      tag_name: "tag2",
    },
  ],
};

const stubCreateCommentData = {
  content: "it is great!",
  roadmap_id: 10,
};

const stubCommentResponse = {
  comment_id: 4,
  roadmap_id: 10,
  author_id: 5,
  author_name: "swpp",
  author_user_picture_url: "",
  content: "it is great!",
};

const stubSelectedUser = {
  user_id: 1,
  username: "username",
  email: "email",
  user_picture_url: "",
  pinned_roadmaps: [],
  liked_roadmaps: [],
  my_roadmaps: [stubRoadmapSimpleData],
};

describe("ActionCreators", () => {
  let spyPush;
  let spyGoBack;
  let spyAlert;

  beforeEach(() => {
    spyPush = jest.spyOn(history, "push").mockImplementation((url) => {});
    spyGoBack = jest.spyOn(history, "goBack").mockImplementation((url) => {});
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should properly 'signIn'`, () => {
    const spy = jest.spyOn(axios, "post").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: { ...stubSelectedUser },
        };
        resolve(result);
      });
    });

    return store.dispatch(userActionCreators.signIn()).then(() => {
      const newState = store.getState();
      expect(newState.user).toStrictEqual({ isSignedIn: true, selectedUser: stubSelectedUser });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  /* ---------------------- Get Roadmap ---------------------- */
  it(`'getRoadmap' should fetch the roadmap correctly`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubRoadmapData,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(stubRoadmapData);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getRoadmap' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 404 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getRoadmap' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 401 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getRoadmap' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 400 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  /* ---------------------- Create Roadmap ---------------------- */
  it(`'createRoadmap' should post the roadmap correctly`, (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: stubRoadmapSimpleData2,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.createRoadmap(stubRoadmapSimpleData2)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(newState.user.selectedUser.my_roadmaps).toEqual([
        stubRoadmapSimpleData,
        stubRoadmapSimpleData2,
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });

  // should be modified later
  it(`error from 'createRoadmap' during axios.post should be catched`, (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 401 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.createRoadmap(stubRoadmapSimpleData2)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'createRoadmap' during axios.post should be catched`, (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 400 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.createRoadmap(stubRoadmapSimpleData2)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'createRoadmap' during axios.post should be catched`, (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 403 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.createRoadmap(stubRoadmapSimpleData2)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  /* ------------------ Edit Roadmap ------------------- */

  it(`'editRoadmap' should edit the Roadmap correctly`, (done) => {
    const spy = jest.spyOn(axios, "put").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubRoadmapSimpleData2,
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.editRoadmap(2, stubRoadmapSimpleData)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(newState.user.selectedUser.my_roadmaps).toEqual([
        stubRoadmapSimpleData,
        stubRoadmapSimpleData2,
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });
  /* ---------------------- Delete Roadmap ---------------------- */
  it(`'deleteRoadmap' should delete the roadmap correctly`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 204,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(2)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(newState.user.selectedUser.my_roadmaps.length).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'deleteRoadmap' during axios.delete should be catched`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 401 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(newState.user.selectedUser.my_roadmaps.length).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'deleteRoadmap' during axios.delete should be catched`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 404 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(2)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(newState.user.selectedUser.my_roadmaps.length).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'deleteRoadmap' during axios.delete should be catched`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 403 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'deleteRoadmap' during axios.delete should be catched`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 400 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'deleteRoadmap' during axios.delete should be catched`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 302 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  /* ------------------ Create Comment ------------------ */
});
