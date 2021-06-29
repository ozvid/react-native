import React from "react";
import { Field, reduxForm } from "redux-form";
import { View, Image } from "react-native";

import { TextInput, HandleButton, LinkButton } from "../../../../components";
import * as theme from "../../../../theme";
import { email, required } from "../../../../utils/validations";
import styleSheet from "../login.styles";
import { LOGO } from "../../../../constants/images";

const LoginForm = ({ handleSubmit }) => (
  <View style={styleSheet.form}>
    <View style={styleSheet.logoContainer}>
      <Image source={LOGO} style={styleSheet.image} />
    </View>
    <Field
      name="email"
      placeholder="email"
      component={TextInput}
      validate={[required, email]}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <Field
      viewStyle={styleSheet.marginTop20}
      name="password"
      placeholder="password"
      component={TextInput}
      validate={[required]}
      secureTextEntry
    />
    <LinkButton
      text="Forgot your password?"
      to="forgot"
      type="clear"
      style={styleSheet.forgotLink}
    />
    <HandleButton
      style={styleSheet.marginTop20}
      handleSubmit={handleSubmit}
      textButton="Log in"
    />
    <View style={theme.styles.fullContainer} />
  </View>
);

export default reduxForm({ form: "LoginForm" })(LoginForm);
