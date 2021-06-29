import React from "react";
import { View, Text, TextInput } from "react-native";
import colors from "../../theme/colors";
import fonts from "../../constants/fonts";

function SendAsapTextInput(props) {
  const {
    label = "Label",
    placeholder = "Placeholder",
    placeholderTextColor = colors.warmGrey,
    style = {}
  } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 10,
        backgroundColor: colors.veryLightGreyTwo,
        ...style
      }}
    >
      <View
        style={{ minWidth: 30, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ ...fonts.textInputPlaceholder, color: colors.warmGrey }}>
          {label}
        </Text>
      </View>
      <TextInput
        {...props}
        style={{ flex: 1, paddingLeft: 10, ...fonts.paragraph, lineHeight: 17 }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

export default SendAsapTextInput;
