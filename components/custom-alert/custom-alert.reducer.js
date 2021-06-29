import * as actionTypes from "./custom-alert.action-types";

export const initialState = {
  visible: false,
  title: "",
  message: "",
  buttonText: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        visible: true,
        ...action.payload
      };
    case actionTypes.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};
