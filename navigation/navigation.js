import { FluidNavigator } from "react-navigation-fluid-transitions";

import LoadingScreen from "../containers/loading-screen";
import AuthNavigation from "./navigation.auth";
import AppClientNavigation from "./navigation.client.app";
import DeliveryRequestDetailsScreen from "../containers/app/new-request/delivery-request-details";
import AppCourierNavigation from "./navigation.courier.app";

import PackageDetailsScreen from "../containers/app/package-details-screen";
import PackageImageScreen from "../containers/app/package-image-screen";
import { createSwitchNavigator } from "react-navigation";

const Navigation = createSwitchNavigator(
  {
    loading: { screen: LoadingScreen },
    unAuthenticated: AuthNavigation,
    clientAuthenticated: AppClientNavigation,
    courierAuthenticated: AppCourierNavigation
  },
  {
    initialRouteName: "loading",
    mode: "card",
    resetOnBlur: true,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

export default Navigation;
