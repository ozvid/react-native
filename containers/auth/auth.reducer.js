import * as actionTypes from "./auth.action-types";

/**
 * @typedef authState
 * @property {string} status
 * @property {string | null} token
 * @property {string | null} uid
 */

const initialState = {
  status: "pending",
  token: null,
  uid: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_WITH_EMAIL.REQUEST:
    case actionTypes.SIGN_UP_WITH_EMAIL.REQUEST:
    case actionTypes.LOG_OUT.REQUEST:
    case actionTypes.CONFIRM_CODE.REQUEST:
      return { ...state, ...action.payload, status: "loading" };

    case actionTypes.LOGIN_WITH_EMAIL.SUCCESS:
    case actionTypes.SIGN_UP_WITH_EMAIL.SUCCESS:
      return { ...state, status: "success" };

    case actionTypes.LOG_OUT.SUCCESS:
      return initialState;

    case actionTypes.LOGIN_WITH_EMAIL.FAILURE:
    case actionTypes.SIGN_UP_WITH_EMAIL.FAILURE:
    case actionTypes.LOG_OUT.FAILURE:
    case actionTypes.SEND_CODE.FAILURE:
      return { ...state, status: "failure" };
    case actionTypes.SEND_CODE.SUCCESS:
      return { ...state, status: "success" };
    default:
      return state;
  }
};
