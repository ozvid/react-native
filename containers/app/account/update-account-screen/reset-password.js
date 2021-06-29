import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import { changeLoader } from "../../../../components/loading/loading.actions";
import { firebaseService } from "../../../../services";
import globalStyles from "../../../../theme/global-styles";
import ResetPasswordForm from "./components/ResetPasswordForm";
import KeyboardAvoidingView from "../../../../components/KeyboardAvoidingView";

class ResetPasswordScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: "Change Password"
    };
  };

  handleSubmit = ({ password, currentPassword }) => {
    // eslint-disable-next-line no-shadow
    const { navigation, changeLoader, showAlert } = this.props;
    changeLoader({ visible: true });
    firebaseService
      .reauthenticate(currentPassword)
      .then(() =>
        firebaseService.updatePassword(password).then(() => {
          navigation.goBack();
          showAlert({ message: "Password was successfully changed" });
        })
      )
      .catch(({ message }) => showAlert({ message }))
      .finally(() => changeLoader({ visible: false }));
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <ResetPasswordForm onSubmit={this.handleSubmit} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

ResetPasswordScreen.propTypes = {
  navigation: PropTypes.object,
  changeLoader: PropTypes.func,
  showAlert: PropTypes.func
};

export default connect(null, {
  changeLoader,
  showAlert
})(withNavigation(ResetPasswordScreen));
