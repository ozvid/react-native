import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import { checkUpdateCode, resendCode } from "../../../auth/auth.actions";
import globalStyles from "../../../../theme/global-styles";
import CodeForm from "../../../../components/forms/CodeForm";
import { FORMS } from "../../../../constants";
import KeyboardAvoidingView from "../../../../components/KeyboardAvoidingView";

// eslint-disable-next-line no-shadow
const UpdateNumberCodeScreen = ({ checkUpdateCode, resendCode }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <KeyboardAvoidingView>
      <CodeForm
        onSubmit={checkUpdateCode}
        resendCode={resendCode}
        form={FORMS.UPDATE}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
);

UpdateNumberCodeScreen.propTypes = {
  checkUpdateCode: PropTypes.func,
  resendCode: PropTypes.func
};

export default connect(null, {
  checkUpdateCode,
  resendCode
})(withNavigation(UpdateNumberCodeScreen));
