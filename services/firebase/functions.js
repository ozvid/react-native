import firebase from "firebase";
import "firebase/functions";

export const createCreditCard = firebase
  .functions()
  .httpsCallable("createCreditCard");
export const createCharge = firebase.functions().httpsCallable("createCharge");
export const makeTransfer = firebase.functions().httpsCallable("makeTransfer");
export const handleAccessTokenFromStandalone = firebase
  .functions()
  .httpsCallable("handleAccessTokenFromStandalone");
export const createStripeAccount = firebase
  .functions()
  .httpsCallable("createStripeAccount");

export const sendVerificationCode = firebase
  .functions()
  .httpsCallable("sendVerificationCode");

export const checkVerificationCode = firebase
  .functions()
  .httpsCallable("checkVerificationCode");

export const payCancellationFee = firebase
  .functions()
  .httpsCallable("payCancellationFee");

export const calculatePrice = firebase
  .functions()
  .httpsCallable("calculatePrice");

export const payTips = firebase.functions().httpsCallable("payTips");

export const cancelOrderCourier = firebase
  .functions()
  .httpsCallable("cancelOrderCourier");

//Notifications
export const pushTokenReceiver = firebase
  .functions()
  .httpsCallable("pushTokenReceiver");
export const sendNotification = firebase
  .functions()
  .httpsCallable("sendNotification");
export const removeToken = firebase.functions().httpsCallable("removeToken");
