import {
  GET_ANALYTICS_REQUEST,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAIL,
} from "../constants/connectionAnalyticsConstant";

import { asyncRequest } from "../helpers/apiHelpers";

export const getAnalyticsRequestAction = () => async (dispatch) => {
  await asyncRequest(
    dispatch,
    GET_ANALYTICS_REQUEST,
    GET_ANALYTICS_SUCCESS,
    GET_ANALYTICS_FAIL,
    `/electricity_boards/analytics`,
    "GET"
  );
};
