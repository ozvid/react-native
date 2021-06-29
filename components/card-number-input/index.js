import React from "react";
import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { TextInputMask } from "react-native-masked-text";
import globalStyles from "../../theme/global-styles";
import styles from "./index.style";

const CardNumberInput = ({
  viewStyle,
  label,
  style,
  input,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <View style={viewStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ ...styles.inputCard, ...style }}>
        <View style={styles.card}>
          <Entypo name="credit-card" size={26} />
        </View>
        <TextInputMask
          type={"credit-card"}
          {...input}
          {...rest}
          onChangeText={value => input.onChange(value)}
          value={input.value}
          style={styles.input}
        />
      </View>
      {touched && error && (
        <Text style={globalStyles.errorMessage}>{error}</Text>
      )}
    </View>
  );
};

export default CardNumberInput;
