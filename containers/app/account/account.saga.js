import { Alert } from "react-native";
import { fork, all, takeLatest, put } from "redux-saga/effects";
import * as actionTypes from "./account.action-types";

import { changeLoader } from "../../../components/loading/loading.actions";
import { firebaseService, navigationService } from "../../../services";
import { async } from "../../../sagas/asyncSaga";
import { updatePhotoSaga } from "./update-account-screen/update-photo.saga";
import * as ROLES from "../../../constants/roles";
import { beDeliveryPartnerSaga } from "./be-delivery-partner/be-delivery-partner.saga";

function* getProfile(action) {
  yield fork(async, action, firebaseService.getMe, {});
}

// eslint-disable-next-line require-yield
function* getProfileSuccess(action) {
  navigationService.navigate(
    action.payload.role === ROLES.COURIER
      ? "courierAuthenticated"
      : "clientAuthenticated"
  );
}

// eslint-disable-next-line require-yield
function* getProfileFailure() {
  Alert.alert("Cannot get profile.");
}

function* updateProfile(action) {
  yield fork(async, action, firebaseService.updateProfile, {
    ...action.payload
  });
}

function* updateProfileSuccess() {
  yield put(changeLoader({ visible: false }));
  navigationService.back();
}

function* updateProfileFailure() {
  yield put(changeLoader({ visible: false }));
  Alert.alert("Cannot update profile.");
}

function* updateFirebaseProfile(action) {
  yield fork(async, action, firebaseService.updateFirebaseProfile, {
    ...action.payload
  });
}

// eslint-disable-next-line require-yield
function* updateFirebaseProfileSuccess() {
  Alert.alert("Success update profile.");
  navigationService.back();
}

// eslint-disable-next-line require-yield
function* updateFirebaseProfileFailure() {
  Alert.alert("Cannot update profile.");
}

export function* accountSaga() {
  yield takeLatest(actionTypes.GET_PROFILE.REQUEST, getProfile);
  yield takeLatest(actionTypes.GET_PROFILE.SUCCESS, getProfileSuccess);
  yield takeLatest(actionTypes.GET_PROFILE.FAILURE, getProfileFailure);

  yield takeLatest(actionTypes.UPDATE_PROFILE.REQUEST, updateProfile);
  yield takeLatest(actionTypes.UPDATE_PROFILE.SUCCESS, updateProfileSuccess);
  yield takeLatest(actionTypes.UPDATE_PROFILE.FAILURE, updateProfileFailure);

  yield takeLatest(
    actionTypes.UPDATE_FIREBASE_PROFILE.REQUEST,
    updateFirebaseProfile
  );
  yield takeLatest(
    actionTypes.UPDATE_FIREBASE_PROFILE.SUCCESS,
    updateFirebaseProfileSuccess
  );
  yield takeLatest(
    actionTypes.UPDATE_FIREBASE_PROFILE.FAILURE,
    updateFirebaseProfileFailure
  );

  yield all([fork(updatePhotoSaga), fork(beDeliveryPartnerSaga)]);
}
