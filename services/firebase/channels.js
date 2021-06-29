import { eventChannel } from "redux-saga";

export function collectionChannel(collection) {
  return eventChannel(emit => {
    return collection.onSnapshot(
      snapshot => emit(snapshot),
      err => emit(new Error(err))
    );
  });
}

export function geoCollectionChannel(collection, coordinates, radius) {
  return eventChannel(emit => {
    return collection.nearOnSnapshot(
      coordinates,
      radius,
      snapshot => emit(snapshot),
      err => emit(new Error(err))
    );
  });
}
