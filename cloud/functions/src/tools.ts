import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import * as crypto from 'crypto';
import * as _ from 'lodash';

import Expo, { ExpoPushMessage } from 'expo-server-sdk';

const randtoken = require('rand-token');

export const calculateRate = (peopleRated: number, currentRate: number, rate: number) => {
  const currentRateTotal = currentRate * peopleRated;
  return Math.round(((currentRateTotal + rate) / (peopleRated + 1)) * 10) / 10;
}

export const hash = (string: string) => {
    return crypto
        .createHmac('sha256', "secret")
        .update(string)
        .digest("hex")
}

export const generateCode = () => {
    return randtoken.generate(6, '0123456789');
}

export const getDoc = (collection: string, id: string) => {
    return admin
        .firestore()
        .collection(collection)
        .doc(id)
        .get()
}

export const setDoc = (collection: string, id: string, data: any) => {
    return admin
        .firestore()
        .collection(collection)
        .doc(id)
        .set(data)
}

export const updateDoc = (collection: string, id: string, data: any) => {
    return admin
        .firestore()
        .collection(collection)
        .doc(id)
        .update(data)
}

export const searchDoc = (collection: string, search: { where: string, condition: '<' | '<=' | '==' | '>=' | '>' | 'array-contains', value: string }) => {
    return admin
        .firestore()
        .collection(collection)
        .where(search.where, search.condition, search.value)
        .get()
}

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
    .then(res => res.data())
    .catch(err => console.error(err))
  if(user) {
    return Object.values(user) ? Object.values(user) : [];
  } else {
    return [];
  }
}

export const notify = async (data: any) => {
    const expo = new Expo();
    const { to, title, body } = data;
    if (!to || !title || !body) {
      throw new Error("invalid arguments")
    }
    const tokens = to === 'all' ? await getAllTokens() : await getUserTokens(to);
    let messages = [];
    for (let pushToken of tokens) {

      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
  
      let notification : ExpoPushMessage = {
        to: pushToken,
        sound: 'default',
        priority: "high",
        title: title,
        body: body,
      }
  
      if(data.data) { notification.data = data.data }
      console.log(notification);
      messages.push(notification)
    }
    console.log(messages);
    let chunks = expo.chunkPushNotifications(messages);
    let tickets : Array<any> = [];
    (async () => {
      for (let chunk of chunks) {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        console.log(tickets);
      }
    })().then(res => res)
    .catch(err => {
      throw err;
    })
    return false;
  }

  export const capitalize = (s:string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }