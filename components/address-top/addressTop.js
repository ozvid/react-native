import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";
import AntDesign from "@expo/vector-icons/AntDesign";

import theme from "../../theme";
import Text from "../text";

const AddressTop = ({ pickupLocation, dropoffLocation, style }) => {
  if (pickupLocation == null) pickupLocation = "...";
  if (dropoffLocation == null) dropoffLocation == null;

  if (_.get(pickupLocation, "length") > 20)
    pickupLocation = `${pickupLocation.slice(0, 18).trim()}...`;
  if (_.get(dropoffLocation, "length") > 20)
    dropoffLocation = `${dropoffLocation.slice(0, 18).trim()}...`;
  return (
    <View
      style={{
        ...screenStyles.blockTextGrey,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}
    >
      <Text
        size="medium"
        text={`${pickupLocation}  `}
        numberOfLines={1}
        color={
          pickupLocation === "Current Location"
            ? theme.colors.aquaMarine
            : theme.colors.black
        }
      />
      <AntDesign name="caretright" colors={theme.colors.black} size={8} />
      <Text size="medium" text={`  ${dropoffLocation}`} numberOfLines={1} />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  blockTextGrey: {
    backgroundColor: theme.colors.veryLightGreyTwo,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginBottom: 20
  }
});

export default AddressTop;
