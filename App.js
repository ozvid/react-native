import React from "react";
import { Platform, StatusBar, View } from "react-native";
import AppLoading from "expo-app-loading";
import { Notifications } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as Icons from "@expo/vector-icons";
import { decode, encode } from "base-64";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ConfigureStore from "./store";
import { styles } from "./theme";

import NavWrapper from "./NavWrapper";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const { store, persistor } = ConfigureStore;

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  handleNotification = notification => {
    console.log(notification);
  };

  renderApp = () => {
    return (
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.fullContainer}>
            {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
            <NavWrapper />
          </View>
        </PersistGate>
      </ReduxProvider>
    );
  };

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // Load image assets here.
        require("./assets/images/avatar.png")
      ]),
      Font.loadAsync({
        // Load font assets here.
        ...Icons.Ionicons.font,
        Rubik: require("./assets/fonts/Rubik-Regular.ttf"),
        rubik: require("./assets/fonts/Rubik-Regular.ttf"),
        "rubik-bold": require("./assets/fonts/Rubik-Bold.ttf")
      })
    ]);
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry

    console.error(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return this.renderApp();
  }
}
