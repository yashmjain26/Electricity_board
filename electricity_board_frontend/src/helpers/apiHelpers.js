import axios from "axios";

export const asyncRequest = async (
  dispatch,
  REQUEST,
  SUCCESS,
  FAIL,
  url,
  method,
  payload = null,
  headers = {},
  returnResponse = false
) => {
  try {
    dispatch({
      type: REQUEST,
    });

    let res = null;
    switch (method) {
      case "GET":
        res = await axios.get(url, headers);
        break;

      case "POST":
        res = await axios.post(url, payload, headers);
        break;

      case "PUT":
        res = await axios.put(url, payload, headers);
        break;

      case "PATCH":
        res = await axios.patch(url, payload, headers);
        break;

      case "DELETE":
        res = await axios.delete(url, { data: payload, headers });
        break;

      default:
        res = "default";
        break;
    }

    if (res !== "default") {
      dispatch({
        type: SUCCESS,
        payload: returnResponse ? res : res.data,
      });
    }
  } catch (error) {
    let errorPayload = error?.response?.data;

    dispatch({
      type: FAIL,
      payload: errorPayload,
    });
  }
};
