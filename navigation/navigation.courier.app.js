import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import UpcomingNavigation from "./app/navigation.upcoming";
import OpenRequestNavigation from "./app/navigation.open-request";
import AccountNavigation from "./app/navigation.account";

import colors from "../theme/colors";

const AppNavigation = createBottomTabNavigator(
  {
    upcoming: {
      screen: UpcomingNavigation,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: colors.primary,
          labelStyle: {
            color: colors.black
          }
        },
        tabBarLabel: "Upcoming",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={tintColor}
            size={24}
          />
        )
      })
    },
    openRequest: {
      screen: OpenRequestNavigation,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: colors.primary,
          labelStyle: {
            color: colors.black
          }
        },
        tabBarLabel: "Open Request",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            color={tintColor}
            size={24}
          />
        )
      })
    },
    account: {
      screen: AccountNavigation,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: colors.primary,
          labelStyle: {
            color: colors.black
          }
        },
        tabBarLabel: "Account",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="account-outline"
            color={tintColor}
            size={24}
          />
        )
      })
    }
  },
  {
    initialRouteName: "upcoming"
  }
);

export default AppNavigation;
