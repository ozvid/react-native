import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";

import { changeLoader } from "../../../../components/loading/loading.actions";
import { updateProfile } from "../account.actions";
import globalStyles from "../../../../theme/global-styles";
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { FORMS } from "../../../../constants";
import KeyboardAvoidingView from "../../../../components/KeyboardAvoidingView";

class UpdateCarInfoScreen extends Component {
  handleSubmit = ({ car }) => {
    const { updateProfile, changeLoader } = this.props;
    changeLoader({ visible: true });
    updateProfile({ car });
  };

  render() {
    const { car } = this.props;

    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <KeyboardAvoidingView>
          <CarInfoForm
            onSubmit={this.handleSubmit}
            initialValues={{ car }}
            form={FORMS.UPDATE}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    car: state.account.car
  }),
  {
    updateProfile,
    changeLoader
  }
)(withNavigation(UpdateCarInfoScreen));
