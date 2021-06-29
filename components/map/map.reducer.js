import { LatLng, Region } from "react-native-maps";
import * as actionTypes from "./map.action-types";

/**
 * @typedef mapState
 * @property {string} status
 * @property {LatLng | null} currentLocation
 * @property {LatLng | null} location
 * @property {string} zoomLevel
 * @property {Region | null} region
 * @property {LatLng | null} origin
 * @property {LatLng | null} destination
 * @property {boolean} hasPermission
 * @property {GoogleMapAPIFindPlaceResponse[]} locations
 * @property {GoogleMapAPILookupAddressResponse[]} addresses
 */

/** @typeof mapState */
const initialState = {
  status: "pending",
  currentLocation: null,
  location: null,
  zoomLevel: "MEDIUM",
  region: null,
  origin: null,
  destination: null,
  directions: null,
  hasPermission: false,
  locations: [],
  addresses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCATION_PERMISSION_GRANTED:
      return { ...state, hasPermission: true };

    case actionTypes.SET_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload.location };

    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload.location,
        zoomLevel: action.payload.zoomLevel
      };

    case actionTypes.REGION_CHANGE:
      return {
        ...state,
        region: action.payload.region
      };

    case actionTypes.SET_ROUTE:
      return {
        ...state,
        origin: action.payload.origin,
        destination: action.payload.destination,
        directions: action.payload.directions
      };

    case actionTypes.CLEAR_ROUTE:
      return {
        ...state,
        origin: null,
        destination: null,
        directions: null
      };

    case actionTypes.LOCATION_SEARCH.REQUEST:
    case actionTypes.SEEK_ADDRESS_BY_LATLNG.REQUEST:
      return { ...state, status: "loading" };

    case actionTypes.LOCATION_SEARCH.SUCCESS:
      return { ...state, locations: action.payload, status: "success" };

    case actionTypes.SEEK_ADDRESS_BY_LATLNG.SUCCESS:
      return {
        ...state,
        addresses: action.payload.data.results,
        status: "success"
      };

    default:
      return state;
  }
};
