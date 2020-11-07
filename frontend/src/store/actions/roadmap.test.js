/* eslint no-unused-vars: 0 */
import axios from "axios";
import * as actionCreators from "./roadmap";
import store from "../store";
import * as actionTypes from "./actionTypes";
import { levelType, progressState, taskType } from "../../constants";

const roadmapSample = {
  roadmap_id: 1,
  title: "roadmap1",
  level: levelType.BASIC,
  date: "2020/11/07",
  like_count: 1,
  comment_count: 0,
  pinned_count: 0,
  progress: progressState.BEFORE_STUDY,
  author: 1,
  org_author: null,
  sections: [
    {
      section_title: "section1",
      tasks: [
        {
          title: "task 1-1",
          url: "url1",
          type: taskType.BOOK,
          description: "description 1-1",
          checked: false,
          task_id: 1,
        },
        {
          title: "task 1-1",
          url: "url1",
          type: taskType.BOOK,
          description: "description 1-1",
          checked: false,
          task_id: 2,
        },
      ],
    },
    {
      section_title: "section2",
      tasks: [
        {
          title: "task 2-1",
          url: "url1",
          type: taskType.BOOK,
          description: "description 2-1",
          checked: false,
          task_id: 3,
        },
        {
          title: "task 2-2",
          url: "url1",
          type: taskType.BOOK,
          description: "description 2-2",
          checked: false,
          task_id: 4,
        },
      ],
    },
  ],
};

describe("ActionCreators", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getArticles' should fetch articles correctly`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: roadmapSample,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getSelectedRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(roadmapSample);
      expect(newState.roadmap.errStatus).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`error from 'getSelectedRoadmap' during axios.get should be catched`, (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const error = {
          response: {
            status: 400,
          },
        };
        reject(error);
      });
    });

    store.dispatch(actionCreators.getSelectedRoadmap(1)).then(() => {
      const newState = store.getState();
      expect(newState.roadmap.selectedRoadmap).toBe(null);
      expect(newState.roadmap.errStatus).toBe(400);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
