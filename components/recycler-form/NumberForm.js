import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "./recycler-form.styles";
import { required, phoneNumber } from "../../utils/validations";
import { Text, SelectCodeCountryInput, HandleButton } from "..";

const NumberForm = ({ handleSubmit, textButton, submitting }) => {
  return (
    <View style={globalStyles.container}>
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(NumberForm);

export default connect()(Form);
