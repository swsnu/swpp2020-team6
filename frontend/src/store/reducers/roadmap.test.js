import reducer from "./roadmap";
import * as actionTypes from "../actions/actionTypes";
import { taskType, levelType, progressState } from "../../constants";

const initialState = {
  selectedRoadmap: null,
  getSelectedRoadmapErrStatus: null,
};

const roadmapSample = {
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

describe("Roadmap Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual(initialState);
  });

  it("should get the roadmap on success", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SELECTED_ROADMAP_SUCCESS,
      roadmap: roadmapSample,
    });
    expect(newState).toEqual({
      ...initialState,
      selectedRoadmap: roadmapSample,
      getSelectedRoadmapErrStatus: null,
    });
  });

  it("should set the errStatus properly on failure", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_SELECTED_ROADMAP_FAIL,
      errStatus: 400,
    });
    expect(newState).toEqual({
      ...initialState,
      selectedRoadmap: null,
      getSelectedRoadmapErrStatus: 400,
    });
  });
});
