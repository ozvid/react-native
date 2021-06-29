import React from "react";
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform
} from "react-native";
import globalStyles from "../theme/global-styles";

const KeyboardAvoidingView = ({ children }) => (
  <RNKeyboardAvoidingView
    style={globalStyles.fullContainer}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    keyboardVerticalOffset={64}
    enabled
  >
    {children}
  </RNKeyboardAvoidingView>
);

export default KeyboardAvoidingView;
