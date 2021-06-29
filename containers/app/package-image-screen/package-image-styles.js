import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  buttonCustomer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "33%",
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    borderRightWidth: 1,
    borderRightColor: colors.gray,
    backgroundColor: colors.veryLightGreyTwo
  },
  buttonCourier: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "33%",
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderLeftWidth: 1,
    borderLeftColor: colors.gray,
    backgroundColor: colors.veryLightGreyTwo
  },
  buttonPickUp: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "33%",
    backgroundColor: colors.veryLightGreyTwo
  },
  buttonActive: {
    backgroundColor: colors.aquaMarine
  }
});
