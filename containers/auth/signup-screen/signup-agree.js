import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import { signUp } from "../auth.actions";
import globalStyles from "../../../theme/global-styles";
import AgreeForm from "../../../components/forms/AgreeForm";
import { FORMS } from "../../../constants";

// eslint-disable-next-line no-shadow
const SignupAgreeScreen = ({ signUp, navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <AgreeForm onSubmit={signUp} navigation={navigation} form={FORMS.SIGNUP} />
  </SafeAreaView>
);

SignupAgreeScreen.propTypes = {
  signUp: PropTypes.func,
  navigation: PropTypes.object
};

export default connect(null, {
  signUp
})(withNavigation(SignupAgreeScreen));
