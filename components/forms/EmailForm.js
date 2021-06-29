import React from "react";
import { Field, reduxForm } from "redux-form";
import { View, ScrollView } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { email, required, password } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";

const EmailForm = ({
  handleSubmit,
  textButton,
  submitting,
  currentPassword = false,
  form
}) => {
  return (
    <View style={screenStyles.form}>
      <ScrollView style={globalStyles.fullContainer}>
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
          text={"This is email we'll send your receipts."}
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
      </ScrollView>
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
})(EmailForm);
