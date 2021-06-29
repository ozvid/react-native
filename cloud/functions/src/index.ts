import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as moment from 'moment';
import * as Stripe from 'stripe';
import * as twilio from 'twilio';
import * as _ from 'lodash';
import axios from 'axios';
import * as tools from './tools';
import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import { get } from 'geofirex';
const geofirex = require('geofirex')

const Nexmo = require("nexmo");

admin.initializeApp();

const geo = geofirex.init(admin);

const packageStatuses = {
  createdNotPaid: "created_not_paid",
  created: "created",
  courierAssigned: "courier_assigned",
  toPickup: "to_pickup",
  arrived: "arrived",
  toDropOff: "to_drop_off",
  arrivedAtDropOff: "arrived_at_drop_off",
  arrivedAtDropOffPhotoTaken: "arrived_at_drop_off_photo_taken",
  delivered: "delivered",
  pendingConfirmation: 'pending_confirmation',
  cancelled: "cancelled"
};

const STRIPE_KEY = functions.config().stripe.key;

const TWILIO_SID = functions.config().twilio.sid;
const TWILIO_TOKEN = functions.config().twilio.token;

const NEXMO_KEY = functions.config().nexmo.key;
const NEXMO_SECRET = functions.config().nexmo.secret;

const TWILIO_SERVICE_NUMBER = "+17133226434";
const TWILIO_TEST_NUMBER = "+14444444444";

const DELIVERY_PARTNER_SHARE = 0.8;

const stripe = new Stripe(STRIPE_KEY);
const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);
const nexmo = new Nexmo({
  apiKey: NEXMO_KEY,
  apiSecret: NEXMO_SECRET,
})

const ADMIN_EMAILS = ['olowufeli@gmail.com', 'olowuwole@gmail.com'];
const ADMIN_PHONE_NUMBERS = ['+19254280468', '+19258903050'];
const SENDASAP_EMAIL = 'sendasap.noreply@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDASAP_EMAIL,
    pass: 'sendasap2019'
  }
})

export const clearApplications = functions.https.onRequest(async (request, response) => {
  const user_ids =
    await admin
      .auth()
      .listUsers()
      .then(res => res.users.map(user => user.uid));

  const users =
    await admin
      .firestore()
      .collection("users")
      .get()
      .then(userDocs => userDocs.docs);

  const result = ["Results"] as [string];

  for (let i = 0; i < users.length; i++) {
    if (!user_ids.includes(users[i].id)) {
      await users[i].ref
        .delete()
        .then(() => result.push(`${users[i].data().username} user deleted (${users[i].id})`))
        .catch(err => console.error(err));
    }
  }

  response.send(result);
})

/*--------Admin-Notification----*/

export const sendSmsToAdmins = (body: string) => {
  return Promise.all(ADMIN_PHONE_NUMBERS.map(phoneNumber =>
    twilioClient.messages.create({
      from: TWILIO_SERVICE_NUMBER,
      body,
      to: phoneNumber
    })
  ))
}

export const sendEmailToAdmins = (title: string, body: string) => {
  const mailOptions = {
    from: `SendASAP <${SENDASAP_EMAIL}>`,
    to: ADMIN_EMAILS,
    subject: title,
    html: body
  };
  return transporter.sendMail(mailOptions);
};

const generateEmail = (application: any) => {
  const projectId = process.env.GCP_PROJECT;
  const displayRole = application.role === 'courier' ? 'Delivery Partner' : 'Sender';
  const title = `Pending ${displayRole} Application`;
  const body = `<h3>New ${displayRole} Application <a href="https://SendASAP-75568.web.app/users/${application.user}">https://SendASAP-75568.web.app/users/${application.user}</a></h3>`;

  // const body = `<h3>New ${displayRole} Application <a href="https://${projectId}.web.app/users/${application.user}">https://${projectId}.web.app/users/${application.user}</a></h3>`;
  return { title, body };
}

const generateSms = (application: any) => {
  const projectId = process.env.GCP_PROJECT;
  const displayRole = application.role === 'courier' ? 'Delivery Partner' : 'Sender';
  return `New ${displayRole} Application https://SendASAP-75568.web.app/users/${application.user}`;
  // return `New ${displayRole} Application https://${projectId}.web.app/users/${application.user}`;
}

