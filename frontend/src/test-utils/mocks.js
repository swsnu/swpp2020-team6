import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";

import { history, middlewares } from "../store/store";

const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockRoadmapReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockStore = (initialUserState, initialRoadmapState) => {
  const mockUserReducer = getMockUserReducer(initialUserState);
  const mockRoadmapReducer = getMockRoadmapReducer(initialRoadmapState);
  const rootReducer = combineReducers({
    user: mockUserReducer,
    roadmap: mockRoadmapReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return mockStore;
};

export default getMockStore;
