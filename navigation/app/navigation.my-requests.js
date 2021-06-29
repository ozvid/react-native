import React from "react";
import { createStackNavigator } from "react-navigation";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

import styles, { colors } from "../../theme";

import { Text, LinkButton } from "../../components";
import MyRequestsScreen from "../../containers/app/my-requests/my-requests-screen";
import PastRequestScreen from "../../containers/app/my-requests/past-request-screen";
import PackageDetailsScreen from "../../containers/app/package-details-screen";
import PackageImageScreen from "../../containers/app/package-image-screen";
import RequestScreen from "../../containers/app/my-requests/request-screen";
import CancelOrderScreen from "../../containers/app/my-requests/cancel-order-screen";
import SelectCancelTypeScreen from "../../containers/app/my-requests/cancel-type-screen";
import CancelOtherNotesScreen from "../../containers/app/my-requests/cancel-other-notes-screen";

const MyRequestsNavigation = createStackNavigator(
  {
    myRequestsList: { screen: MyRequestsScreen },
    pastRequest: { screen: PastRequestScreen },
    packageDetails: { screen: PackageDetailsScreen },
    packageImage: { screen: PackageImageScreen },
    request: { screen: RequestScreen },
    cancelOrder: { screen: CancelOrderScreen },
    selectCancelType: { screen: SelectCancelTypeScreen },
    cancelOtherNotes: { screen: CancelOtherNotesScreen }
  },
  {
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
          backgroundColor: styles.colors.white
        },
        headerTitleStyle: {
          color: styles.colors.black,
          fontFamily: "rubik-bold"
        }
      };
    }
  }
);

export default MyRequestsNavigation;