export const onApplicationCreate = functions.firestore.document("applications/{applicationId}").onCreate(async (snap, context) => {
  const { title, body } = generateEmail(snap.data());
  const text = generateSms(snap.data());
  return Promise.all([
    sendEmailToAdmins(title, body),
    sendSmsToAdmins(text)
  ]);
});

/*--------Analytics----------*/

const incrementUserValue = async (userId: string, key: string) => {
  const increment = admin.firestore.FieldValue.increment(1);
  admin
    .firestore()
    .collection("users")
    .doc(userId)
    .update({ [key]: increment })
    .catch(err => console.error(err));
};

export const signUpAnalytics = functions.firestore.document("users/{userId}").onCreate(async (snap, context) => {
  const role = _.get(snap.data(), "role") === "courier" ? "deliveryPartners" : "senders";
  const date = moment().startOf("day").unix();
  return admin
    .database()
    .ref(`signUps/${role}/${date}`)
    .transaction(count => (count || 0) + 1);
});

const setRateToDeliveryPartner = (rate: number, deliveryPartnerId: string) =>
  tools
    .getDoc("users", deliveryPartnerId)
    .then(deliveryPartnerDoc => {
      if (deliveryPartnerDoc.exists) {
        const deliveryPartner = deliveryPartnerDoc.data();
        const peopleRated = _.get(deliveryPartner, "peopleRated") || 0;
        const currentRate = _.get(deliveryPartner, "rate") || 0;
        return deliveryPartnerDoc.ref.update({
          rate: tools.calculateRate(peopleRated, currentRate, rate),
          peopleRated: peopleRated + 1
        });
      }
      return Promise.reject(new Error(`SetRateToDeliveryPartner: user with id ${deliveryPartnerId} is not exist`));
    });

export const packagesAnalytics = functions.firestore.document("packages/{packageId}").onWrite(async (change, context) => {
  const status = _.get(change.after.data(), "status");
  if (status === "delivered") {
    const senderId = _.get(change.after.data(), "clientId");
    await incrementUserValue(senderId, "packagesSent");
    const deliveryPartnerId = _.get(change.after.data(), "courierId");
    await incrementUserValue(deliveryPartnerId, "packagesDelivered");
    if (_.get(change.after.data(), "rate")) {
      const rate = _.get(change.after.data(), "rate");
      setRateToDeliveryPartner(rate, deliveryPartnerId)
        .catch(err => console.error(err));
    }
  }
  const date = moment().startOf("day").unix();
  return admin
    .database()
    .ref(`packages/${status}/${date}`)
    .transaction(count => (count || 0) + 1)
});

/*---------Stripe------------*/

export const createStripeCustomer = functions.firestore.document("users/{userId}").onCreate(async (snap, context) => {

  const user = snap.data();
  if (!user) {
    throw new functions.https.HttpsError('not-found', 'user not found');
  }

  const customer: Stripe.customers.ICustomer = await stripe.customers.create({
    email: user.email
  });

  return admin
    .firestore()
    .collection("users")
    .doc(snap.id)
    .update({
      stripeCustomerId: customer.id
    })
});

export const createCreditCard = functions.https.onCall(async (data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'context not provided');
  }

  const user = await admin.firestore().collection("users").doc(context.auth.uid).get()
    .then(userDoc => userDoc.data())
    .catch(err => {
      throw new functions.https.HttpsError('internal', 'user fetch found');
    })

  if (!user) {
    throw new functions.https.HttpsError('not-found', 'user not found');
  }

  const card = data.card;
  const customer_id = user.stripeCustomerId;

  if (!card || !customer_id) {
    throw new functions.https.HttpsError('invalid-argument', 'card and customer_id expected');
  }

  return stripe.tokens
    .create({ card })
    .then(token =>
      stripe.customers
        .createSource(customer_id, {
          source: token.id,
        })
        .then(customer => customer)
    )
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-argument', error.message);
    });
});

