import React from "react";
import { SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../auth.actions";
import LoginForm from "./components/LoginForm";
import globalStyles from "../../../theme/global-styles";
import DismissKeyboardView from "../../../components/DismissKeyboardView";
import IOSKeyboardAvoidingView from "../../../components/IOSKeyboardAvoidingView";

// eslint-disable-next-line no-shadow
const LoginScreen = ({ login }) => {
  const handleSubmit = values => {
    const { password, email } = values;
    login(email, password);
  };

  return (
    <SafeAreaView style={globalStyles.fullContainer}>
      <DismissKeyboardView>
        <IOSKeyboardAvoidingView style={globalStyles.fullContainer}>
          <LoginForm onSubmit={handleSubmit} />
        </IOSKeyboardAvoidingView>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

LoginScreen.propTypes = {
  login: PropTypes.func
};

export default connect(
  state => ({
    status: state.auth.status
  }),
  {
    login
  }
)(withNavigation(LoginScreen));
