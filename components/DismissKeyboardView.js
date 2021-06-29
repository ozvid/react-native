import React from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    style={{ flex: 1 }}
    onPress={() => Keyboard.dismiss()}
  >
    <View style={{ flex: 1 }}>{children}</View>
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
