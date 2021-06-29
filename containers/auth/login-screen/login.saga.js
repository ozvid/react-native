import { Alert } from "react-native";
import { put, throttle, takeLatest, fork } from "redux-saga/effects";

import { async } from "../../../sagas/asyncSaga";
import { LOGIN_WITH_EMAIL } from "../auth.action-types";
import { navigationService, firebaseService } from "../../../services";
import { getProfile } from "../../app/account/account.actions";
import { changeLoader } from "../../../components/loading/loading.actions";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";

function* emailLogin(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(
    async,
    action,
    firebaseService.signInWithEmailAndPassword,
    action.payload
  );
}

function* emailLoginSuccess(action) {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("loading");
}

function* emailLoginFailure(action) {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: action.payload.message }));
}

export function* logInSaga() {
  yield throttle(1000, LOGIN_WITH_EMAIL.REQUEST, emailLogin);
  yield takeLatest(LOGIN_WITH_EMAIL.SUCCESS, emailLoginSuccess);
  yield takeLatest(LOGIN_WITH_EMAIL.FAILURE, emailLoginFailure);
}