export const createCharge = functions.https.onCall(async (data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'context not provided');
  }

  const user = await admin.firestore().collection("users").doc(context.auth.uid).get()
    .then(userDoc => userDoc.data())
    .catch(err => {
      throw new functions.https.HttpsError('internal', 'user fetch error');
    })

  if (!user) {
    throw new functions.https.HttpsError('not-found', 'user not found');
  }

  const customer_id = user.stripeCustomerId;
  const stripe_id = data.stripeId;
  const package_id = data.packageId;
  const amount = data.amount;
  const currency = data.currency;
  const description = data.description;


  if (!customer_id || !stripe_id || !amount || !currency || !description || !package_id) {
    throw new functions.https.HttpsError('internal', 'arguments are not provided');
  }

  return stripe.charges
    .create({
      source: stripe_id,
      customer: customer_id,
      amount: amount,
      currency: currency,
      description: description,
      transfer_group: package_id,
    })
    .then((charge: any) =>
      admin.firestore().collection("packages").doc(package_id).update({
        stripePaymentId: charge.id,
        status: "created",
      })
    )
});

export const cancelOrderCourier = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'context is not provided');
  }
  if (!data.packageId) {
    throw new functions.https.HttpsError('invalid-argument', 'package id is not provided');
  }

  const packageData: any = await tools.getDoc("packages", data.packageId)
    .then(res => ({ ...res.data(), id: res.id }))

  if (!packageData) {
    throw new functions.https.HttpsError('not-found', 'package not found');
  }
  if (packageData.status !== packageStatuses.courierAssigned) {
    throw new functions.https.HttpsError('aborted', 'order already started or cancelled');
  }

  // if(moment(packageData.pickupTime.toDate()).add(-24, 'hours').isBefore(moment())) {
  //   await stripe.charges
  //     .create({
  //       source: packageData.courierStripeAccountId,
  //       amount: 500,
  //       currency: "usd",
  //       description: `Fine for cancelling package ${packageData.id} by delivery partner ${packageData.courierId}`
  //     })
  //     .catch(err => {
  //       throw new functions.https.HttpsError('internal', err.message);
  //     })
  // }

  return tools
    .updateDoc("packages", packageData.id, {
      status: packageStatuses.created,
      courierId: admin.firestore.FieldValue.delete(),
      courierStripeAccountId: admin.firestore.FieldValue.delete()
    })
    .then(() => tools.notify({
      to: packageData.clientId,
      title: "Order cancelled",
      body: "Your order cancelled by delivery partner",
      data: { packageId: packageData.id }
    }))
});

export const payCancellationFee = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'context is not provided');
  }
  if (!data.packageId) {
    throw new functions.https.HttpsError('invalid-argument', 'package id is not provided');
  }
  if (!data.fee) {
    throw new functions.https.HttpsError('invalid-argument', 'fee is not provided');
  }
  return tools
    .getDoc("packages", data.packageId)
    .then(packageDoc =>
      packageDoc.exists
        ? stripe.refunds
          .create({
            charge: _.get(packageDoc.data(), "stripePaymentId"),
            amount: (_.get(packageDoc.data(), "price") - data.fee) * 100,
          })
        : Promise.reject({ error: "Package is not exist: ", data })
    )
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-argument', error.message);
    });
});

export const payTips = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'context is not provided');
  }
  if (!data.packageId) {
    throw new functions.https.HttpsError('invalid-argument', 'package id is not provided');
  }
  if (!data.tips) {
    throw new functions.https.HttpsError('invalid-argument', 'tips is not provided');
  }
  return tools
    .getDoc("users", context.auth.uid)
    .then(user =>
      user.exists
        ? tools
          .getDoc("packages", data.packageId)
          .then(packageDoc =>
            packageDoc.exists
              ? stripe.charges
                .create({
                  source: _.get(packageDoc.data(), "paymentCardId"),
                  customer: _.get(user.data(), "stripeCustomerId"),
                  amount: data.tips * 100,
                  currency: "usd",
                  transfer_data: {
                    destination: _.get(packageDoc.data(), "courierStripeAccountId"),
                  },
                })
                .then(() =>
                  tools
                    .updateDoc("packages", data.packageId, {
                      tips: parseFloat(data.tips)
                    })
                )
              : Promise.reject({ error: "Package not found", data })
          )
        : Promise.reject({ error: "User not found", data: context.auth })
    )
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-argument', error.message);
    });
})

