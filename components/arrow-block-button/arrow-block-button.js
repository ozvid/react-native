import React from "react";
import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { withNavigation } from "react-navigation";

import * as componentStyles from "./arrow-block-button.styles";
import Button from "../button";
import Text from "../text";
import theme, { colors } from "../../theme";

const ArrowBlockButton = ({
  to,
  text,
  type,
  style,
  params,
  onPress,
  textType,
  rightSide,
  navigation
}) => {
  return (
    <Button
      type="clear"
      style={{
        ...componentStyles.blockButton,
        ...style
      }}
      onPress={to ? () => navigation.navigate(to, params) : onPress}
      disabled={!onPress && !to}
    >
      <View>
        <Text
          size="medium"
          align="left"
          text={text}
          style={{
            color: type === "disabled" ? colors.warmGrey : colors.black
          }}
          fontFamily={
            type !== "clear" && textType !== "clear" ? "rubik-bold" : "rubik"
          }
        />
      </View>
      {rightSide
        ? rightSide
        : type !== "disabled" &&
          type !== "clear" && (
            <Feather
              name="chevron-right"
              size={23}
              color={theme.colors.black}
            />
          )}
    </Button>
  );
};

export default withNavigation(ArrowBlockButton);
