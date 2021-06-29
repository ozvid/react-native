import { action } from "../../../sagas/asyncAction";

import * as actionTypes from "./account.action-types";

export const getProfile = () => action(actionTypes.GET_PROFILE.REQUEST, {});

export const updateProfile = profile =>
  action(actionTypes.UPDATE_PROFILE.REQUEST, profile);

export const updatePhoto = (directory, file_id, device_file_full_path) =>
  action(actionTypes.UPDATE_PHOTO.REQUEST, {
    directory,
    file_id,
    device_file_full_path
  });

export const updateFirebaseProfile = profile =>
  action(actionTypes.UPDATE_FIREBASE_PROFILE.REQUEST, profile);

export const beDeliveryPartner = payload =>
  action(actionTypes.BE_DELIVERY_PARTNER.REQUEST, payload);
