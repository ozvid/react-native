import React from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { Text, HandleButton, PicturePicker, SendAsapInputText } from "..";
import { required } from "../../utils/validations";

const validate = values => {
  const errors = {};
  if (!values.avatar) {
    errors.avatar = "Required";
  }
  return errors;
};

const AvatarForm = ({ handleSubmit, submitting, change, avatar }) => {
  return (
    <View style={screenStyles.form}>
      <ScrollView style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="Upload your profile picture"
        />
        <Field
          name="avatar"
          component={TextInput}
          type="hidden"
          style={globalStyles.hiddenInput}
          validate={required}
        />
        <View style={{ marginTop: 20, marginBottom: 10 }} />
        <PicturePicker
          picture={avatar}
          onSelect={filePath => change("avatar", filePath)}
        />
        <Text
          style={{ marginBottom: 10 }}
          align="left"
          text="Please Tell Us About Yourself."
          size="medium"
        />
        <Field
          name="bio"
          component={SendAsapInputText}
          viewStyle={{ marginBottom: 20, maxHeight: 200 }}
          placeholder="I am..."
          editable
          maxLength={140}
          multiline
          numberOfLines={8}
          validate={required}
        />
      </ScrollView>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton="Submit"
        submitting={submitting}
      />
    </View>
  );
};

AvatarForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  change: PropTypes.func,
  avatar: PropTypes.string
};

const Form = reduxForm({
  destroyOnUnmount: false,
  validate
})(AvatarForm);

export default connect((state, props) => ({
  avatar: formValueSelector(props.form)(state, "avatar")
}))(Form);
