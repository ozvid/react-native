import { fork, throttle } from "redux-saga/effects";

import * as actionTypes from "./map.action-types";
import * as API from "../../services/google-map";
import { async } from "../../sagas/asyncSaga";

function* searchLocation(action) {
  yield fork(async, action, API.searchLocation, { ...action.payload });
}

function* seekAddressByLatLng(action) {
  yield fork(async, action, API.seekAddressByLatLng, { ...action.payload });
}

export function* mapSaga() {
  yield throttle(1000, actionTypes.LOCATION_SEARCH.REQUEST, searchLocation);
  yield throttle(
    1000,
    actionTypes.SEEK_ADDRESS_BY_LATLNG.REQUEST,
    seekAddressByLatLng
  );
}
