import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "./recycler-form.styles";
import { email, required, password } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";

const EmailForm = ({
  handleSubmit,
  textButton,
  submitting,
  currentPassword = false
}) => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="What's your email address?"
        />
        <Text
          align="center"
          size="medium"
          style={screenStyles.title_highlight}
          text="This is email we'll send your receipts?"
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
        {currentPassword && (
          <Field
            name="currentPassword"
            component={TextInput}
            viewStyle={screenStyles.boxTopI}
            placeholder="Current password"
            validate={[required, password]}
            secureTextEntry
          />
        )}
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

const Form = reduxForm({
  form: "recycler-form",
  forceUnregisterOnUnmount: true
})(EmailForm);

export default connect()(Form);
