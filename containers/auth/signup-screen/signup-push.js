import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { View, Image, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../../theme/colors";
import globalStyles from "../../../theme/global-styles";
import screenStyles from "./signup.styles";
import { Text, HandleButton } from "../../../components";
import * as images from "../../../constants/images";
import { registerForPushNotificationsAsync } from "../../../services/utils";

class SignupPushScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{ marginLeft: 15 }}>
          <Ionicons
            color={colors.black}
            onPress={() => navigation.navigate("signupGps")}
            name="md-close"
            size={30}
          />
        </View>
      )
    };
  };

  handleSubmit = () => {
    const { navigation, uid } = this.props;
    registerForPushNotificationsAsync(uid).finally(() =>
      navigation.navigate("signupGps")
    );
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <View style={globalStyles.container}>
          <View style={globalStyles.containerV2}>
            <Image
              source={images.NOTIFICATION}
              style={{ width: 219, height: 230 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={screenStyles.title}
              text="Track your order with push notifications"
            />
            <Text
              align="center"
              size="medium"
              style={screenStyles.title_highlight}
              text="Get updates on your delivery partner's status through push notifications."
            />
          </View>
          <HandleButton
            style={globalStyles.handleSubmitBottom}
            handleSubmit={this.handleSubmit}
            textButton="Allow"
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  uid: state.account.uid
}))(withNavigation(SignupPushScreen));
