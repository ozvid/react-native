import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import globalStyles from "../../theme/global-styles";
import screenStyles from "./recycler-form.styles";
import { Text, HandleButton, CodeInput } from "..";

const CodeForm = ({
  handleSubmit,
  resendCode,
  onFullFill,
  submitting,
  number
}) => {
  return (
    <View style={globalStyles.container}>
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
          viewStyle={{
            marginTop: 40,
            justifyContent: "center",
            aliginItems: "center"
          }}
          component={CodeInput}
          keyboardType="numeric"
          className={"border-b"}
          space={6}
          codeLength={6}
          size={40}
          inputPosition="center"
          onFulfill={code =>
            onFullFill({
              code: code,
              number: number
            })
          }
          activeColor="#222"
          inactiveColor="#222"
        />
      </View>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        // handleSubmit={handleSubmit}
        textButton="Next"
        submitting={submitting}
      />
    </View>
  );
};

const selector = formValueSelector("recycler-form");

const Form = reduxForm({
  form: "recycler-form",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CodeForm);

export default connect(state => ({
  number: selector(state, "number")
}))(Form);
