import firebase from "firebase";
import Constants from "expo-constants";
import "@firebase/firestore";
import "@firebase/auth";

const {
  apiKey,
  authDomain,
  projectId,
  databaseURL,
  storageBucket,
  messagingSenderId
} = Constants.manifest.extra.firebase;

const firebaseConfig = Object.freeze({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
});

firebase.initializeApp(firebaseConfig);
