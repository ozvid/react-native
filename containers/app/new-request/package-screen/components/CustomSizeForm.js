import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View } from "react-native";

import theme from "../../../../../theme";
import { required } from "../../../../../utils/validations";
import {
  SendAsapInputText,
  HandleButton,
  Text,
  DropDown
} from "../../../../../components";
import { packageTypes } from "../../../../../constants";
import { descriptions } from "../../../../../constants/text";

const CUSTOM_DROP_DOWN_OPTIONS = [
  { value: packageTypes.CUSTOM3, label: descriptions[packageTypes.CUSTOM3] }
];

const CustomSizeForm = ({ handleSubmit, submitting }) => {
  return (
    <View
      style={{
        ...theme.styles.fullContainer,
        backgroundColor: theme.colors.content
      }}
    >
      <View style={theme.styles.fullContainer}>
        <View
          style={{
            backgroundColor: theme.colors.white,
            padding: theme.metrics.gutters.medium * 6
          }}
        >
          <Text
            style={{ marginBottom: 20 }}
            text="Customize your package size"
            size="exRegular"
            fontFamily="rubik-bold"
          />
          <Field
            name="length"
            keyboardType="numeric"
            component={SendAsapInputText}
            validate={required}
            label="Length"
            viewStyle={{ marginBottom: 20 }}
          />
          <Field
            name="width"
            keyboardType="numeric"
            component={SendAsapInputText}
            validate={required}
            label="Width"
            viewStyle={{ marginBottom: 20 }}
          />
          <Field
            name="height"
            keyboardType="numeric"
            component={SendAsapInputText}
            validate={required}
            label="Height"
            viewStyle={{ marginBottom: 20 }}
          />
          <Field
            name="packageType"
            component={DropDown}
            validate={required}
            autoCapitalize="none"
            options={CUSTOM_DROP_DOWN_OPTIONS}
            placeholder="Select Package Type"
          />
        </View>
      </View>
      <HandleButton
        style={{
          ...theme.styles.handleSubmitBottom,
          margin: theme.metrics.gutters.medium * 6
        }}
        submitting={submitting}
        handleSubmit={handleSubmit}
        textButton="Done"
      />
    </View>
  );
};

const Form = reduxForm({
  form: "CustomSizeForm"
})(CustomSizeForm);

export default connect()(Form);
