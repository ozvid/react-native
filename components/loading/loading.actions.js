import { action } from "../../sagas/asyncAction";
import * as actionTypes from "./loading.action-types";

export const changeLoader = data => action(actionTypes.CHANGE_LOADER, data);
