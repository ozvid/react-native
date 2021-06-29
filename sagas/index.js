import { all, fork } from "redux-saga/effects";
import { authSaga } from "../containers/auth/auth.saga";
import { accountSaga } from "../containers/app/account/account.saga";
import { newRequestSaga } from "../containers/app/new-request/new-request.saga";
import { mapSaga } from "../components/map/map.saga";

export * from "./asyncAction";

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(accountSaga),
    fork(mapSaga),
    fork(newRequestSaga)
  ]);
}
