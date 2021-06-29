import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { widthPercentageToDP } from "../../theme/metrics";

export const btnRound = {
  margin: widthPercentageToDP("4%"),
  width: 100,
  height: 100,
  backgroundColor: colors.veryLightGreyTwo,
  borderRadius: 50,
  alignItems: "center",
  justifyContent: "center"
};

export const btnRoundActive = {
  backgroundColor: colors.aquaMarine
};
