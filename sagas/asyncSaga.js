import { put, call } from "redux-saga/effects";

import { createAsyncAction } from "./asyncAction";

export const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Reusable asynchronous action flow
 *
 * @param action : asyncActionType
 * @param apiFn  : api to call
 */
export function* async(action, apiFn, payload) {
  const asyncAction = createAsyncAction(action.type);
  try {
    const response = yield call(apiFn, payload);
    console.log(
      "[Saga-API_SUCCEED-",
      action.type,
      "]: ",
      action.type !== "GET_PROFILE" ? response : response.uid
    );
    yield put(asyncAction.success(response));
  } catch (error) {
    console.log("[Saga-API_FAILED:- ", action.type, "]: ", error);
    yield put(asyncAction.failure(error));
  }
}
