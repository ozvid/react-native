import React from "react";
import { View } from "react-native";

export default Spacer = ({ flex, children, ...rest }) => (
  <View {...rest} flex={!!flex ? flex : 1}>
    {children}
  </View>
);
