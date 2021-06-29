import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import CodeInput from "react-native-smooth-pincode-input";
import styles from "../text-input/text-input.styles";

const MCodeInput = ({ viewStyle, label, input, ...rest }) => (
  <View style={viewStyle}>
    {label && <Text style={styles.label}>{label}</Text>}
    <CodeInput value={input.value} onTextChange={input.onChange} {...rest} />
  </View>
);

MCodeInput.propTypes = {
  viewStyle: PropTypes.object,
  label: PropTypes.string,
  input: PropTypes.object
};

export default MCodeInput;
