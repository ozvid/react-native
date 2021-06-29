import React from "react";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { password, required } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";

const PasswordForm = ({ handleSubmit, textButton, submitting }) => {
  return (
    <View style={screenStyles.form}>
      <View style={globalStyles.fullContainer}>
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
          name="password"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="password"
          validate={[required, password]}
          secureTextEntry
        />
      </View>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton={textButton}
        submitting={submitting}
      />
    </View>
  );
};

export default reduxForm({
  destroyOnUnmount: false
})(PasswordForm);
