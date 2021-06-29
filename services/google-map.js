import Constants from "expo-constants";

import API, { BASE_URL } from "./REST";

/**
 * ==============================
 *            Map APIs
 * ==============================
 *
 * @method searchPlaceByName
 */

/**
 * @description search a location by name
 *
 * @param name
 */
export const searchLocation = ({ location }) =>
  API.callApi(
    BASE_URL.googleMap,
    `place/textsearch/json?query=${encodeURI(location)}&key=${
      Constants.manifest.extra.googleMaps.apiKey
    }`,
    "GET",
    null
  );

export const seekAddressByLatLng = ({ latitude, longitude }) =>
  API.callApi(
    BASE_URL.googleMap,
    `geocode/json?latlng=${latitude},${longitude}&key=${Constants.manifest.extra.googleMaps.apiKey}`,
    "GET",
    null
  );

export const getPlaceDetails = placeid =>
  API.callApi(
    BASE_URL.googleMap,
    `place/details/json?placeid=${encodeURI(
      placeid
    )}&fields=address_components&key=${
      Constants.manifest.extra.googleMaps.apiKey
    }`,
    "GET",
    null
  );
