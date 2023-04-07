import {
  GET_ANALYTICS_REQUEST,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAIL,
} from "../constants/connectionAnalyticsConstant";

export const getAnalyticsRequestReducer = (
  state = { success: false, loading: false },
  action
) => {
  switch (action.type) {
    case GET_ANALYTICS_REQUEST:
      return { ...state, loading: true };

    case GET_ANALYTICS_SUCCESS:
      return { loading: false, success: true, data: action.payload };

    case GET_ANALYTICS_FAIL:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};
