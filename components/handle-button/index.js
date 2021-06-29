import React from "react";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import Button from "../button";
import Text from "../text";

const HandleButton = ({
  handleSubmit,
  textButton,
  style,
  fontFamily = "rubik-bold",
  submitting,
  disabled
}) => (
  <SafeAreaView style={style}>
    <Button
      onPress={handleSubmit}
      type={submitting || disabled ? "disabled" : undefined}
      disabled={submitting || disabled}
    >
      <Text
        size="mediumPlus"
        color={submitting || disabled ? "disabled" : "black"}
        fontFamily={fontFamily}
        text={textButton}
      />
    </Button>
  </SafeAreaView>
);

HandleButton.propTypes = {
  handleSubmit: PropTypes.func,
  textButton: PropTypes.string,
  style: PropTypes.any,
  fontFamily: PropTypes.string,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool
};

export default HandleButton;
