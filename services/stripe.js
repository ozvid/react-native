import { Linking } from "expo";
import * as Constants from "expo-constants";

import { encodeQueryData } from "./utils";

const STRIPE_CLIENT_ID = Constants.default.manifest.extra.stripe.client_id;
const STRIPE_OAUTH_URL = "https://connect.stripe.com/express/oauth/authorize";

export const oauth = (redirectUri, stripe_user = {}, state = "state") => {
  const stripeOAuthUrl = `${STRIPE_OAUTH_URL}?redirect_uri=${redirectUri}&client_id=${STRIPE_CLIENT_ID}&state=${state}&${encodeQueryData(
    stripe_user,
    "stripe_user"
  )}`;
  Linking.openURL(stripeOAuthUrl);
};
