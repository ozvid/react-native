import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.content,
    flex: 1
  },
  btnSave: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: colors.black
  },
  btnCourier: {
    borderRadius: 0,
    justifyContent: "flex-start",
    paddingHorizontal: 30
  },
  btnWithSwitch: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title_h: {
    color: colors.warmGrey,
    paddingLeft: 30,
    marginTop: 19,
    marginBottom: 5
  },
  rowField: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%"
  },
  input: {
    backgroundColor: "rgb(243, 243, 243)",
    borderRadius: 8,
    margin: 2
  },
  avatar: {
    alignSelf: "center",
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: colors.disabled
  },
  blockInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13
  },
  logoutBlock: {
    marginTop: 29
  },
  avatarBlock: {
    marginTop: 29
  },
  buttonsBlock: {
    marginTop: 44
  }
});
