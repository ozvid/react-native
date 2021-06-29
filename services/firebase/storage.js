import * as firebase from "firebase";

export const uploadFile = payload => {
  const storageRef = firebase
    .storage()
    .ref(`/${payload.directory}/${payload.file_id}`);
  return storageRef.put(payload.device_file_full_path).then(snap => {
    return storageRef.getDownloadURL().then(url => {
      return { url };
    });
  });
};

export const getDownloadURL = ref_path =>
  firebase
    .storage()
    .ref(ref_path)
    .getDownloadURL();
