import * as actionTypes from "./account.action-types";
import {
  LOG_OUT,
  LOGIN_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL
} from "../../auth/auth.action-types";

const initialState = {
  status: "pending",
  id: undefined,
  username: null,
  email: "",
  photoURL: null,
  roles: [],
  stripe_token: null,
  balance: 0,
  credit_cards: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE.REQUEST:
    case actionTypes.UPDATE_PROFILE.REQUEST:
    case actionTypes.UPDATE_PHOTO.REQUEST:
    case actionTypes.BE_DELIVERY_PARTNER.REQUEST:
    case actionTypes.UPDATE_FIREBASE_PROFILE.REQUEST:
    case LOGIN_WITH_EMAIL.SUCCESS:
    case SIGN_UP_WITH_EMAIL.SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case actionTypes.BE_DELIVERY_PARTNER.SUCCESS:
    case actionTypes.GET_PROFILE.SUCCESS:
    case actionTypes.UPDATE_PROFILE.SUCCESS:
    case actionTypes.UPDATE_PHOTO.SUCCESS:
    case actionTypes.UPDATE_FIREBASE_PROFILE.SUCCESS:
      return { ...state, ...action.payload, status: "success" };

    case actionTypes.BE_DELIVERY_PARTNER.FAILURE:
    case actionTypes.GET_PROFILE.FAILURE:
    case actionTypes.UPDATE_PROFILE.FAILURE:
    case actionTypes.UPDATE_PHOTO.FAILURE:
    case actionTypes.UPDATE_FIREBASE_PROFILE.FAILURE:
      return { ...state, status: "failed" };

    case LOG_OUT.SUCCESS:
      return initialState;

    default:
      return state;
  }
};
