import { Alert } from "react-native";
import { throttle, takeLatest, fork, put } from "redux-saga/effects";

import { firebaseService } from "../../../../services";
import { async } from "../../../../sagas/asyncSaga";
import { UPDATE_PHOTO } from "../account.action-types";
import { changeLoader } from "../../../../components/loading/loading.actions";
import { updateProfile } from "../account.actions";

function* updatePhoto(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.uploadFile, action.payload);
}

function* updatePhotoSuccess(action) {
  yield put(updateProfile({ photoURL: action.payload.url }));
  yield put(changeLoader({ visible: false }));
}

function* updatePhotoFailure(action) {
  Alert.alert(`Save Photo failed: ${action.payload}`);
  yield put(changeLoader({ visible: false }));
}

export function* updatePhotoSaga() {
  yield throttle(1000, UPDATE_PHOTO.REQUEST, updatePhoto);
  yield takeLatest(UPDATE_PHOTO.SUCCESS, updatePhotoSuccess);
  yield takeLatest(UPDATE_PHOTO.FAILURE, updatePhotoFailure);
}
