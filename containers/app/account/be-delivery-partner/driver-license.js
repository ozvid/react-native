import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../../theme/global-styles";
import DriverLicenseForm from "../../../../components/forms/DriverLicenseForm";
import { USER_ROLES, FORMS } from "../../../../constants";

const DriverLicenseScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView
      style={globalStyles.fullContainer}
      behavior="padding"
      keyboardVerticalOffset={64}
      enabled
    >
      <DriverLicenseForm
        onSubmit={() => navigation.navigate("vehicle")}
        initialValues={{ role: USER_ROLES.COURIER }}
        form={FORMS.BE_DELIVERY_PARTNER}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

DriverLicenseScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(DriverLicenseScreen);
