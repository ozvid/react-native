import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import { sendUpdateCode } from "../../../auth/auth.actions";
import globalStyles from "../../../../theme/global-styles";
import NumberForm from "../../../../components/forms/NumberForm";
import { FORMS } from "../../../../constants";
import KeyboardAvoidingView from "../../../../components/KeyboardAvoidingView";

// eslint-disable-next-line no-shadow
const UpdateNumberScreen = ({ sendUpdateCode, number }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView>
      <NumberForm
        // eslint-disable-next-line no-shadow
        onSubmit={({ number }) => sendUpdateCode(number)}
        textButton="Update Number"
        initialValues={{ number }}
        form={FORMS.UPDATE}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

UpdateNumberScreen.propTypes = {
  sendUpdateCode: PropTypes.func,
  number: PropTypes.string
};

export default connect(
  state => ({
    email: state.account.email,
    name: state.account.displayName,
    number: state.account.phoneNumber
  }),
  {
    sendUpdateCode
  }
)(withNavigation(UpdateNumberScreen));
