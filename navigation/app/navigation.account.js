import React from "react";
import { createStackNavigator } from "react-navigation";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

import { colors } from "../../theme";
import { COURIER } from "../../constants/roles";
import {
  MyAccountScreen,
  UpdateAccountScreen,
  RequestHistoryScreen,
  UpdateEmailScreen,
  UpdateNameScreen,
  UpdateNumberScreen,
  UpdateNumberCodeScreen,
  UpdateCarInfoScreen,
  ResetPasswordScreen,
  RequestDetailsScreen
} from "../../containers/app/account";

import {
  StartCourierScreen,
  DriverLicenseScreen,
  VehicleScreen,
  BackgroundCheckScreen,
  AvatarScreen,
  AgreeScreen
} from "../../containers/app/account/be-delivery-partner";

import PackageDetailsScreen from "../../containers/app/package-details-screen";
import AddCardScreen from "../../containers/app/add-card-screen";
import PaymentInfoScreen from "../../containers/app/payment-info-screen";
import PackageImageScreen from "../../containers/app/package-image-screen";

import DeliveryPartnerAgreementScreen from "../../containers/delivery-partner-agreement";
import TermsScreen from "../../containers/terms-screen";
import PrivacyPolicyScreen from "../../containers/privacy-policy-screen";

const MainNavigation = createStackNavigator(
  {
    myAccount: MyAccountScreen,
    updateAccount: UpdateAccountScreen,
    updateEmail: UpdateEmailScreen,
    updateName: UpdateNameScreen,
    updateNumber: UpdateNumberScreen,
    updateNumberCode: UpdateNumberCodeScreen,
    updateCarInfo: UpdateCarInfoScreen,
    resetPassword: ResetPasswordScreen,
    paymentInfo: PaymentInfoScreen,
    addCard: AddCardScreen,
    packageDetails: PackageDetailsScreen,
    packageImage: { screen: PackageImageScreen },

    requestHistory: RequestHistoryScreen,
    requestDetail: RequestDetailsScreen,

    terms: { screen: TermsScreen },
    privacyPolicy: { screen: PrivacyPolicyScreen },
    partnerAgreement: { screen: DeliveryPartnerAgreementScreen }
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps: { account } }) => {
      const textColor = account.role === COURIER ? colors.white : colors.black;

      return {
        headerLeft: (
          <View style={{ marginLeft: 15 }}>
            <Entypo
              color={textColor}
              onPress={() => navigation.goBack(null)}
              name="chevron-left"
              size={30}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor:
            account.role === COURIER ? colors.aquaMarine : colors.white
        },
        headerTitleStyle: {
          color: textColor,
          fontFamily: "rubik-bold"
        }
      };
    }
  }
);

export const BeDeliveryPartnerNavigation = createStackNavigator(
  {
    startDeliveryPartner: StartCourierScreen,
    driverLicense: DriverLicenseScreen,
    vehicle: VehicleScreen,
    backgroundCheck: BackgroundCheckScreen,
    avatar: AvatarScreen,
    agree: AgreeScreen,

    terms: { screen: TermsScreen },
    privacyPolicy: { screen: PrivacyPolicyScreen },
    partnerAgreement: { screen: DeliveryPartnerAgreementScreen }
  },
  {
    initialRouteName: "startDeliveryPartner",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <View style={{ marginLeft: 15 }}>
            <Entypo
              color={colors.black}
              onPress={() => navigation.goBack(null)}
              name="chevron-left"
              size={30}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: colors.white
        },
        headerTitleStyle: {
          color: colors.black,
          fontFamily: "rubik-bold"
        }
      };
    }
  }
);

const AccountNavigation = createStackNavigator(
  {
    account: MainNavigation,
    beDeliveryPartner: BeDeliveryPartnerNavigation
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "account",
    mode: "card"
  }
);

export default AccountNavigation;
