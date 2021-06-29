import { all, fork, takeLatest, put } from "redux-saga/effects";

import { logInSaga } from "./login-screen/login.saga";
import { signUpSaga } from "./signup-screen/signup.saga";
import { verifyNumberSaga } from "./signup-screen/verify-phone.saga";
import { forgotSaga } from "./forgot-screen/forgot.saga";
import { changeLoader } from "../../components/loading/loading.actions";

import * as authActionTypes from "./auth.action-types";

import { firebaseService, navigationService } from "../../services";
import { async } from "../../sagas/asyncSaga";

function* logout(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.signOut, {});
}

function* logoutSuccess(action) {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("starterFourth");
}

function* logoutFailure(action) {
  yield put(changeLoader({ visible: false }));
}

export function* authSaga() {
  yield takeLatest(authActionTypes.LOG_OUT.REQUEST, logout);
  yield takeLatest(authActionTypes.LOG_OUT.SUCCESS, logoutSuccess);
  yield takeLatest(authActionTypes.LOG_OUT.FAILURE, logoutFailure);
  yield all([
    fork(logInSaga),
    fork(signUpSaga),
    fork(forgotSaga),
    fork(verifyNumberSaga)
  ]);
}
