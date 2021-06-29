import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export default StyleSheet.create({
  avatarBlock: {
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    alignSelf: "center",
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: colors.disabled
  },
  rectangle: {
    justifyContent: "center",
    backgroundColor: colors.content,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    bottom: 20,
    width: 40
  }
});
