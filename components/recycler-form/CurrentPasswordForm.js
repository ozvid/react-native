import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import globalStyles from "../../theme/global-styles";
import screenStyles from "./recycler-form.styles";
import { password, required } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";

class CurrentPasswordForm extends Component {
  render() {
    const { handleSubmit, textButton, submitting } = this.props;

    return (
      <View style={globalStyles.container}>
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
            name="currentPassword"
            component={TextInput}
            viewStyle={screenStyles.boxTopI}
            placeholder="Current password"
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
  }
}

const Form = reduxForm({
  form: "recycler-form",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CurrentPasswordForm);

export default connect()(Form);
