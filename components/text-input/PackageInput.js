import React from "react";
import { View, TextInput } from "react-native";
import colors from "../../theme/colors";
import Text from "../text";

import styles from ".";
import globaslStyles from "../../theme/global-styles";

const PackageInput = ({
  label,
  placeholder = "Fits Pick-up Truck",
  placeholderTextColor = colors.warmGrey,
  viewStyle = {},
  input,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 10,
        backgroundColor: colors.veryLightGreyTwo,
        ...viewStyle
      }}
    >
      {label && (
        <View style={{ minWidth: 50 }}>
          <Text size="medium" text={label} color={colors.warmGrey} />
        </View>
      )}
      <TextInput
        {...input}
        {...rest}
        value={input.value}
        style={{
          flex: 1,
          paddingLeft: 10,
          ...styles.paragraph,
          lineHeight: 17,
          textAlignVertical: "top"
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      {touched && error && (
        <Text style={globaslStyles.errorMessage}>{error}</Text>
      )}
    </View>
  );
};

export default PackageInput;
