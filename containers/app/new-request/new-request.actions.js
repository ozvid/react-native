import { action } from "../../../sagas/asyncAction";

import * as actionTypes from "./new-request.action-types";

export const addPackage = data => action(actionTypes.ADD_PACKAGE.REQUEST, data);

export const setPickupLocation = location =>
  action(actionTypes.SET_PICKUP_LOCATION, location);

export const setPickupTime = time => action(actionTypes.SET_PICKUP_TIME, time);

export const setDropoffLocation = location =>
  action(actionTypes.SET_DROPOFF_LOCATION, location);

export const setCard = data => action(actionTypes.SET_CARD, data);

export const setDistance = distance =>
  action(actionTypes.SET_DISTANCE, distance);

export const calculatePrice = data =>
  action(actionTypes.CALCULATE_PRICE.REQUEST, data);
