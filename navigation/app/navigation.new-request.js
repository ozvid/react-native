import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Entypo } from "@expo/vector-icons";

import colors from "../../theme/colors";

import {
  DeliverySummaryScreen,
  NewPackageScreen,
  CustomSizeScreen,
  NewDescriptionScreen,
  NewConfirmationScreen,
  CheckoutScreen,
  DeliveryRequestDetailsScreen
} from "../../containers/app/new-request";
import PackageDetailsScreen from "../../containers/app/package-details-screen";

import AddCardScreen from "../../containers/app/add-card-screen";
import PaymentInfoScreen from "../../containers/app/payment-info-screen";
import PackageImageScreen from "../../containers/app/package-image-screen";

const NewRequestNavigation = createStackNavigator(
  {
    deliveryRequestDetails: { screen: DeliveryRequestDetailsScreen },
    deliverySummary: { screen: DeliverySummaryScreen },
    newPackage: { screen: NewPackageScreen },
    customSize: { screen: CustomSizeScreen },
    newDescription: { screen: NewDescriptionScreen },
    newConfirmation: { screen: NewConfirmationScreen },
    packageDetails: { screen: PackageDetailsScreen },
    packageImage: { screen: PackageImageScreen },
    checkout: { screen: CheckoutScreen },
    paymentInfo: PaymentInfoScreen,
    addCard: AddCardScreen
  },
  {
    initialRouteName: "deliverySummary",
    defaultNavigationOptions: ({ navigation }) => ({
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
      tabBarVisible: false,
      headerTintColor: colors.black,
      headerBackTitle: null,
      headerStyle: {
        borderBottomColor: "transparent"
      }
    })
  }
);

export default NewRequestNavigation;
