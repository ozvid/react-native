import _ from "lodash";
import * as Permissions from "expo-permissions";

export const distance = (point1, point2, unit) => {
  if (
    point1.latitude === point2.latitude &&
    point1.longitude === point2.longitude
  ) {
    return 0;
  }
  const radlat1 = (Math.PI * point1.latitude) / 180;
  const radlat2 = (Math.PI * point2.latitude) / 180;
  const theta = point2.longitude - point2.longitude;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist *= 1.609344;
  }
  if (unit == "N") {
    dist *= 0.8684;
  }
  return dist;
};

export const getComponents = (addressComponents, isLong) => {
  const components = _(addressComponents)
    .keyBy(c => c.types[0])
    .mapValues(c =>
      isLong ? c.long_name || c.short_name : c.short_name || c.long_name
    )
    .value();
  return {
    zipCode: components.postal_code,
    city: components.locality,
    state: components.administrative_area_level_1,
    street: [components.route, components.street_number]
      .filter(c => c)
      .join(" ")
  };
};

export const fetchGrantedLocationPermissionsAsync = async () => {
  const permissions = await Permissions.getAsync(Permissions.LOCATION);
  if (permissions.status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    return status === "granted"
      ? Promise.resolve(status)
      : Promise.reject(status);
  }
  return Promise.resolve(permissions.status);
};
