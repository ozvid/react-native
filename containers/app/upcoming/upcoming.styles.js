import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.content,
    flex: 1
  },
  iconPhoneLabel: {
    flexDirection: "row",
    alignItems: "center"
  },
  title_h: {
    color: colors.warmGrey,
    paddingLeft: 30,
    marginTop: 19,
    marginBottom: 5
  },
  blockInfoUser: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.veryLightGreyTwo,
    paddingVertical: 20
  },
  topLine: {
    borderColor: colors.veryLightGreyTwo,
    borderTopWidth: 1
  },
  handleBtn: {
    bottom: 120,
    paddingHorizontal: 30
  },
  loadingBlock: {
    marginVertical: 10
  },
  blockButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderColor: colors.gray,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    backgroundColor: colors.white
  },
  centred: {
    justifyContent: "center",
    alignItems: "center"
  }
});
