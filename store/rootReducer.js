import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import authReducer from "../containers/auth/auth.reducer";
import accountReducer from "../containers/app/account/account.reducer";
import newRequestReducer from "../containers/app/new-request/new-request.reducer";
import mapReducers from "../components/map/map.reducer";
import loadingReducers from "../components/loading/loading.reducer";
import customAlertReducers from "../components/custom-alert/custom-alert.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  newRequest: newRequestReducer,
  map: mapReducers,
  loading: loadingReducers,
  customAlert: customAlertReducers,
  form: reduxForm
});

export default rootReducer;
