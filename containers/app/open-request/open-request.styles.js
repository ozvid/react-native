import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.content,
    flex: 1
  },
  title_h: {
    color: colors.warmGrey,
    paddingLeft: 30,
    marginTop: 19,
    marginBottom: 5
  },
  blockInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13
  },
  blockImg: {
    marginVertical: 40,
    justifyContent: "center",
    flexDirection: "row"
  },
  blockInfo: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderColor: colors.gray,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5
  },
  buttonCustomer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    backgroundColor: colors.veryLightGreyTwo
  },
  buttonCourier: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    backgroundColor: colors.veryLightGreyTwo
  },
  buttonActive: {
    backgroundColor: colors.aquaMarine
  },
  indicatorColors: {
    paddingTop: 30
  }
});
