import { action } from "../../sagas";

import * as actionTypes from "./auth.action-types";

export const login = (email, password) =>
  action(actionTypes.LOGIN_WITH_EMAIL.REQUEST, { email, password });

export const signUp = data =>
  action(actionTypes.SIGN_UP_WITH_EMAIL.REQUEST, data);

export const logout = () => action(actionTypes.LOG_OUT.REQUEST, {});

export const forgotPassword = email =>
  action(actionTypes.FORGOT_PASSWORD.REQUEST, { email });

export const sendCode = number =>
  action(actionTypes.SEND_CODE.REQUEST, { number });

export const sendUpdateCode = number =>
  action(actionTypes.SEND_UPDATE_CODE.REQUEST, { number });

export const resendCode = number =>
  action(actionTypes.RESEND_CODE.REQUEST, { number });

export const checkCode = ({ code, number }) =>
  action(actionTypes.CHECK_CODE.REQUEST, { code, number });

export const checkUpdateCode = ({ code, number }) =>
  action(actionTypes.CHECK_UPDATE_CODE.REQUEST, { code, number });

export const isConfirmCode = confirmCode =>
  action(actionTypes.CONFIRM_CODE.REQUEST, { confirmCode });
