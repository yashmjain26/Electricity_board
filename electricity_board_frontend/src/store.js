import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  getConnectionRequestReducer,
  updateConnectionRequestReducer,
} from "./reducers/connectionRequestReducer";

import { getAnalyticsRequestReducer } from "./reducers/connectionAnalyticsReducer";

const reducer = combineReducers({
  getConnectionRequestState: getConnectionRequestReducer,
  updateConnectionRequestState: updateConnectionRequestReducer,
  getAnalyticsRequestState: getAnalyticsRequestReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
