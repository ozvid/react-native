import CollectionManager from "./collection";

export const Packages = new CollectionManager("packages");

export const getPackage = id => Packages.getDoc(id);

export const addPackage = packageData => {
  return Packages.addDoc(packageData).then(docRef => {
    return {
      id: docRef.id,
      courierId: 0,
      ...packageData
    };
  });
};

export const updatePackage = (id, packageData) => {
  return Packages.updateDoc(id, packageData);
};
