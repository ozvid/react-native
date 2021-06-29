import { StyleSheet } from "react-native";

import colors from "../../../theme/colors";
import { widthPercentageToDP } from "../../../theme/metrics";
import theme from "../../../theme";

export default StyleSheet.create({
  blockTextGrey: {
    backgroundColor: colors.veryLightGreyTwo,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
    marginBottom: 20
  },
  containerBtnRound: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  btnRound: {
    margin: widthPercentageToDP("4%"),
    width: 100,
    height: 100,
    backgroundColor: colors.veryLightGreyTwo,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  btnRoundActive: {
    backgroundColor: colors.aquaMarine
  },
  btnEdit: {
    backgroundColor: colors.aquaMarine,
    borderRadius: 6,
    paddingHorizontal: 27,
    paddingVertical: 7
  },
  blockInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.veryLightGreyTwo,
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 13
  },
  lineTop: {
    borderColor: colors.veryLightGreyTwo,
    borderTopWidth: 1
  },
  blockImg: {
    marginVertical: 30,
    justifyContent: "center",
    flexDirection: "row"
  },
  sbText: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 5
  },
  toolbar: {
    height: "20%",
    backgroundColor: colors.black
  },
  handleButton: {
    ...theme.styles.handleSubmitBottom,
    marginHorizontal: theme.metrics.gutters.medium * 6,
    marginBottom: 25
  }
});
