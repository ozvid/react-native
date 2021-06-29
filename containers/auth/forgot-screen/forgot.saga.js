import { throttle, takeLatest, put, fork } from "redux-saga/effects";

import { async } from "../../../sagas/asyncSaga";
import { FORGOT_PASSWORD } from "../auth.action-types";
import { navigationService, firebaseService } from "../../../services";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";

function* forgotPassword(action) {
  yield fork(async, action, firebaseService.forgotPassword, {
    ...action.payload
  });
}

function* forgotPasswordSuccess() {
  navigationService.navigate("login");
  yield put(
    showAlert({
      message: "We have sent you an email with a link to reset your password"
    })
  );
}

function* forgotPasswordFailure(action) {
  yield put(showAlert({ message: `Error: ${action.payload}` }));
}

export function* forgotSaga() {
  yield throttle(1000, FORGOT_PASSWORD.REQUEST, forgotPassword);
  yield takeLatest(FORGOT_PASSWORD.SUCCESS, forgotPasswordSuccess);
  yield takeLatest(FORGOT_PASSWORD.FAILURE, forgotPasswordFailure);
}
