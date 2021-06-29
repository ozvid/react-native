import { throttle, takeLatest, put, fork } from "redux-saga/effects";

import { async } from "../../../sagas/asyncSaga";
import {
  SEND_CODE,
  RESEND_CODE,
  CHECK_CODE,
  SEND_UPDATE_CODE,
  CHECK_UPDATE_CODE
} from "../auth.action-types";
import { navigationService, firebaseService } from "../../../services";
import { changeLoader } from "../../../components/loading/loading.actions";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";
import { updateProfile } from "../../app/account/account.actions";

function* sendCode(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.sendVerificationCode, {
    ...action.payload
  });
}

function* sendCodeSuccess() {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("signupCode");
}

function* sendCodeFailure(action) {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: action.payload.message }));
}

function* sendUpdateCode(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.sendVerificationCode, {
    ...action.payload
  });
}

function* sendUpdateCodeSuccess() {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("updateNumberCode");
}

function* sendUpdateCodeFailure(action) {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: action.payload.message }));
}

function* resendCode(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.sendVerificationCode, {
    ...action.payload
  });
}

function* resendCodeSuccess() {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: "Verification code sent" }));
}

function* resendCodeFailure(action) {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: action.payload.message }));
}

function* checkCode(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.checkVerificationCode, {
    ...action.payload
  });
}

function* checkCodeSuccess() {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("signupName");
}

function* checkCodeFailure() {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: "Invalid sms code" }));
}

function* checkUpdateCode(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.checkVerificationCode, {
    ...action.payload
  });
}

function* checkUpdateCodeSuccess(action) {
  yield put(changeLoader({ visible: false }));
  yield put(
    updateProfile({
      phoneNumber: action.payload.data
    })
  );
  navigationService.navigate("updateAccount");
}

function* checkUpdateCodeFailure() {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert({ message: "Invalid sms code" }));
}

export function* verifyNumberSaga() {
  yield throttle(1000, SEND_CODE.REQUEST, sendCode);
  yield takeLatest(SEND_CODE.SUCCESS, sendCodeSuccess);
  yield takeLatest(SEND_CODE.FAILURE, sendCodeFailure);

  yield throttle(1000, RESEND_CODE.REQUEST, resendCode);
  yield takeLatest(RESEND_CODE.SUCCESS, resendCodeSuccess);
  yield takeLatest(RESEND_CODE.FAILURE, resendCodeFailure);

  yield throttle(1000, CHECK_CODE.REQUEST, checkCode);
  yield takeLatest(CHECK_CODE.SUCCESS, checkCodeSuccess);
  yield takeLatest(CHECK_CODE.FAILURE, checkCodeFailure);

  yield throttle(1000, SEND_UPDATE_CODE.REQUEST, sendUpdateCode);
  yield takeLatest(SEND_UPDATE_CODE.SUCCESS, sendUpdateCodeSuccess);
  yield takeLatest(SEND_UPDATE_CODE.FAILURE, sendUpdateCodeFailure);

  yield throttle(1000, CHECK_UPDATE_CODE.REQUEST, checkUpdateCode);
  yield takeLatest(CHECK_UPDATE_CODE.SUCCESS, checkUpdateCodeSuccess);
  yield takeLatest(CHECK_UPDATE_CODE.FAILURE, checkUpdateCodeFailure);
}
