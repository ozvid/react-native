import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { Text, HandleButton } from "..";
import CodeInput from "../code-input";
import { colors } from "../../theme";

const styles = {
  cellStyle: {
    borderBottomWidth: 2,
    borderColor: "gray"
  },
  cellStyleFocused: {
    borderColor: "black"
  },
  textStyle: {
    fontSize: 20,
    color: colors.black
  }
};

const CodeForm = ({ handleSubmit, resendCode, submitting, number, code }) => (
  <View style={screenStyles.form}>
    <View style={globalStyles.fullContainer}>
      <Text
        align="center"
        size="exRegular"
        style={screenStyles.title}
        text="What's the 6 digit code?"
      />
      <TouchableOpacity onPress={() => resendCode(number)}>
        <Text
          align="center"
          size="medium"
          style={screenStyles.title_highlight}
          text={`Tap to resend code to ${number}`}
        />
      </TouchableOpacity>
      <Field
        name="code"
        viewStyle={screenStyles.code}
        component={CodeInput}
        keyboardType="numeric"
        codeLength={6}
        cellStyle={styles.cellStyle}
        cellStyleFocused={styles.cellStyleFocused}
        textStyle={styles.textStyle}
      />
    </View>
    <HandleButton
      style={globalStyles.handleSubmitBottom}
      textButton="Next"
      submitting={submitting}
      handleSubmit={handleSubmit}
      disabled={!code || code.length < 6}
    />
  </View>
);

CodeForm.propTypes = {
  handleSubmit: PropTypes.func,
  resendCode: PropTypes.func,
  submitting: PropTypes.bool,
  number: PropTypes.string,
  code: PropTypes.string
};

const Form = reduxForm({
  destroyOnUnmount: false
})(CodeForm);

export default connect((state, props) => ({
  number: formValueSelector(props.form)(state, "number"),
  code: formValueSelector(props.form)(state, "code")
}))(Form);
