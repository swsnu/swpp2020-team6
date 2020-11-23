import reducer from "./roadmap";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoadmap: undefined,
  bestRoadmaps: undefined,
  newRoadmaps: undefined,
};

const stubSelectedRoadmap = {
  id: 11,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  description: "description",
  private: false,
  like_count: 0,
  comment_count: 2,
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
    {
      tag_id: 8,
      tag_name: "redux",
    },
    {
      tag_id: 9,
      tag_name: "git",
    },
  ],
  sections: [
    {
      section_id: 35,
      section_title: "new-sc1-title",
      tasks: [
        {
          task_id: 43,
          task_title: "new-task1-title",
          task_type: 3,
          task_url: "www.naver.com",
          task_description: "Naver is better than google",
          task_checked: false,
        },
      ],
    },
  ],
  comments: [
    {
      comment_id: 5,
      roadmap_id: 11,
      content: "it is great!",
      author_id: 5,
      author_name: "swpp",
      author_picture_url: "",
    },
    {
      comment_id: 11,
      roadmap_id: 11,
      content: "great!",
      author_id: 7,
      author_name: "swpp7",
      author_picture_url: "",
    },
  ],
};

const stubSimpleRoadmap = {
  id: 11,
  title: "new-rm-title",
  date: "2020-11-14 05:46:47",
  level: 1,
  description: "description",
  private: false,
  like_count: 1,
  comment_count: 0,
  pin_count: 0,
  progress: 1,
  original_author: 5,
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
    {
      tag_id: 8,
      tag_name: "redux",
    },
    {
      tag_id: 9,
      tag_name: "git",
    },
  ],
};

const stubComment = {
  comment_id: 3,
  roadmap_id: 10,
  author_id: 5,
  author_name: "swpp",
  author_user_picture_url: "",
  content: "it is great!",
};

