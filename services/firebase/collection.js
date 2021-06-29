import firebase from "firebase";

export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

class CollectionManager {
  constructor(collection) {
    this.collectionName = collection;
    this.collection = firebase.firestore().collection(collection);
  }

  collectionRef = () => this.collection;

  docRef = id => this.collection.doc(id);

  setDoc = (id, data, options) =>
    this.collection.doc(id).set(
      {
        ...data,
        created_at: timestamp,
        updated_at: timestamp
      },
      options
    );

  updateDoc = (id, data) =>
    this.collection.doc(id).update({
      ...data,
      updated_at: timestamp
    });

  addDoc = data =>
    this.collection.add({
      ...data,
      created_at: timestamp,
      updated_at: timestamp
    });

  removeDoc = id => this.collection.doc(id).delete();

  getDoc = id => this.collection.doc(id).get();

  getAll = () => this.collection.get();

  getSome = ids => {
    return Promise.all(
      ids.map(id => {
        return this.collection.doc(id).get();
      })
    );
  };

  onSnapshot = (...args) => this.collection.onSnapshot(...args);

  onDocSnapShot = (docId, callback) =>
    this.collection.doc(docId).onSnapshot(callback);

  updateDoc = (id, data) =>
    this.collection.doc(id).update({ ...data, updated_at: timestamp });

  where = (fieldPath, op, value) => this.collection.where(fieldPath, op, value);

  search = (fieldPath, op, value) =>
    this.collection.where(fieldPath, op, value);

  deleteField = (id, field) =>
    this.collection
      .doc(id)
      .update({ [field]: firebase.firestore.FieldValue.delete() });

  addArrayItem = (id, field, item) => {
    const ref = this.collection.doc(id);
    return firebase.firestore().runTransaction(transaction => {
      return transaction.get(ref).then(snapshot => {
        const updatedList = snapshot.get(field) || [];
        updatedList.push(item);
        return transaction
          .update(ref, field, updatedList)
          .update(ref, "updated_at", timestamp);
      });
    });
  };

  removeArrayItem = (id, field, item) => {
    const ref = this.collection.doc(id);
    return firebase.firestore().runTransaction(transaction => {
      return transaction.get(ref).then(snapshot => {
        const updatedList = (snapshot.get(field) || []).filter(
          arrayItem => JSON.stringify(arrayItem) !== JSON.stringify(item)
        );
        transaction
          .update(ref, field, updatedList)
          .update(ref, "updated_at", timestamp);
      });
    });
  };
}

export default CollectionManager;
