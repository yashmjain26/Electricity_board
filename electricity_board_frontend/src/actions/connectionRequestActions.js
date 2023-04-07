import {
  GET_CONNECTION_REQUEST,
  GET_CONNECTION_SUCCESS,
  GET_CONNECTION_FAIL,
  UPDATE_CONNECTION_REQUEST,
  UPDATE_CONNECTION_SUCCESS,
  UPDATE_CONNECTION_FAIL,
} from "../constants/connectionRequestConstant";

import { asyncRequest } from "../helpers/apiHelpers";

export const getConnectionRequestAction = (pageNum, search, from, to) => async (dispatch) => {
  await asyncRequest(
    dispatch,
    GET_CONNECTION_REQUEST,
    GET_CONNECTION_SUCCESS,
    GET_CONNECTION_FAIL,
    `/electricity_boards?page_num=${pageNum}&search=${search}&from=${from}&to=${to}`,
    "GET"
  );
};

export const updateConnectionRequestAction = (data) => async (dispatch) => {
  await asyncRequest(
    dispatch,
    UPDATE_CONNECTION_REQUEST,
    UPDATE_CONNECTION_SUCCESS,
    UPDATE_CONNECTION_FAIL,
    "/electricity_boards/update",
    "POST",
    data
  );
};
