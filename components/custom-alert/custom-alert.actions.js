import { action } from "../../sagas/asyncAction";
import * as actionTypes from "./custom-alert.action-types";

export const showAlert = data => action(actionTypes.SHOW_ALERT, data);
export const clearAlertState = () => action(actionTypes.CLEAR_STATE);
