import {
  GET_CONNECTION_REQUEST,
  GET_CONNECTION_SUCCESS,
  GET_CONNECTION_FAIL,
  UPDATE_CONNECTION_REQUEST,
  UPDATE_CONNECTION_SUCCESS,
  UPDATE_CONNECTION_FAIL,
} from "../constants/connectionRequestConstant";

export const getConnectionRequestReducer = (
  state = { versionInfo: null },
  action
) => {
  switch (action.type) {
    case GET_CONNECTION_REQUEST:
      return { ...state, loading: true };

    case GET_CONNECTION_SUCCESS:
      return { loading: false, success: true, data: action.payload };

    case GET_CONNECTION_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};

export const updateConnectionRequestReducer = (
  state = { versionInfo: null },
  action
) => {
  switch (action.type) {
    case UPDATE_CONNECTION_REQUEST:
      return { ...state, loading: true, success: false};

    case UPDATE_CONNECTION_SUCCESS:
      return { loading: false, success: true, data: action.payload };

    case UPDATE_CONNECTION_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
