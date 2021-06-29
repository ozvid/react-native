import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../theme/global-styles";
import DriverLicenseForm from "../../../components/forms/DriverLicenseForm";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

const SignUpDriverLicenseScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView>
      <DriverLicenseForm
        onSubmit={() => navigation.navigate("signupVehicle")}
        form={FORMS.SIGNUP}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

SignUpDriverLicenseScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(SignUpDriverLicenseScreen);
