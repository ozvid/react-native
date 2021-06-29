import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../theme/global-styles";
import NameForm from "../../../components/forms/NameForm";
import { FORMS } from "../../../constants";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

class SignupNameScreen extends Component {
  handleSubmit = () => {
    this.props.navigation.navigate("signupEmail");
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <NameForm
            onSubmit={this.handleSubmit}
            textButton="Next"
            form={FORMS.SIGNUP}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

SignupNameScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(SignupNameScreen);
