import CollectionManager from "./collection";

export const Variables = new CollectionManager("variables");

export const getVariable = id => Variables.getDoc(id);

export const addVariable = variableData => {
  return Variables.addDoc(variableData).then(docRef => {
    return {
      id: docRef.id,
      ...variableData
    };
  });
};

export const updateVariable = (id, variableData) => {
  return Variables.updateDoc(id, variableData);
};
