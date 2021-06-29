import { createAsyncActionTypes } from "../../../sagas/asyncAction";

export const GET_PROFILE = createAsyncActionTypes("GET_PROFILE");
export const UPDATE_PROFILE = createAsyncActionTypes("UPDATE_PROFILE");
export const UPDATE_PHOTO = createAsyncActionTypes("UPDATE_PHOTO");
export const UPDATE_FIREBASE_PROFILE = createAsyncActionTypes(
  "UPDATE_FIREBASE_PROFILE"
);
export const DELETE_ACCOUNT = createAsyncActionTypes("DELETE_ACCOUNT");
export const BE_DELIVERY_PARTNER = createAsyncActionTypes(
  "BE_DELIVERY_PARTNER"
);
