import firebase from "firebase";
import Constants from "expo-constants";

import { removeToken } from "./functions";
import { uploadImage } from "../utils";
import { USER_ROLES, APPLICATION_STATUSES } from "../../constants";
import CollectionManager from "./collection";

const Users = new CollectionManager("users");

/**
 * @typedef AuthPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * Sign in to firebase with email and password credential
 * @param {AuthPayload} payload
 */
export const signInWithEmailAndPassword = payload =>
  firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(res => {
      if (res.user) {
        return Users.getDoc(res.user.uid).then(user => {
          if (user.exists) {
            return { ...res.user.toJSON(), ...user.data() };
          }
          const newUser = {
            stripe_token: null,
            balance: 0,
            credit_cards: [],
            stripeCustomerId: 0,
            canCourier: false
          };
          Users.setDoc(res.user.uid, newUser);
          return { ...newUser, ...res.user.toJSON() };
        });
      }
      return {};
    });

/**
 * Sign up with firebase with email and password credential
 * @param {AuthPayload} payload
 */
export const signUpWithEmailAndPassword = payload =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(async res => {
      if (res.user) {
        let driverLicense = null;
        let avatar = null;
        if (payload.driverLicense) {
          const { url } = await uploadImage(
            payload.driverLicense,
            "driverLicenses"
          );
          driverLicense = url;
        }
        if (payload.avatar) {
          const { url } = await uploadImage(payload.avatar);
          avatar = url;
        }
        const newUser = {
          wasCourier: payload.role === USER_ROLES.COURIER || false,
          role: payload.role,
          email: payload.email,
          username: payload.name,
          phoneNumber: payload.number,
          stripeCustomerId: 0,
          stripeAccountId: 0,
          credit_cards: [],
          isBusiness: payload.isBusiness || false,
          businessName: payload.businessName || null,
          car: payload.car || null,
          ssn: payload.ssn || null,
          bio: payload.bio || null,
          photoURL: avatar,
          driverLicense,
          verifiedClient: false,
          verifiedCourier: false
        };
        Users.setDoc(res.user.uid, newUser).then(() => {
          if (payload.role === USER_ROLES.COURIER) {
            const { car, ssn, bio } = payload;
            const Applications = new CollectionManager("applications");
            Applications.addDoc({
              user: res.user.uid,
              driverLicense,
              status: APPLICATION_STATUSES.PENDING,
              role: USER_ROLES.COURIER,
              photoURL: avatar,
              car,
              ssn,
              bio
            }).then(docRef =>
              Users.updateDoc(res.user.uid, {
                deliveryPartnerApplication: docRef.id
              })
            );
            Applications.addDoc({
              user: res.user.uid,
              driverLicense,
              status: APPLICATION_STATUSES.PENDING,
              role: USER_ROLES.CLIENT
            }).then(docRef =>
              Users.updateDoc(res.user.uid, {
                senderApplication: docRef.id
              })
            );
          }
        });
        return { ...newUser, ...res.user.toJSON() };
      }
      res.credential;
      return {};
    });

export const forgotPassword = payload =>
  firebase
    .auth()
    .sendPasswordResetEmail(payload.email)
    .then(() => ({}));

export const onAuthStateChanged = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();

      if (user) resolve(user);
      else reject();
    }, reject);
  });

/**
 * Sign out
 */
export const signOut = () =>
  removeToken({
    uid: firebase.auth().currentUser.uid,
    device_id: Constants.installationId
  })
    .then(() => firebase.auth().signOut())
    .catch(err => console.error(err));

export const checkEmail = email =>
  firebase.auth().createUserWithEmailAndPassword(email, "foobar");
