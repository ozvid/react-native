import { StyleSheet } from "react-native";

import { colors } from "../../../../theme";

export default StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 30
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderColor: colors.veryLightGreyTwo,
    borderTopWidth: 1
  },
  rateContainerInner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
