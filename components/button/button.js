import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./button.styles";
import Text from "../text";

const Button = ({
  type = "primary",
  style = {},
  text,
  textStyle = {},
  children,
  ...rest
}) => (
  <TouchableOpacity style={{ ...styles[type].btn, ...style }} {...rest}>
    {children}
    {!!text && (
      <Text style={{ ...styles[type].text, ...textStyle }}>{text}</Text>
    )}
  </TouchableOpacity>
);

export default Button;
