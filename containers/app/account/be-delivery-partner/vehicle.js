import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";

import CarInfoForm from "../../../../components/forms/CarInfoForm";
import globalStyles from "../../../../theme/global-styles";
import { FORMS } from "../../../../constants";

const VehicleScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView
      style={globalStyles.fullContainer}
      behavior="padding"
      keyboardVerticalOffset={64}
      enabled
    >
      <CarInfoForm
        onSubmit={() => navigation.navigate("backgroundCheck")}
        form={FORMS.BE_DELIVERY_PARTNER}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

VehicleScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(VehicleScreen);
