import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { View, Image, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";

import colors from "../../../theme/colors";
import globalStyles from "../../../theme/global-styles";
import screenStyles from "./signup.styles";
import { Text, HandleButton } from "../../../components";
import * as images from "../../../constants/images";

class SignupGpsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{ marginLeft: 15 }}>
          <Ionicons
            color={colors.black}
            onPress={() => navigation.navigate("clientAuthenticated")}
            name="md-close"
            size={30}
          />
        </View>
      )
    };
  };

  handleSubmit = () => {
    const { navigation } = this.props;
    Permissions.askAsync(Permissions.LOCATION).finally(() =>
      navigation.navigate("loading")
    );
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <View style={globalStyles.container}>
          <View style={globalStyles.containerV2}>
            <Image
              source={images.LOCATION}
              style={{ width: 204, height: 230 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={screenStyles.title}
              text="Enable location to track you pickup place"
            />
            <Text
              align="center"
              size="medium"
              style={screenStyles.title_highlight}
              text="Your location will be used to help track the pickup place and match the nearest delivery partner."
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

export default connect(null)(withNavigation(SignupGpsScreen));
