/* eslint-disable no-unused-vars */
import axios from "axios";
import * as actionCreators from "./roadmap";
import store, { history } from "../store";
import * as actionTypes from "./actionTypes";

const stubRoadmapState = {
  selectedRoadmap: {
    id: 11,
    title: "swpp",
    date: "2020-11-14 05:18:20",
    level: 1,
    like_count: 0,
    comment_count: 0,
    pin_count: 0,
    progress: 1,
    original_author_id: 5,
    original_author_name: "swpp",
    author_id: 5,
    author_name: "swpp",
    author_user_picture_url: "",
    tags: [
      {
        tag_id: 1,
        tag_name: "python",
      },
      {
        tag_id: 2,
        tag_name: "CV",
      },
      {
        tag_id: 3,
        tag_name: "swpp2020",
      },
      {
        tag_id: 4,
        tag_name: "react",
      },
      {
        tag_id: 5,
        tag_name: "js",
      },
      {
        tag_id: 6,
        tag_name: "django",
      },
      {
        tag_id: 7,
        tag_name: "agile",
      },
    ],
    sections: [],
    comments: [],
  },
};

const stubRoadmapStateUndefined = {
  selectedRoadamp: undefined,
};

const stubCreateRoadmapData = {
  title: "swpp",
  level: 1,
  sections: [
    {
      section_title: "design pattern",
      tasks: [
        {
          task_title: "proxy",
          task_url: "www.proxy.com",
          task_type: 3,
          task_description: "proxy hoxy proxy",
        },
        {
          task_title: "facade",
          task_url: "www.facade.com",
          task_type: 1,
          task_description: "face face",
        },
      ],
    },
    {
      section_title: "practice session",
      tasks: [
        {
          task_title: "decorator",
          task_url: "www.decorator.com",
          task_type: 3,
          task_description: "deco is deco",
        },
        {
          task_title: "ci badge",
          task_url: "www.travis.com",
          task_type: 1,
          task_description: "no way",
        },
      ],
    },
  ],
  tags: ["python", "CV", "swpp2020", "CV", "Python", "react", "js", "django", "agile"],
};

const stubRoadmapSimpleData = {
  id: 2,
  title: "title",
  level: "level",
  date: "2020-11-14 05:18:20",
  like_count: 0,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  author_id: 5,
  author_name: "swpp",
  author_user_picture_url: "",
  tags: [
    {
      tag_id: 1,
      tag_name: "python",
    },
    {
      tag_id: 2,
      tag_name: "CV",
    },
    {
      tag_id: 3,
      tag_name: "swpp2020",
    },
    {
      tag_id: 4,
      tag_name: "react",
    },
    {
      tag_id: 5,
      tag_name: "js",
    },
    {
      tag_id: 6,
      tag_name: "django",
    },
    {
      tag_id: 7,
      tag_name: "agile",
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

  /* ---------------------- Get Roadmap ---------------------- */
  it(`'getRoadmap' should fetch the roadmap correctly`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubRoadmapState,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(11)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(stubRoadmapState);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getArticles' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 404 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(11)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getArticles' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 401 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(11)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getArticles' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 400 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(11)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getArticles' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 403 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.getRoadmap(11)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  /* ---------------------- Create Roadmap ---------------------- */
  it(`'createRoadmap' should post the roadmap correctly`, (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url, roadmapData) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 201,
          data: stubRoadmapSimpleData,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.createRoadmap(stubRoadmapSimpleData)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyPush).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'createRoadmap' during axios.post should be catched`, (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 401 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.createRoadmap(stubCreateRoadmapData)).then(() => {
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

    store.dispatch(actionCreators.createRoadmap(stubCreateRoadmapData)).then(() => {
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

    store.dispatch(actionCreators.createRoadmap(stubCreateRoadmapData)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyGoBack).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
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

    store.dispatch(actionCreators.deleteRoadmap(11)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(undefined);
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

    store.dispatch(actionCreators.deleteRoadmap(11)).then(() => {
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
          response: { status: 404 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(11)).then(() => {
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
          response: { status: 403 },
        };
        reject(result);
      });
    });

    store.dispatch(actionCreators.deleteRoadmap(11)).then(() => {
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

    store.dispatch(actionCreators.deleteRoadmap(11)).then(() => {
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

    store.dispatch(actionCreators.deleteRoadmap(11)).then(() => {
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
