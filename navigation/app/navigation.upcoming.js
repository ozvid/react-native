import React from "react";
import { createStackNavigator } from "react-navigation";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";

import styles from "../../theme";
import { COURIER } from "../../constants/roles";

import {
  ListRequestScreen,
  RequestDetailScreen
} from "../../containers/app/upcoming";
import PackageDetailsScreen from "../../containers/app/package-details-screen";
import PackageImageScreen from "../../containers/app/package-image-screen";

const UpcomingNavigation = createStackNavigator(
  {
    list: { screen: ListRequestScreen },
    requestDetail: { screen: RequestDetailScreen },
    packageDetails: { screen: PackageDetailsScreen },
    packageImage: { screen: PackageImageScreen }
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps: { account } }) => {
      const textColor =
        account.role == COURIER ? styles.colors.white : styles.colors.black;

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
            account.role == COURIER
              ? styles.colors.aquaMarine
              : styles.colors.white
        },
        headerTitleStyle: {
          color: textColor,
          fontFamily: "rubik-bold"
        }
      };
    }
  }
);

export default UpcomingNavigation;
