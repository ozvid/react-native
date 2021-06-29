import React from "react";
import { SafeAreaView } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { forgotPassword } from "../auth.actions";
import { styles } from "../../../theme";
import ForgotForm from "./components/ForgotForm";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";

class ForgotScreen extends React.Component {
  handleSubmit = ({ email }) => {
    this.props.forgotPassword(email);
  };

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <KeyboardAvoidingView>
          <ForgotForm onSubmit={this.handleSubmit} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

ForgotScreen.propTypes = {
  forgotPassword: PropTypes.func
};

export default connect(
  state => ({
    status: state.auth.status
  }),
  {
    forgotPassword
  }
)(withNavigation(ForgotScreen));
