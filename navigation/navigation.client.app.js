import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NewRequestNavigation from "./app/navigation.new-request";
import MyRequestsNavigation from "./app/navigation.my-requests";
import AccountNavigation from "./app/navigation.account";

import colors from "../theme/colors";

const AppNavigation = createBottomTabNavigator(
  {
    newRequest: {
      screen: NewRequestNavigation,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: "New Request",
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={tintColor}
              size={24}
            />
          )
        };
      }
    },
    myRequests: {
      screen: MyRequestsNavigation,
      navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        if (navigation.state.index > 1) {
          tabBarVisible = false;
        }
        return {
          tabBarVisible,
          tabBarLabel: "My Requests",
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={tintColor}
              size={24}
            />
          )
        };
      }
    },
    account: {
      screen: AccountNavigation,
      navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        }
        return {
          tabBarVisible,
          tabBarLabel: "Account",
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={tintColor}
              size={24}
            />
          )
        };
      }
    }
  },
  {
    initialRouteName: "newRequest",
    defaultNavigationOptions: {
      headerTintColor: colors.black,
      headerBackTitle: null,
      headerStyle: {
        borderBottomColor: "transparent"
      }
    },
    tabBarOptions: {
      activeTintColor: colors.primary,
      labelStyle: {
        color: colors.black
      },
      indicatorStyle: { backgroundColor: "transparent" }
    }
  }
);

export default AppNavigation;
