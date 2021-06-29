import Stripe from "react-native-stripe-api";

const STRIPE_KEY = "sk_test_WxxbdsQtUqhVGKPVILK1e2Nc00nIWk85Po";

export const stripe = new Stripe(STRIPE_KEY);
