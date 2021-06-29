/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import { isNumber } from "util";

import * as TEXT from "./text";

export const DROPDOWN_HEIGHT = 40;

export const chevronIconSize = 23;

export const fontAwesomeShevronIconSize = 16;

export const milesInKms = 0.621371;

export const FORMS = {
  SIGNUP: "signup-form",
  BE_DELIVERY_PARTNER: "be-delivery-partner-form",
  UPDATE: "update-form"
};

export const packageTypes = {
  SUV: "suv",
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
  CUSTOM1: "custom1",
  CUSTOM2: "custom2",
  CUSTOM3: "custom3"
};

export const packageDisplayTexts = {
  suv: "Extra Large Package",
  large: "Large Package",
  medium: "Medium Package",
  small: "Small Package",
  custom1: "Custom Package",
  custom2: "Custom Package",
  custom3: "Custom Package"
};

export const ASYNC_STATUSES = {
  SUCCESS: "success",
  FAILED: "failed",
  LOADING: "loading"
};

export const APPLICATION_STATUSES = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected"
};

export const arrivedButtonShowDistance = 0.5;

export const statuses = {
  created: "created",
  createdNotPaid: "created_not_paid",
  courierAssigned: "courier_assigned",
  toPickup: "to_pickup",
  arrived: "arrived",
  toDropOff: "to_drop_off",
  arrivedAtDropOff: "arrived_at_drop_off",
  arrivedAtDropOffPhotoTaken: "arrived_at_drop_off_photo_taken",
  pendingConfirmation: "pending_confirmation",
  delivered: "delivered",
  cancelled: "cancelled"
};

const formatTitle = (timeLeft, distance) =>
  isNumber(timeLeft) && isNumber(distance)
    ? `${timeLeft} min (${distance} mi)`
    : "Estimating time";

export const STATUSES_TEXT_COURIER = {
  courierAssigned: (timeLeft, distance, pickupTime, customerName = "") => ({
    title: formatTitle(timeLeft, distance),
    belowText: `Picking up a medium package from ${customerName} at ${pickupTime}.`
  }),
  toPickup: (timeLeft, distance, pickupTime, customerName = "") => ({
    title: formatTitle(timeLeft, distance),
    belowText: `Picking up a medium package from ${customerName} at ${pickupTime}.`
  }),
  arrived: (customerName = "") => ({
    title: "Sender notified",
    belowText: `${customerName} will prepare the package for you in front of the house.`
  }),
  toDropOff: (timeLeft, distance, pickupTime) => ({
    title: formatTitle(timeLeft, distance),
    belowText: `Deliver the package to the drop off location at ${pickupTime}.`
  }),
  arrivedAtDropOff: {
    title: "Arrived at drop off location",
    belowText:
      "Please take a photo that you delivered the package to the front door."
  },
  arrivedAtDropOffPhotoTaken: {
    title: "Arrived at drop off location",
    belowText: "Please confirm that you delivered the package."
  },
  pendingConfirmation: {
    title: "Pending Confirmation from Sender",
    belowText: "Sender needs to confirm package delivery"
  }
};

export const TestCreditCard = {
  number: "4242424242424242",
  exp_date: "09/20",
  cvc: "623",
  name: "John Doe",
  address_zip: "100000"
};

export const zoomLevels = {
  LOW: {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  MEDIUM: {
    latitudeDelta: 0.0082,
    longitudeDelta: 0.0081
  },
  HIGH: {
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021
  }
};

export const sizePackage = {
  [packageTypes.SMALL]: {
    length: "16",
    width: "10",
    height: "10"
  },
  [packageTypes.MEDIUM]: {
    length: "18",
    width: "14",
    height: "12"
  },
  [packageTypes.LARGE]: {
    length: "36",
    width: "34",
    height: "25"
  },
  [packageTypes.SUV]: {
    length: "50",
    width: "40",
    height: "30"
  }
};

export { TEXT };

export const testPhotoUrl =
  "https://firebasestorage.googleapis.com/v0/b/send-asap.appspot.com/o/packages%2Fclient_67DVT6QnzaROWA7STWHfHfmRIjy2_6-19-2019_14%3A40%3A59?alt=media&token=99ef7cac-b76f-4960-a878-8fd15be979e1";

export const testDropOfLocation = {
  address: "New York, NY, USA",
  description: "New York, NY, USA",
  lat: 40.7127753,
  lng: -74.0059728,
  mainText: "New York",
  secondaryText: "NY, USA"
};

export const USER_ROLES = {
  CLIENT: "client",
  COURIER: "courier"
};
