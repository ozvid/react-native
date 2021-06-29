import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../theme/global-styles";
import EmailForm from "../../../components/forms/EmailForm";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";
import { changeLoader } from "../../../components/loading/loading.actions";
import { email as emailValidate } from "../../../utils/validations";
import { isEmailExists } from "../../../services/firebase";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

// eslint-disable-next-line no-shadow
const SignupEmailScreen = ({ navigation, showAlert, changeLoader }) => {
  const handleSubmit = ({ email }) => {
    changeLoader({ visible: true });
    if (emailValidate(email)) {
      showAlert({ message: emailValidate(email) });
      changeLoader({ visible: false });
      return;
    }
    isEmailExists(email)
      .then(exists =>
        exists
          ? navigation.navigate("signupPassword")
          : showAlert({ message: "This email is already registered" })
      )
      .catch(({ message }) => showAlert({ message }))
      .finally(() => changeLoader({ visible: false }));
  };

  return (
    <SafeAreaView style={globalStyles.fullContainer}>
      <KeyboardAvoidingView>
        <EmailForm
          onSubmit={handleSubmit}
          textButton="Next"
          form={FORMS.SIGNUP}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignupEmailScreen.propTypes = {
  navigation: PropTypes.object,
  showAlert: PropTypes.func,
  changeLoader: PropTypes.func
};

export default connect(null, {
  showAlert,
  changeLoader
})(withNavigation(SignupEmailScreen));
