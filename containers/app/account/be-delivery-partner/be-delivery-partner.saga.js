import { throttle, takeLatest, put, fork } from "redux-saga/effects";
import { destroy } from "redux-form";

import { async } from "../../../../sagas/asyncSaga";
import { BE_DELIVERY_PARTNER } from "../account.action-types";
import { navigationService, firebaseService } from "../../../../services";
import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import { changeLoader } from "../../../../components/loading/loading.actions";
import { FORMS } from "../../../../constants";

function* beDeliveryPartner(action) {
  yield put(changeLoader({ visible: true }));
  yield fork(async, action, firebaseService.beDeliveryPartner, {
    ...action.payload
  });
}

function* beDeliveryPartnerSuccess() {
  yield put(changeLoader({ visible: false }));
  navigationService.navigate("loading");
  yield put(destroy(FORMS.BE_DELIVERY_PARTNER));
}

function* beDeliveryPartnerFailure(action) {
  yield put(changeLoader({ visible: false }));
  yield put(showAlert(action.payload.message));
  yield put(destroy(FORMS.BE_DELIVERY_PARTNER));
  navigationService.navigate("account");
}

export function* beDeliveryPartnerSaga() {
  yield throttle(1000, BE_DELIVERY_PARTNER.REQUEST, beDeliveryPartner);
  yield takeLatest(BE_DELIVERY_PARTNER.SUCCESS, beDeliveryPartnerSuccess);
  yield takeLatest(BE_DELIVERY_PARTNER.FAILURE, beDeliveryPartnerFailure);
}
