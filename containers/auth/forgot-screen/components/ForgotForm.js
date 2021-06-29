import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../../theme/global-styles";
import screenStyles from "../forgot.styles";
import { required, email } from "../../../../utils/validations";
import { Text, TextInput, HandleButton } from "../../../../components";

const ForgotForm = ({ handleSubmit }) => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="Forgot your password?"
        />
        <Text
          align="center"
          size="medium"
          style={screenStyles.title_highlight}
          text="Don't worry. Tell us the email address you registered to reset your password."
        />
        <Field
          name="email"
          viewStyle={screenStyles.boxTopI}
          component={TextInput}
          placeholder="Your email"
          validate={[required, email]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton="Send"
      />
    </View>
  );
};

ForgotForm.propTypes = {
  handleSubmit: PropTypes.func
};

const Form = reduxForm({
  form: "ForgotForm"
})(ForgotForm);

export default connect()(Form);