export const makeTransfer = functions.https.onCall(async (data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'context not provided');
  }

  const package_id = data.package_id;

  if (!package_id) {
    throw new functions.https.HttpsError('internal', 'arguments are not provided');
  }

  const packageData: any = await admin
    .firestore().collection("packages").doc(package_id).get()
    .then(res => ({ ...res.data(), id: res.id }));

  if (!packageData) {
    throw new functions.https.HttpsError('not-found', 'package not found');
  }

  const courier: any = await admin.firestore().collection("users").doc(packageData.courierId).get()
    .then(res => ({ ...res.data(), id: res.id }))
    .catch(err => console.log(err));

  if (!courier) {
    throw new functions.https.HttpsError('not-found', 'courier not found');
  }

  const stripe_account_id = courier.stripeAccountId;

  const amount = Math.round(packageData.price * DELIVERY_PARTNER_SHARE * 100);

  return stripe.transfers
    .create({
      amount,
      currency: "usd",
      destination: stripe_account_id,
      transfer_group: package_id,
      source_transaction: packageData.stripePaymentId,
    })
    .then((transfer: any) => admin
      .firestore().collection("transfers").doc(package_id).set({
        courier_id: courier.id,
        amount,
        time: Date.now() / 1000,
        description: "Payment for " + packageData.packageType,
        package_id: packageData.id
      })
      .then(() => admin.firestore().collection("packages").doc(package_id).update({
        status: "delivered",
      })
        .then(() => transfer)))
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-argument', error.message);
    });
})

export const handleAccessToken = functions.https.onRequest((request, response) => {
  const code = request.query.code;
  if (!code) {
    response.send(request.query)
  } else {
    response.redirect("exp://exp.host/@sl-sendasap/send-asap?code=" + code)
  }
})

export const handleAccessTokenFromStandalone = functions.https.onRequest((request, response) => {
  const code = request.query.code;
  if (!code) {
    response.send(request.query)
  } else {
    console.log("send-asap://?code=" + code);
    response.redirect("send-asap://?code=" + code)
  }
})

export const createStripeAccount = functions.https.onCall((data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'context not provided');
  }

  const access_token = data.access_token;
  const uid = context.auth.uid;

  const instance = axios.create({
    baseURL: 'https://connect.stripe.com/',
  });

  return instance
    .post("oauth/token", {
      client_secret: STRIPE_KEY,
      code: access_token,
      grant_type: "authorization_code"
    })
    .then((response: any) =>
      admin.firestore().collection("users").doc(uid).update({
        stripeAccountId: response.data.stripe_user_id
      })
    )
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-argument', error.message);
    });
})

/**********Nexmo**********/

const validateNumberAsync = (number: string) => {
  return new Promise((resolve, reject) => {
    nexmo.numberInsight.get({ level: "advancedSync", number }, (error: any, result: any) => {
      if (error) {
        reject(new Error("Incorrect Phone Number"))
      } else {
        if (
          result.current_carrier.name === ""
          || result.current_carrier.network_code.toLowerCase().includes("virtual")
          || result.valid_number !== "valid"
          || result.current_carrier.network_type === 'virtual'
        ) {
          reject(new Error("Invalid Phone Number"));
        } else {
          resolve({ result });
        }
      }
    })
  })
    .catch((error) => {
      throw new functions.https.HttpsError('invalid-argument', error.message);
    });
}

/**********Twilio**********/

export const sendVerificationCode = functions.https.onCall(async (data) => {

  if (data.number === TWILIO_TEST_NUMBER) { return true }

  await validateNumberAsync(data.number.substr(1)).catch(err => {
    throw new functions.https.HttpsError('internal', err.message)
  });

  await tools.getDoc('smsVerifications', data.number).then(doc => {
    const last_sms_time = _.get(doc.data(), "date._seconds") * 1000
    const current_time = moment().valueOf()
    if ((current_time - last_sms_time) / 1000 / 60 < 1) {
      throw new functions.https.HttpsError('permission-denied', "You can send only one sms per minute")
    }
  })

  const code = tools.generateCode()
  return twilioClient.messages.create({
    from: TWILIO_SERVICE_NUMBER,
    body: `${code} is your verification code for Send ASAP`,
    to: data.number
  }).then(() => tools
    .setDoc("smsVerifications", data.number, {
      code: code,
      date: admin.firestore.FieldValue.serverTimestamp()
    })
  )
    .catch((err: any) => {
      throw new functions.https.HttpsError('invalid-argument', err.message)
    })
})

