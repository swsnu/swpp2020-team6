import axios from "axios";
import * as actionCreators from "./user";
import store from "../store";

const stubSelectedUser = {
  user_id: 1,
  username: "user1",
  email: "user1@snu.ac.kr",
  user_picture_url: "",
  pinned_roadmaps: [],
  liked_roadmaps: [],
  my_roadmaps: [],
};

describe("ActionCreatorsUser", () => {
  let spyAlert;

  beforeEach(() => {
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should fetch authentication info correctly for 'getUserAuth'`, () => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: { is_signed_in: true, user_data: stubSelectedUser },
        };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getUserAuth()).then(() => {
      const newState = store.getState();
      expect(newState.user).toStrictEqual({
        isSignedIn: true,
        selectedUser: stubSelectedUser,
        myPageUser: undefined,
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
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

    return store.dispatch(actionCreators.signIn()).then(() => {
      const newState = store.getState();
      expect(newState.user).toStrictEqual({
        isSignedIn: true,
        selectedUser: stubSelectedUser,
        myPageUser: undefined,
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail 'signIn' with 401 error", (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 401,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.signIn()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'signIn' with random error", (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 405,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.signIn()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should properly 'signOut'`, () => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.signOut()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail 'signIn' with 401 error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 401,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.signOut()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'signIn' with random error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 405,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.signOut()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`should properly 'signUp'`, () => {
    const spy = jest.spyOn(axios, "post").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.signUp()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail 'signUp' with 400 error", (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 400,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.signUp()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'signUp' with random error", (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 405,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.signUp()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should properly 'getMyPageUser'", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: {},
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.getMyPageUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'getMyPageUser' with 401 error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 401 },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getMyPageUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'getMyPageUser' with 404 error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: { status: 404 },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getMyPageUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'getMyPageUser' with random error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 405,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getMyPageUser()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
