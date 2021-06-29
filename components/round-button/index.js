import React from "react";
import { StyleSheet } from "react-native";
import * as screenStyles from "./round-button.styles";
import Button from "../button";
import Text from "../text";
import theme from "../../theme";

const btnCheck = StyleSheet.flatten([
  screenStyles.btnRound,
  screenStyles.btnRoundActive
]);

export default RoundButton = ({ isActive = false, onPress, text }) => {
  return (
    <Button
      style={isActive ? btnCheck : screenStyles.btnRound}
      type="clear"
      onPress={onPress}
    >
      <Text
        size="mediumPlus"
        text={text}
        fontFamily="rubik-bold"
        color={isActive ? theme.colors.white : theme.colors.black}
      />
    </Button>
  );
};
