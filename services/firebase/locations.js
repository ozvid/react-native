import CollectionManager from "./collection";

export const Locations = new CollectionManager("locations");

export const getLocation = id => Locations.getDoc(id);

export const addLocation = locationData => {
  return Locations.addDoc(locationData).then(docRef => {
    return {
      id: docRef.id,
      ...locationData
    };
  });
};

export const updateLocation = (id, locationData) => {
  return Locations.updateDoc(id, locationData);
};
