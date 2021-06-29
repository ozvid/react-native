import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";

import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import { changeLoader } from "../../../../components/loading/loading.actions";
import { firebaseService } from "../../../../services";
import globalStyles from "../../../../theme/global-styles";
import EmailForm from "../../../../components/forms/EmailForm";
import { updateProfile } from "../account.actions";
import { FORMS } from "../../../../constants";
import KeyboardAvoidingView from "../../../../components/KeyboardAvoidingView";

class UpdateEmailScreen extends Component {
  handleSubmit = ({ email, currentPassword }) => {
    const { updateProfile, changeLoader, showAlert } = this.props;
    changeLoader({ visible: true });
    firebaseService
      .reauthenticate(currentPassword)
      .then(() =>
        firebaseService.updateEmail(email).then(() => {
          updateProfile({ email });
        })
      )
      .catch(({ message }) => {
        changeLoader({ visible: false });
        showAlert({ message });
      });
  };

  render() {
    const { email, name, number } = this.props;

    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <EmailForm
            onSubmit={this.handleSubmit}
            textButton="Update Email"
            initialValues={{ email, name, number }}
            currentPassword
            form={FORMS.UPDATE}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    email: state.account.email,
    name: state.account.displayName,
    number: state.account.phoneNumber
  }),
  {
    updateProfile,
    changeLoader,
    showAlert
  }
)(withNavigation(UpdateEmailScreen));
