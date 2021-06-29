import React from "react";
import { View as ReactNativeView } from "react-native";

const Button = props => {
  const { style, children, ...rest } = props;

  let flexStyle = {};
  let restProps = {};

  Object.keys(rest).forEach(key => {
    if (isFlexStyle[key]) {
      flexStyle[key] = rest[key];
    } else {
      restProps[key] = rest[key];
    }
  });

  const computedStyle = {
    ...flexStyle,
    ...style
  };
  return (
    <ReactNativeView style={computedStyle} {...restProps}>
      {children}
    </ReactNativeView>
  );
};

Button.defaultProps = {
  style: {},
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: "center"
};

export default Button;

const isFlexStyle = {
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  aspectRatio: true,
  borderBottomWidth: true,
  borderEndWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStartWidth: true,
  borderTopWidth: true,
  borderWidth: true,
  bottom: true,
  display: true,
  end: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
  height: true,
  justifyContent: true,
  left: true,
  margin: true,
  marginBottom: true,
  marginEnd: true,
  marginHorizontal: true,
  marginLeft: true,
  marginRight: true,
  marginStart: true,
  marginTop: true,
  marginVertical: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  overflow: true,
  padding: true,
  paddingBottom: true,
  paddingEnd: true,
  paddingHorizontal: true,
  paddingLeft: true,
  paddingRight: true,
  paddingStart: true,
  paddingTop: true,
  paddingVertical: true,
  position: true,
  right: true,
  start: true,
  top: true,
  width: true,
  zIndex: true
};
