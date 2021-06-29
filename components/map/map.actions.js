import { action } from "../../sagas/asyncAction";
import * as actionTypes from "./map.action-types";

export const regionChange = region =>
  action(actionTypes.REGION_CHANGE, { region });

export const setCurrentLocation = location =>
  action(actionTypes.SET_CURRENT_LOCATION, { location });

export const setLocation = (location, zoomLevel = "MEDIUM") =>
  action(actionTypes.SET_LOCATION, { location, zoomLevel });

export const setRoute = (origin, destination, directions) =>
  action(actionTypes.SET_ROUTE, { origin, destination, directions });

export const clearRoute = () => action(actionTypes.CLEAR_ROUTE, {});

export const locationPermission = () =>
  action(actionTypes.LOCATION_PERMISSION, {});

export const locationPermissionGranted = () =>
  action(actionTypes.LOCATION_PERMISSION_GRANTED, {});

export const searchLocation = location =>
  action(actionTypes.LOCATION_SEARCH.REQUEST, { location });

export const seekAddress = (latitude, longitude) =>
  action(actionTypes.SEEK_ADDRESS_BY_LATLNG.REQUEST, { latitude, longitude });
