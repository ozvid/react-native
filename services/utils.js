import { Alert } from "react-native";
import { Notifications } from "expo";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import uuidv1 from "uuid/v1";

import { pushTokenReceiver } from "./firebase/functions";
import { uploadFile } from "./firebase/storage";

export const randomKey = () => Math.round(Math.random() * 10000000000);

/**
 * Capitalize string
 * @param {string} str
 */
export const Capitalize = str => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

/**
 * Decode geo string
 * @param {string} str
 */
export const parseStatus = str => {
  return Capitalize(str.split("_").join(" "));
};

/**
 * Decode geo string
 * @param {string} encoded
 */
export const decodePath = encoded => {
  // array that holds the points
  const points = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;
  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63; // finds ascii and substract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
};

export const encodeQueryData = (data, wrapArray = "") => {
  const ret = [];
  for (const d in data) {
    ret.push(
      wrapArray === ""
        ? encodeURIComponent(d)
        : `${`${wrapArray}[${encodeURIComponent(d)}]` +
            "="}${encodeURIComponent(data[d])}`
    );
  }
  return ret.join("&");
};

export const getBlob = photoURL => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      Alert.alert(e.message);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", photoURL, true);
    xhr.send(null);
  });
};

export const registerForPushNotificationsAsync = async uid => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  pushTokenReceiver({
    token,
    uid,
    device_id: Constants.installationId
  });
};

export const uploadImage = async (image, directory = "avatar") =>
  uploadFile({
    directory,
    file_id: uuidv1(),
    device_file_full_path: await getBlob(image)
  });
