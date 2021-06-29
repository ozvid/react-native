import React from "react";
import { View, TextInput as RNTextInput, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./text-input.styles";
import globalStyles from "../../theme/global-styles";

const TextInput = ({
  viewStyle,
  label,
  style,
  input,
  meta: { touched, error },
  ...rest
}) => (
  <View style={viewStyle}>
    {label && <Text style={styles.label}>{label}</Text>}
    <RNTextInput style={[styles.inputBox, style]} {...input} {...rest} />
    {touched && error && <Text style={globalStyles.errorMessage}>{error}</Text>}
  </View>
);

TextInput.propTypes = {
  viewStyle: PropTypes.object,
  label: PropTypes.string,
  style: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  })
};

export default TextInput;
