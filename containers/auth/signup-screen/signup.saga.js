import { throttle, takeLatest, put, fork } from "redux-saga/effects";
import { destroy } from "redux-form";

import { async } from "../../../sagas/asyncSaga";
import { SIGN_UP_WITH_EMAIL } from "../auth.action-types";
import { navigationService, firebaseService } from "../../../services";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";
import { changeLoader } from "../../../components/loading/loading.actions";
import { FORMS } from "../../../constants";

function* signUp(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.signUpWithEmailAndPassword, {
    ...action.payload
  });
}

function* signUpSuccess() {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("signupPush");
  yield put(destroy(FORMS.SIGNUP));
}

function* signUpFailure(action) {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert(`Sign Up failed: ${action.payload}`));
  navigationService.navigate("unAuthenticated");
  yield put(destroy(FORMS.SIGNUP));
}

export function* signUpSaga() {
  yield throttle(1000, SIGN_UP_WITH_EMAIL.REQUEST, signUp);
  yield takeLatest(SIGN_UP_WITH_EMAIL.SUCCESS, signUpSuccess);
  yield takeLatest(SIGN_UP_WITH_EMAIL.FAILURE, signUpFailure);
}
