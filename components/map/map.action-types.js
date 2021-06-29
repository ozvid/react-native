import { createAsyncActionTypes } from "../../sagas/asyncAction";

export const LOCATION_PERMISSION = "LOCATION_PERMISSION";
export const LOCATION_PERMISSION_GRANTED = "LOCATION_PERMISSION_GRANTED";

export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";
export const SET_LOCATION = "SET_LOCATION";
export const SET_ROUTE = "SET_ROUTE";
export const CLEAR_ROUTE = "CLEAR_ROUTE";
export const REGION_CHANGE = "REGION_CHANGE";

export const TRACK_GEO_DATA = "TRACK_GEO_DATA";
export const SET_GEO_QUERY = "SET_GEO_QUERY";
export const UPDATE_GEO_QUERY = "UPDATE_GEO_QUERY";

export const LOCATION_SEARCH = createAsyncActionTypes("LOCATION_SEARCH");
export const SEEK_ADDRESS_BY_LATLNG = createAsyncActionTypes(
  "SEEK_ADDRESS_BY_LATLNG"
);
