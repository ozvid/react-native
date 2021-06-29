import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../theme/global-styles";
import AvatarForm from "../../../components/forms/AvatarForm";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

// eslint-disable-next-line no-shadow
const SignupAvatarScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView>
      <AvatarForm
        onSubmit={() => navigation.navigate("signupAgree")}
        form={FORMS.SIGNUP}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

SignupAvatarScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(SignupAvatarScreen);
