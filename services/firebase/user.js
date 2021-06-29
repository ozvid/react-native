import * as firebase from "firebase";

import CollectionManager from "./collection";
import { APPLICATION_STATUSES, USER_ROLES } from "../../constants";
import { uploadImage } from "../utils";

export const Users = new CollectionManager("users");
export const Applications = new CollectionManager("applications");
export const Transfers = new CollectionManager("transfers");

export const beDeliveryPartner = async ({
  driverLicense,
  avatar,
  car,
  ssn,
  bio,
  applicationId = null
}) => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    const driverLicenseRes = await uploadImage(driverLicense, "driverLicenses");
    const avatarRes = await uploadImage(avatar);
    if (!applicationId) {
      return Applications.addDoc({
        user: currentUser.uid,
        role: USER_ROLES.COURIER,
        status: APPLICATION_STATUSES.PENDING,
        driverLicense: driverLicenseRes.url,
        photoURL: avatarRes.url,
        car,
        ssn,
        bio
      }).then(docRef =>
        Users.updateDoc(currentUser.uid, {
          deliveryPartnerApplication: docRef.id,
          role: USER_ROLES.COURIER,
          wasCourier: true
        })
      );
    }
    return Applications.updateDoc(applicationId, {
      status: APPLICATION_STATUSES.PENDING,
      driverLicense: driverLicenseRes.url,
      photoURL: avatarRes.url,
      car,
      ssn,
      bio
    });
  }
  return Promise.reject(new Error("You do not have signed in."));
};

/**
 * get current signed in User
 */
export const getMe = () => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return Users.getDoc(currentUser.uid)
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          return docSnapshot.data();
        }
        return Promise.reject(new Error("You did not log in."));
      })
      .then(data => ({
        id: currentUser.uid,
        photoURL: currentUser.photoURL,
        ...currentUser.toJSON(),
        ...data
      }));
  }
  return Promise.reject(new Error("You do not have signed in."));
};

/**
 *
 * @description get User
 *
 * @param {string} id
 */
export const getUser = id => Users.getDoc(id);

export const reauthenticate = currentPassword => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    const cred = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    return currentUser.reauthenticateAndRetrieveDataWithCredential(cred);
  }
  return Promise.reject(new Error("You do not have signed in."));
};

/**
 * Update user Email
 */
export const updateEmail = email => {
  const { currentUser } = firebase.auth();
  return currentUser.updateEmail(email);
};

/**
 * Update user Password
 */
export const updatePassword = password => {
  const { currentUser } = firebase.auth();
  return currentUser.updatePassword(password);
};

/**
 * Update user firebase profile
 */
export const updateFirebaseProfile = profile => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return currentUser.updateProfile(profile).then(() => {
      return {
        id: currentUser.uid,
        ...currentUser.toJSON()
      };
    });
  }
  return Promise.reject(new Error("You do not have signed in."));
};

/**
 * Update user profile
 */
export const updateProfile = profile => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return Users.updateDoc(currentUser.uid, profile).then(data => {
      return {
        id: currentUser.uid,
        ...data
      };
    });
  }
  return Promise.reject(new Error("You do not have signed in."));
};

export const isEmailExists = email =>
  Users.search("email", "==", email)
    .get()
    .then(res => !!res.empty);
