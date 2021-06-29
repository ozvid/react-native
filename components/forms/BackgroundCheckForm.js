import React from "react";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { Text, HandleButton, TextInput } from "..";
import { required } from "../../utils/validations";

const BackgroundCheckForm = ({
  handleSubmit,
  submitting,
  textButton = "Submit"
}) => {
  return (
    <View style={screenStyles.form}>
      <View style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="Please, enter your Social Security Number for background check."
        />
        <Field
          name="ssn"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="SSN"
          validate={[required]}
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

BackgroundCheckForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  textButton: PropTypes.string
};

export default reduxForm({
  destroyOnUnmount: false
})(BackgroundCheckForm);
