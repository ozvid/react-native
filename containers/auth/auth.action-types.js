import { createAsyncActionTypes } from "../../sagas/asyncAction";

export const LOGIN_WITH_EMAIL = createAsyncActionTypes("LOGIN_WITH_EMAIL");
export const SIGN_UP_WITH_EMAIL = createAsyncActionTypes("SIGN_UP_WITH_EMAIL");
export const SEND_CODE = createAsyncActionTypes("SEND_CODE");
export const SEND_UPDATE_CODE = createAsyncActionTypes("SEND_UPDATE_CODE");
export const RESEND_CODE = createAsyncActionTypes("RESEND_CODE");
export const CHECK_CODE = createAsyncActionTypes("CHECK_CODE");
export const CHECK_UPDATE_CODE = createAsyncActionTypes("CHECK_UPDATE_CODE");
export const CONTINUE_WITH_FACEBOOK = createAsyncActionTypes(
  "CONTINUE_WITH_FACEBOOK"
);
export const CONFIRM_CODE = createAsyncActionTypes("CONFIRM_CODE");
export const LOG_OUT = createAsyncActionTypes("LOG_OUT");
export const FORGOT_PASSWORD = createAsyncActionTypes("FORGOT_PASSWORD");
export const SIGN_IN_WITH_CUSTOM_TOKEN = createAsyncActionTypes(
  "SIGN_IN_WITH_CUSTOM_TOKEN"
);