describe("User Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual(initialState);
  });

  it("should set selectedroadmap as undefined ", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_ROADMAP_FAILURE,
    });
    expect(newState).toEqual(initialState);
  });

  it("should set selectedroadmap as the given data ", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_ROADMAP_SUCCESS,
      roadmapData: stubSelectedRoadmap,
    });
    expect(newState).toEqual({ selectedRoadmap: stubSelectedRoadmap });
  });

  it("should set selectedroadmap as undefined ", () => {
    const newState = reducer(undefined, {
      type: actionTypes.CREATE_ROADMAP,
    });
    expect(newState).toEqual(initialState);
  });

  it("should set selectedroadmap as undefined", () => {
    const newState = reducer(undefined, {
      type: actionTypes.EDIT_ROADMAP,
    });
    expect(newState).toEqual(initialState);
  });

  it("should reset selectedroadmap as undefined", () => {
    const newState = reducer(undefined, {
      type: actionTypes.RESET_ROADMAP,
    });
    expect(newState).toEqual(initialState);
  });

  it("should delete roadmap properly ", () => {
    const newState = reducer(undefined, {
      type: actionTypes.DELETE_ROADMAP,
    });
    expect(newState).toEqual(initialState);
  });

  it("should create comment properly ", () => {
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.CREATE_COMMENT_SUCCESS,
        newComment: stubComment,
      },
    );
    const addedComments = stubSelectedRoadmap.comments.concat(stubComment);
    const commentCountBeforeCreate = stubSelectedRoadmap.comment_count;
    const commentAddedRoadmap = {
      ...stubSelectedRoadmap,
      comment_count: commentCountBeforeCreate + 1,
      comments: addedComments,
    };
    expect(newState).toEqual({ selectedRoadmap: commentAddedRoadmap });
  });

  it("should edit comment properly ", () => {
    const stubEditComment = {
      comment_id: 5,
      roadmap_id: 11,
      content: "it is great!",
      author_id: 5,
      author_name: "swpp",
      author_picture_url: "",
    };
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.EDIT_COMMENT_SUCCESS,
        newComment: stubEditComment,
      },
    );
    const modifiedComments = stubSelectedRoadmap.comments.map((comment) => {
      if (comment.comment_id === stubEditComment.comment_id) {
        return stubEditComment;
      }
      return comment;
    });
    const commentModifiedRoadmap = { ...stubSelectedRoadmap, comments: modifiedComments };
    expect(newState).toEqual({ selectedRoadmap: commentModifiedRoadmap });
  });

  it("should change comment list and comment_count on delete comment fail ", () => {
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        commentID: 5,
      },
    );

    const deletedComments = stubSelectedRoadmap.comments.filter((comment) => {
      return comment.comment_id !== 5;
    });
    const commentCountBeforeDelete = stubSelectedRoadmap.comment_count;
    const commentDeletedRoadmap = {
      ...stubSelectedRoadmap,
      comment_count: commentCountBeforeDelete - 1,
      comments: deletedComments,
    };
    expect(newState).toEqual({ selectedRoadmap: commentDeletedRoadmap });
  });

  // like/unlike roadmap
  it("should change like_count on roadmap like ", () => {
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.ROADMAP_LIKE,
        responseData: {
          liked: true,
          roadmapData: stubSimpleRoadmap,
        },
      },
    );
    expect(newState).toEqual({
      selectedRoadmap: { ...stubSelectedRoadmap, like_count: stubSimpleRoadmap.like_count },
    });
  });

  it("should change like_count on roadmap unlike ", () => {
    const newLikeCount = 1;
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.ROADMAP_UNLIKE,
        responseData: {
          liked: false,
          likeCount: newLikeCount,
        },
      },
    );
    expect(newState).toEqual({
      selectedRoadmap: { ...stubSelectedRoadmap, like_count: newLikeCount },
    });
  });

  // ------------------------ pin/unpin roadmap ------------------------
  it("should change pin_count on roadmap pin ", () => {
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.ROADMAP_PIN,
        responseData: {
          pinned: true,
          roadmapData: stubSimpleRoadmap,
        },
      },
    );
    expect(newState).toEqual({
      selectedRoadmap: { ...stubSelectedRoadmap, pin_count: stubSimpleRoadmap.pin_count },
    });
  });

  it("should change pin_count on roadmap unpin ", () => {
    const newPinCount = 1;
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.ROADMAP_UNPIN,
        responseData: {
          pinned: false,
          pinCount: newPinCount,
        },
      },
    );
    expect(newState).toEqual({
      selectedRoadmap: { ...stubSelectedRoadmap, pin_count: newPinCount },
    });
  });

  // ---------------- change progress state of the roadmap ----------------
  it("should change progress of the roadmap", () => {
    const clearedSections = [
      {
        section_id: 35,
        section_title: "new-sc1-title",
        tasks: [
          {
            task_id: 43,
            task_title: "new-task1-title",
            task_type: 3,
            task_url: "www.naver.com",
            task_description: "Naver is better than google",
            task_checked: false,
          },
        ],
      },
    ];
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmap },
      {
        type: actionTypes.PROGRESS_CHANGE,
        progress: 2,
        sections: clearedSections,
      },
    );
    expect(newState).toEqual({
      selectedRoadmap: { ...stubSelectedRoadmap, progress: 2, sections: clearedSections },
    });
  });

  // ---------------- change checkbox state of the roadmap ----------------
  it("should change checkbox state of the roadmap's specific task.", () => {
    const updatedTask = {
      task_id: 43,
      task_title: "new-task1-title",
      task_type: 3,
      task_url: "www.naver.com",
      task_description: "Naver is better than google",
      task_checked: true,
    };
    const previousTasks = [
      {
        task_id: 43,
        task_title: "new-task1-title",
        task_type: 3,
        task_url: "www.naver.com",
        task_description: "Naver is better than google",
        task_checked: false,
      },
      {
        task_id: 20,
        task_title: "new-task1-title",
        task_type: 3,
        task_url: "www.naver.com",
        task_description: "Naver is better than google",
        task_checked: true,
      },
    ];
    const stubSelectedRoadmapWith2Task = {
      ...stubSelectedRoadmap,
      sections: [
        {
          section_id: 35,
          section_title: "new-sc1-title",
          tasks: previousTasks,
        },
      ],
    };
    const newState = reducer(
      { selectedRoadmap: stubSelectedRoadmapWith2Task },
      {
        type: actionTypes.CHANGE_CHECKBOX,
        checked: true,
        taskId: updatedTask.task_id,
      },
    );

    const updatedSections = stubSelectedRoadmapWith2Task.sections.map((section) => {
      const updatedTasks = section.tasks.map((task) => {
        if (task.task_id === updatedTask.task_id) {
          return updatedTask;
        }
        return task;
      });
      return { ...section, tasks: updatedTasks };
    });

    expect(newState).toEqual({
      selectedRoadmap: { ...stubSelectedRoadmap, sections: updatedSections },
    });
  });
});
