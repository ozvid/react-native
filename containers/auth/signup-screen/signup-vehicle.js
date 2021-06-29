import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import CarInfoForm from "../../../components/forms/CarInfoForm";
import globalStyles from "../../../theme/global-styles";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

const SignupVehicleScreen = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate("signupBackgroundCheck");
  };
  return (
    <SafeAreaView style={globalStyles.fullContainer}>
      <KeyboardAvoidingView>
        <CarInfoForm onSubmit={handleSubmit} form={FORMS.SIGNUP} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignupVehicleScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(SignupVehicleScreen);
