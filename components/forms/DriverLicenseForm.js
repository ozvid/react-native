import React from "react";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { View, TextInput } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { Text, HandleButton, PicturePicker } from "..";

const validate = values => {
  const errors = {};
  if (!values.driverLicense) {
    errors.driverLicense = "Required";
  }
  return errors;
};

const DriverLicenseForm = ({
  handleSubmit,
  submitting,
  // eslint-disable-next-line no-shadow
  change,
  driverLicense
}) => {
  return (
    <View style={screenStyles.form}>
      <View style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="Upload your driver license"
        />
        <Field
          name="driverLicense"
          component={TextInput}
          type="hidden"
          style={globalStyles.hiddenInput}
        />
        <View style={{ marginTop: 20 }} />
        <PicturePicker
          picture={driverLicense}
          onSelect={filePath => change("driverLicense", filePath)}
        />
      </View>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton="Submit"
        submitting={submitting}
      />
    </View>
  );
};

DriverLicenseForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  change: PropTypes.func,
  driverLicense: PropTypes.string
};

const Form = reduxForm({
  destroyOnUnmount: false,
  validate
})(DriverLicenseForm);

export default connect(
  (state, props) => ({
    driverLicense: formValueSelector(props.form)(state, "driverLicense")
  }),
  {
    change
  }
)(Form);
