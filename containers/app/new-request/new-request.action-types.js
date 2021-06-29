import { createAsyncActionTypes } from "../../../sagas/asyncAction";

export const SET_DROPOFF_LOCATION = "SET_DROPOFF_LOCATION";
export const SET_PICKUP_LOCATION = "SET_PICKUP_LOCATION";
export const SET_PICKUP_TIME = "SET_PICKUP_TIME";
export const SET_DISTANCE = "SET_DISTANCE";
export const SET_CARD = "SET_CARD";

export const ADD_PACKAGE = createAsyncActionTypes("ADD_PACKAGE");
export const CREATE_CHARGE = createAsyncActionTypes("CREATE_CHARGE");
export const CALCULATE_PRICE = createAsyncActionTypes("CALCULATE_PRICE");
