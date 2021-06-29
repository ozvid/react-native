import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import { change } from "redux-form";
import PropTypes from "prop-types";

import { checkCode, resendCode } from "../auth.actions";
import globalStyles from "../../../theme/global-styles";
import CodeForm from "../../../components/forms/CodeForm";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

class SignupCodeScreen extends Component {
  handleSubmit = values => {
    this.props.checkCode(values);
  };

  resendCode = number => {
    this.props.resendCode(number);
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <CodeForm
            onSubmit={this.handleSubmit}
            resendCode={this.resendCode}
            form={FORMS.SIGNUP}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

SignupCodeScreen.propTypes = {
  checkCode: PropTypes.func,
  resendCode: PropTypes.func
};

export default connect(null, {
  checkCode,
  resendCode,
  change
})(withNavigation(SignupCodeScreen));
