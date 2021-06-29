import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView, View, Image } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../theme/global-styles";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";
import { changeLoader } from "../../../components/loading/loading.actions";
import { HandleButton, Text } from "../../../components";
import screenStyles from "./signup.styles";

// eslint-disable-next-line no-shadow
const SignupTutorialScreen = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate("signupAgree");
  };

  return (
    <SafeAreaView style={globalStyles.fullContainer}>
      <View style={globalStyles.container}>
        <View style={globalStyles.containerV2}>
          <Image
            source={require("../../../assets/images/Graphics/Intro_1.png")}
            style={{ width: 260, height: 198 }}
          />
          <Text
            align="center"
            size="exRegular"
            fontFamily="rubik-bold"
            style={screenStyles.title}
            text="Tutorials on App and Customer Service Importance"
          />
          <Text
            align="center"
            size="medium"
            style={screenStyles.title_highlight}
            text="Picture and text"
          />
        </View>
        <HandleButton
          style={globalStyles.handleSubmitBottom}
          textButton="Next"
          handleSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

SignupTutorialScreen.propTypes = {
  navigation: PropTypes.object
};

export default connect(null, {
  showAlert,
  changeLoader
})(withNavigation(SignupTutorialScreen));