export const checkVerificationCode = functions.https.onCall((data) => {

  if (data.number === TWILIO_TEST_NUMBER) { return data.number }

  return tools
    .getDoc("smsVerifications", data.number)
    .then(doc => {
      if (data.code === _.get(doc.data(), 'code')) {
        return data.number
      } else {
        throw new functions.https.HttpsError('aborted', 'invalid sms code');
      }
    })
})

export const testRedirect = functions.https.onRequest((request, response) => {
  response.redirect("exp://127.0.0.1:19000/@sendasap/send-asap")
})

export const testRedirectParams = functions.https.onRequest((request, response) => {
  response.redirect("exp://exp.host/@sendasap/send-asap?foo=bar")
})

export const calculatePrice = functions.https.onCall((data, context) => {
  return tools
    .searchDoc("distances", {
      where: "min",
      condition: "<=",
      value: data.distance
    })
    .then(distances =>
      distances.docs
        .filter(c => c.data().max >= data.distance)
    )
    .then(distancesFiltered => distancesFiltered[0])
    .then(distance => {
      if (distance && distance.data()[data.packageType]) {
        return distance.data()[data.packageType]
      } else {
        throw new functions.https.HttpsError('not-found', 'Price calculation filed');
      }
    })
})

/*--------Push-Notifications-------------*/

export const pushTokenReceiver = functions.https.onCall((data, context) => {
  const token = data.token;
  const uid = data.uid;
  const device_id = data.device_id;

  if (!token || !uid || !device_id) {
    throw new functions.https.HttpsError('invalid-argument', 'token or uid or device_id is not provided');
  }

  admin.firestore().collection("pushTokens").doc(uid).set({
    [device_id]: token
  })
    .then(() => console.log("success"))
    .catch(err => {
      throw new functions.https.HttpsError('internal', 'Update error');
    })
});

const getAllTokens = async () => {
  let tokens;
  const tokensTemp = await admin.firestore().collection('pushTokens').get()
    .then(res => res.docs.map(doc => Object.values(doc.data()))).catch(err => {
      throw new functions.https.HttpsError('invalid-argument', 'all tokens fetch error');
    })
  tokensTemp.map(tokenGroup => tokenGroup.map(token => tokens.push(token)))
  return tokens ? tokens : [];
}

const getUserTokens = async (userId: string) => {
  const user = await admin.firestore().collection('pushTokens').doc(userId).get()
    .then(res => {
      return admin.firestore().collection("users").doc(res.id).get()
        .then(userDoc => {
          if (_.get(userDoc.data(), "receivePush")) {
            return res.data()
          } else return false;
        }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  if (user) {
    return Object.values(user) ? Object.values(user) : [];
  } else {
    return [];
  }
}

export const sendNotification = functions.https.onCall(async (data, context) => {
  const expo = new Expo();
  const { to, title, body } = data;
  if (!to || !title || !body) {
    throw new functions.https.HttpsError('internal', 'arguments are not provided');
  }

  const tokens = to === 'all' ? await getAllTokens() : await getUserTokens(to);

  let messages = [];
  for (let pushToken of tokens) {

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    let notification: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      title: title,
      body: body,
    }

    if (data.data) { notification.data = data.data }

    messages.push(notification)
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets: Array<any> = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })().then(res => {
    return res;
  }).catch(err => {
    console.error(err)
    throw new functions.https.HttpsError('internal', err.message);
  })
})

export const removeToken = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  const device_id = data.device_id;

  if (!uid) {
    throw new functions.https.HttpsError('invalid-argument', 'uid ');
  }

  const pushTokens = await admin.firestore().collection("pushTokens").doc(uid).get();

  if (pushTokens.exists) {
    return admin.firestore().collection("pushTokens").doc(uid).update({
      [device_id]: admin.firestore.FieldValue.delete()
    });
  }
  return Promise.resolve(`There is no push tokens for user_id: ${uid}`);
});

