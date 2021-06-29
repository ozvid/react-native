import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../../theme/global-styles";
import BackgroundCheckForm from "../../../../components/forms/BackgroundCheckForm";
import { FORMS } from "../../../../constants";

const BackgroundCheckScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView
      style={globalStyles.fullContainer}
      behavior="padding"
      keyboardVerticalOffset={64}
      enabled
    >
      <BackgroundCheckForm
        onSubmit={() => navigation.navigate("avatar")}
        form={FORMS.BE_DELIVERY_PARTNER}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

BackgroundCheckScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(BackgroundCheckScreen);
