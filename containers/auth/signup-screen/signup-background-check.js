import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../theme/global-styles";
import BackgroundCheckForm from "../../../components/forms/BackgroundCheckForm";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

const SignupBackgroundCheckScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView>
      <BackgroundCheckForm
        onSubmit={() => navigation.navigate("signupAvatar")}
        form={FORMS.SIGNUP}
        textButton="Next"
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

SignupBackgroundCheckScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(SignupBackgroundCheckScreen);
