import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import { sendCode } from "../auth.actions";
import globalStyles from "../../../theme/global-styles";
import NumberForm from "../../../components/forms/NumberForm";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

// eslint-disable-next-line no-shadow
const SignupNumberScreen = ({ sendCode, navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView>
      <NumberForm
        initialValues={{
          role: navigation.getParam("role", "client"),
          isBusiness: false
        }}
        onSubmit={({ number }) => sendCode(number)}
        submitting={false}
        textButton="Next"
        form={FORMS.SIGNUP}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

SignupNumberScreen.propTypes = {
  sendCode: PropTypes.func,
  navigation: PropTypes.object
};

export default connect(null, { sendCode })(withNavigation(SignupNumberScreen));
