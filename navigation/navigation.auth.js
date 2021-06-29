import React from "react";
import { createStackNavigator } from "react-navigation";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { colors } from "../theme";
import OnboardingScreen from "../containers/onboarding-screen";
import LoginScreen from "../containers/auth/login-screen";
import ForgotScreen from "../containers/auth/forgot-screen";
import {
  StarterFirstScreen,
  StarterSecondScreen,
  StarterThirdScreen,
  StarterFourthScreen
} from "../containers/auth/starter-screen";
import {
  SignupNumberScreen,
  SignupCodeScreen,
  SignupNameScreen,
  SignupEmailScreen,
  SignupDriverLicenseScreen,
  SignupVehicleScreen,
  SignupBackgroundCheckScreen,
  SignupAvatarScreen,
  SignupPasswordScreen,
  SignupAgreeScreen,
  SignupPushScreen,
  SignupGpsScreen
} from "../containers/auth/signup-screen";
import TermsScreen from "../containers/terms-screen";
import { Text } from "../components";
import PrivacyPolicyScreen from "../containers/privacy-policy-screen";
import DeliveryPartnerAgreement from "../containers/delivery-partner-agreement";

const StarterNavigation = createStackNavigator(
  {
    starterFirst: { screen: StarterFirstScreen },
    starterSecond: { screen: StarterSecondScreen },
    starterThird: { screen: StarterThirdScreen },
    starterFourth: { screen: StarterFourthScreen }
  },
  {
    initialRouteName: "starterFirst",
    mode: "card",

    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: "transparent"
        },
        headerRight: navigation.state.routeName !== "starterFourth" && (
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => navigation.navigate("starterFourth")}
          >
            <Text
              text="Skip"
              size="medium"
              color={colors.warmGrey}
              fontFamily="rubik-bold"
            />
          </TouchableOpacity>
        ),
        headerLeft: null
      };
    }
  }
);

const SignupNavigation = createStackNavigator(
  {
    signupNumber: { screen: SignupNumberScreen },
    signupCode: { screen: SignupCodeScreen },
    signupName: { screen: SignupNameScreen },
    signupEmail: { screen: SignupEmailScreen },
    signupDriverLicense: { screen: SignupDriverLicenseScreen },
    signupVehicle: { screen: SignupVehicleScreen },
    signupBackgroundCheck: { screen: SignupBackgroundCheckScreen },
    signupAvatar: { screen: SignupAvatarScreen },
    signupPassword: { screen: SignupPasswordScreen },
    signupAgree: { screen: SignupAgreeScreen },
    signupPush: { screen: SignupPushScreen },
    signupGps: { screen: SignupGpsScreen }
  },
  {
    initialRouteName: "signupNumber",
    mode: "card",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: "transparent"
        },
        headerLeft: (
          <View style={{ marginLeft: 15 }}>
            <Entypo
              color={colors.black}
              onPress={() => navigation.goBack(null)}
              name="chevron-left"
              size={30}
            />
          </View>
        )
      };
    }
  }
);

const LoginNavigation = createStackNavigator(
  {
    login: { screen: LoginScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: "transparent"
        },
        headerLeft: (
          <View style={{ marginLeft: 15 }}>
            <Entypo
              color={colors.black}
              onPress={() => navigation.goBack(null)}
              name="chevron-left"
              size={30}
            />
          </View>
        )
      };
    }
  }
);

const ForgotNavigation = createStackNavigator(
  {
    forgot: { screen: ForgotScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 0,
          shadowColor: "transparent"
        },
        headerLeft: (
          <View
            style={{
              marginLeft: 15,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Entypo
              color={colors.black}
              onPress={() => navigation.goBack(null)}
              name="chevron-left"
              size={30}
            />
          </View>
        )
      };
    }
  }
);

const TermsNavigation = createStackNavigator({
  terms: { screen: TermsScreen }
});

const PrivacyPolicyNavigation = createStackNavigator({
  privacyPolicy: { screen: PrivacyPolicyScreen }
});

const DeliveryPartnerAgreementNavigation = createStackNavigator({
  partnerAgreement: { screen: DeliveryPartnerAgreement }
});

const AuthNavigation = createStackNavigator(
  {
    onboarding: { screen: OnboardingScreen },
    starter: StarterNavigation,
    signup: SignupNavigation,
    terms: TermsNavigation,
    privacyPolicy: PrivacyPolicyNavigation,
    partnerAgreement: DeliveryPartnerAgreementNavigation,
    login: LoginNavigation,
    forgot: ForgotNavigation
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "onboarding",
    mode: "card"
  }
);

export default AuthNavigation;
