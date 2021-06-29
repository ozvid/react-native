import React from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../../theme/global-styles";
import AvatarForm from "../../../../components/forms/AvatarForm";
import { FORMS } from "../../../../constants";

const AvatarScreen = ({ navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView
      style={globalStyles.fullContainer}
      behavior="padding"
      keyboardVerticalOffset={64}
      enabled
    >
      <AvatarForm
        onSubmit={() => navigation.navigate("agree")}
        form={FORMS.BE_DELIVERY_PARTNER}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

AvatarScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(AvatarScreen);
