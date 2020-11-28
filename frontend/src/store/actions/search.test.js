import axios from "axios";
import * as actionCreators from "./search";
import store from "../store";

const stubSearchData = {
  title: "test_title",
  tags: ["test_tag1", "test_tag2"],
  levels: ["1", "2", "3"],
  sort: 1,
  page: 1,
  perpage: 9,
};

describe("ActionCreatorsSearch", () => {
  let spyAlert;

  beforeEach(() => {
    spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should getSimpleSearch`, () => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubSearchData,
        };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getSimpleSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail 'simpleSearch' with 405 error", (done) => {
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
    store.dispatch(actionCreators.getSimpleSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'simpleSearch' with 401 error", (done) => {
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
    store.dispatch(actionCreators.getSimpleSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'simpleSearch' with 400 error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 400,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getSimpleSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'simpleSearch' with random error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 404,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getSimpleSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should getAdvancedSearch`, () => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: stubSearchData,
        };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getAdvancedSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail 'advancedSearch' with 405 error", (done) => {
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
    store.dispatch(actionCreators.getAdvancedSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'advancedSearch' with 401 error", (done) => {
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
    store.dispatch(actionCreators.getAdvancedSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'advancedSearch' with 400 error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 400,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getAdvancedSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'advancedSearch' with random error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 404,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getAdvancedSearch()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it(`should getTopTags`, () => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve) => {
        const result = {
          status: 200,
          data: ["tag1", "tag2"],
        };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getTopTags()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should fail 'getTopTags' with 405 error", (done) => {
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
    store.dispatch(actionCreators.getTopTags()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'getTopTags' with 401 error", (done) => {
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
    store.dispatch(actionCreators.getTopTags()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'getTopTags' with 400 error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 400,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getTopTags()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("should fail 'getTopTags' with random error", (done) => {
    const spy = jest.spyOn(axios, "get").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        const result = {
          response: {
            status: 404,
          },
        };
        reject(result);
      });
    });
    store.dispatch(actionCreators.getTopTags()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledTimes(0);
      done();
    });
  });
});
