import React, { Component } from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import { signUp } from "../auth.actions";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";
import globalStyles from "../../../theme/global-styles";
import PasswordForm from "../../../components/forms/PasswordForm";
import { USER_ROLES, FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

class SignupPasswordScreen extends Component {
  handleSubmit = ({ password }) => {
    // eslint-disable-next-line no-shadow
    const { role, showAlert } = this.props;
    if (password.length < 8) {
      showAlert({
        message: "Password must be at least 8 characters"
      });
      return;
    }
    this.props.navigation.navigate(
      role === USER_ROLES.CLIENT ? "signupAgree" : "signupDriverLicense"
    );
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <PasswordForm
            onSubmit={this.handleSubmit}
            textButton="Next"
            form={FORMS.SIGNUP}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

SignupPasswordScreen.propTypes = {
  role: PropTypes.string,
  showAlert: PropTypes.func,
  navigation: PropTypes.object
};

export default connect(
  state => ({
    role: formValueSelector(FORMS.SIGNUP)(state, "role")
  }),
  {
    signUp,
    showAlert
  }
)(withNavigation(SignupPasswordScreen));
