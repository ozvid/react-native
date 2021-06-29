import React from "react";
import { connect } from "react-redux";
import { SafeAreaView, ActivityIndicator, Platform } from "react-native";
import Constants from "expo-constants";

import { FlexView, Text } from "../../components";
import { getProfile } from "../app/account/account.actions";
import theme from "../../theme";
import { firebaseService } from "../../services";
import { registerForPushNotificationsAsync } from "../../services/utils";

class LoadingScreen extends React.Component {
  componentDidMount() {
    const { getProfile, navigation } = this.props;
    firebaseService
      .onAuthStateChanged()
      .then(user => {
        getProfile();
        if (Platform.OS === "android" && !Constants.isDevice) return;
        registerForPushNotificationsAsync(user.uid);
      })
      .catch(() => navigation.navigate("unAuthenticated"));
  }

  render() {
    return (
      <SafeAreaView style={theme.styles.fullContainer}>
        <FlexView flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </FlexView>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  {
    getProfile
  }
)(LoadingScreen);