const packageStatusesTexts = {
  [packageStatuses.courierAssigned]: "Package assigned",
  [packageStatuses.toPickup]: "Package on the way to pick up",
  [packageStatuses.arrived]: "Package arrived to pickup location",
  [packageStatuses.toDropOff]: "Package on the way to drop off location",
  [packageStatuses.arrivedAtDropOff]: "Package arrived at drop off location",
  [packageStatuses.pendingConfirmation]: "Package pending your confirmation",
  [packageStatuses.delivered]: "Package delivered",
  [packageStatuses.cancelled]: "Package cancelled",
}

export const notifyOnStatusUpdate = functions.firestore
  .document("packages/{packageId}")
  .onUpdate((change, context) => {
    if (_.get(change.before.data(), "status") !== _.get(change.after.data(), "status")) {
      const data: any = {
        ...change.after.data(),
        id: change.after.id
      };
      if (_.get(packageStatusesTexts, data.status)) {
        return tools.notify({
          to: data.clientId,
          title: "Package status updated",
          body: packageStatusesTexts[data.status],
          data: { packageId: data.id }
        })
      } else {
        return Promise.resolve("no_op");
      }
    }
    return Promise.resolve({});
  });

const applicationStatuses = {
  verified: "verified",
  rejected: "rejected",
  pending: "pending"
};

const applicationStatusesTexts = {
  [applicationStatuses.verified]: "Your application is verified!",
  [applicationStatuses.rejected]: "Your application was rejected",
  [applicationStatuses.pending]: "Your application is pending verification"
}

export const notifyOnApplicationStatusUpdate = functions.firestore
  .document("applications/{applicationId}")
  .onUpdate((change, context) => {
    if (_.get(change.before.data(), "status") !== _.get(change.after.data(), "status")) {
      const data: any = {
        ...change.after.data(),
        id: change.after.id
      };
      if (_.get(applicationStatusesTexts, data.status)) {
        const applicationType = data.role === "client" ? "Sender" : "Delivery Partner";
        return tools.notify({
          to: data.user,
          title: `${applicationType} application status updated`,
          body: applicationStatusesTexts[data.status]
        });
      } else {
        return Promise.reject(new Error(`Can't find notification text for status: ${data.status}`));
      }
    } else {
      return Promise.reject(new Error(`Status is not updated`));
    }
  });

type Location = {
  longitude: Number,
  latitude: Number
}

type NotificationMessage = {
  title: string,
  body: string,
}

async function getDriversWithin(radius: Number, location: Location) {
  const { latitude, longitude } = location;
  const locations = admin.firestore().collection('locations');
  const point = geo.point(latitude, longitude);
  const query = geo.query(locations).within(point, radius, 'position');
  return get(query);
}

const notifyDriversWithin = (
  { radius, location, message, except }:
    { radius: Number, location: Location, message: NotificationMessage, except: string }
) => getDriversWithin(radius, location)
  .then((drivers: Array<any>) => drivers.filter((driver: any) => driver.id !== except))
  .then((drivers: Array<any>) => Promise.all(drivers.map((driver: any) => tools.notify({
    to: driver.id,
    ...message
  }))));

export const notifyOnOrderCreate = functions.firestore
  .document("packages/{packageId}")
  .onUpdate((change, context) => {
    const before = change.before.data() || {};
    const after = change.after.data() || {};
    if (before.status !== after.status && after.status === "created") {
      const { from, to, clientId, packageType } = after;
      const displayPackageType = packageType.startsWith("custom") ? "Custom" : tools.capitalize(packageType);
      const message = from.city
        ? `${displayPackageType} Package Delivery Request from ${from.city}, ${from.state} to ${to.city}, ${to.state}`
        : from.address;
      return Promise.all([
        notifyDriversWithin({
          radius: 80.4672, // 50miles
          location: {
            latitude: from.latitude,
            longitude: from.longitude
          },
          message: {
            title: "New Delivery Request",
            body: message,
          },
          except: clientId
        }),
        sendSmsToAdmins(`SendASAP - ${message}`)
      ])
    }
    return Promise.resolve("no_op");
  });
