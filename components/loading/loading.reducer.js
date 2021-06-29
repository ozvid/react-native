import * as actionTypes from "./loading.action-types";

const initialState = {
  visible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_LOADER:
      return { ...state, visible: action.payload.visible };

    default:
      return state;
  }
};
