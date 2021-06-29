import { Alert } from "react-native";
import { fork, takeLatest, select, put } from "redux-saga/effects";

import * as actionTypes from "./new-request.action-types";

import { firebaseService, navigationService } from "../../../services";
import { async } from "../../../sagas/asyncSaga";
import { changeLoader } from "../../../components/loading/loading.actions";

function* addPackage(action) {
  yield fork(async, action, firebaseService.addPackage, action.payload);
}

function* addPackageSuccess(action) {
  const stripeId = yield select(state => state.newRequest.card.stripe_id);

  yield put({
    type: actionTypes.CREATE_CHARGE.REQUEST,
    payload: {
      amount: action.payload.price * 100,
      description: action.payload.description,
      packageId: action.payload.id,
      currency: "usd",
      stripeId
    }
  });
}

function* addPackageFailure(action) {
  yield put(changeLoader({ visible: false }));
  Alert.alert("Cannot update package.");
}

function* createCharge(action) {
  yield fork(async, action, firebaseService.createCharge, action.payload);
}

function* createChargeSuccess(action) {
  navigationService.navigate("myRequests");
  yield put(changeLoader({ visible: false }));
}

function* createChargeFailure(action) {
  Alert.alert("Payment error.");
  yield put(changeLoader({ visible: false }));
}

function* calculatePrice(action) {
  yield fork(async, action, firebaseService.calculatePrice, action.payload);
}

function* calculatePriceSuccess(action) {}
function* calculatePriceFailure(action) {}

export function* newRequestSaga() {
  yield takeLatest(actionTypes.ADD_PACKAGE.REQUEST, addPackage);
  yield takeLatest(actionTypes.ADD_PACKAGE.SUCCESS, addPackageSuccess);
  yield takeLatest(actionTypes.ADD_PACKAGE.FAILURE, addPackageFailure);

  yield takeLatest(actionTypes.CREATE_CHARGE.REQUEST, createCharge);
  yield takeLatest(actionTypes.CREATE_CHARGE.SUCCESS, createChargeSuccess);
  yield takeLatest(actionTypes.CREATE_CHARGE.FAILURE, createChargeFailure);

  yield takeLatest(actionTypes.CALCULATE_PRICE.REQUEST, calculatePrice);
  yield takeLatest(actionTypes.CALCULATE_PRICE.SUCCESS, calculatePriceSuccess);
  yield takeLatest(actionTypes.CALCULATE_PRICE.FAILURE, calculatePriceFailure);
}
