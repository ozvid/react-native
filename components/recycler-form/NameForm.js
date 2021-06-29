import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "./recycler-form.styles";
import { required } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";

const NameForm = ({ handleSubmit, textButton, submitting }) => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="What's your name?"
        />
        <Text
          align="center"
          size="medium"
          style={screenStyles.title_highlight}
          text="Your name will appear on the app when the delivery partner gets your request."
        />
        <Field
          name="name"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="Your name"
          validate={required}
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
})(NameForm);

export default connect()(Form);
