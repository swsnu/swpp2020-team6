import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";

import { history, middlewares } from "../store/store";

const getMockReducer = jest.fn((initialState) => (state) => {
  if (typeof state === "undefined") return initialState;
  return state;
});

const mocks = (initialUserState, initialRoadmapState, initialSearchState) => {
  const mockUserReducer = getMockReducer(initialUserState);
  const mockRoadmapReducer = getMockReducer(initialRoadmapState);
  const mockSearchReducer = getMockReducer(initialSearchState);
  const rootReducer = combineReducers({
    user: mockUserReducer,
    roadmap: mockRoadmapReducer,
    search: mockSearchReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

export default mocks;
