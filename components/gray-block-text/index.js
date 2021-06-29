import React from "react";
import { View } from "react-native";
import { colors } from "../../theme";
import Text from "../text";

export default GrayBlockText = ({ children, text, style }) => {
  return (
    <View
      style={{
        ...screenStyles.blockTextGrey,
        ...style
      }}
    >
      {text ? <Text text={text} size="medium" /> : children}
    </View>
  );
};

const screenStyles = {
  blockTextGrey: {
    backgroundColor: colors.veryLightGreyTwo,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 5,
    marginBottom: 10
  }
};
