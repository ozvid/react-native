import * as actionTypes from "./new-request.action-types";
import { ASYNC_STATUSES } from "../../../constants";

const initialState = {
  pickupLocation: undefined,
  pickupTime: undefined,
  dropoffLocation: undefined,
  card: undefined,
  id: undefined,
  distance: undefined,
  price: undefined,
  status: "loading"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CALCULATE_PRICE.REQUEST:
    case actionTypes.ADD_PACKAGE.REQUEST:
      return {
        ...state,
        ...action.payload,
        status: ASYNC_STATUSES.LOADING
      };

    case actionTypes.ADD_PACKAGE.SUCCESS:
      return { ...state, ...action.payload, status: ASYNC_STATUSES.SUCCESS };

    case actionTypes.CALCULATE_PRICE.SUCCESS:
      return {
        ...state,
        price: action.payload.data,
        status: ASYNC_STATUSES.SUCCESS
      };

    case actionTypes.CALCULATE_PRICE.FAILURE:
    case actionTypes.ADD_PACKAGE.FAILURE:
      return { ...state, status: ASYNC_STATUSES.FAILED };

    case actionTypes.SET_PICKUP_LOCATION:
      return { ...state, pickupLocation: action.payload };

    case actionTypes.SET_PICKUP_TIME:
      return { ...state, pickupTime: action.payload };

    case actionTypes.SET_DROPOFF_LOCATION:
      return { ...state, dropoffLocation: action.payload };

    case actionTypes.SET_CARD:
      return { ...state, card: action.payload };

    case actionTypes.CREATE_CHARGE:
      return { ...state };

    case actionTypes.CREATE_CHARGE.SUCCESS:
      return initialState;

    case actionTypes.SET_DISTANCE:
      return { ...state, distance: action.payload };

    default:
      return state;
  }
};
