import React from "react";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { required, phoneNumber } from "../../utils/validations";
import { Text, SelectCodeCountryInput, HandleButton } from "..";

const NumberForm = ({ handleSubmit, textButton, submitting }) => (
  <View style={screenStyles.form}>
    <View style={globalStyles.fullContainer}>
      <Text
        align="center"
        size="exRegular"
        style={screenStyles.title}
        text="What's your phone number?"
      />
      <Text
        align="center"
        size="medium"
        style={screenStyles.title_highlight}
        text="We'll send you verification code to your phone via text message."
      />
      <Field
        name="number"
        placeholder="Phone number"
        viewStyle={screenStyles.boxTopI}
        component={SelectCodeCountryInput}
        validate={[required, phoneNumber]}
        parse={value => value.replace(/ /g, "")}
        keyboardType="numeric"
      />
    </View>
    <HandleButton
      handleSubmit={handleSubmit}
      textButton={textButton}
      submitting={submitting}
    />
  </View>
);

export default reduxForm({
  destroyOnUnmount: false
})(NumberForm);
