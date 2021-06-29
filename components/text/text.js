import React from "react";
import { Text as ReactNativeText } from "react-native";
import { sizePresets, alignPresets, colorPresets } from "./text.presets";
import { fonts } from "../../theme";

/**
 * For your text displaying needs.
 */
const Text = props => {
  // grab the props
  const {
    size = "default",
    align = "default",
    color = "default",
    text,
    children,
    fontFamily,
    style = {},
    ...rest
  } = props;

  // figure out which content to use
  const content = text || children;

  // assemble the style
  const sizePresetToUse = sizePresets[size] || sizePresets.default;
  const alignPresetToUse = alignPresets[align] || alignPresets.default;
  const colorPresetToUse =
    colorPresets[color] || (color ? { color } : colorPresets.default);
  const styleOverride = {
    ...sizePresetToUse,
    ...alignPresetToUse,
    ...colorPresetToUse,
    lineHeight: 21,
    ...style,
    fontFamily: fontFamily || fonts.rubik
  };

  return (
    <ReactNativeText style={styleOverride} {...rest}>
      {content}
    </ReactNativeText>
  );
};

export default Text;
