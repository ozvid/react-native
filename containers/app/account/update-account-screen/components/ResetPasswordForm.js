import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../../../theme/global-styles";
import screenStyles from "../../../../../components/forms/form.styles";
import { password, required } from "../../../../../utils/validations";
import { Text, TextInput, HandleButton } from "../../../../../components";

const ResetPasswordForm = ({ handleSubmit, submitting }) => {
  return (
    <View style={globalStyles.container}>
      <ScrollView style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="What's your password?"
        />
        <Text
          align="center"
          size="medium"
          style={screenStyles.title_highlight}
          text="Please provide a password of at least 8 characters."
        />
        <Field
          name="currentPassword"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="Current password"
          validate={[required]}
          secureTextEntry
        />
        <Field
          name="password"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="New password"
          validate={[required, password]}
          secureTextEntry
        />
      </ScrollView>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton="Change Password"
        submitting={submitting}
      />
    </View>
  );
};

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

const Form = reduxForm({
  form: "reset-password"
})(ResetPasswordForm);

export default connect()(Form);
