import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";

import { changeLoader } from "../../../../components/loading/loading.actions";
import { updateProfile } from "../account.actions";
import globalStyles from "../../../../theme/global-styles";
import NameForm from "../../../../components/forms/NameForm";
import { FORMS } from "../../../../constants";
import KeyboardAvoidingView from "../../../../components/KeyboardAvoidingView";

class UpdateNameScreen extends Component {
  handleSubmit = ({ name }) => {
    const { updateProfile, changeLoader } = this.props;
    changeLoader({ visible: true });
    updateProfile({ username: name });
  };

  render() {
    const { email, name, number } = this.props;

    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <NameForm
            onSubmit={this.handleSubmit}
            textButton="Update Name"
            initialValues={{ email, name, number }}
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
    name: state.account.username,
    number: state.account.phoneNumber
  }),
  {
    updateProfile,
    changeLoader
  }
)(withNavigation(UpdateNameScreen));
