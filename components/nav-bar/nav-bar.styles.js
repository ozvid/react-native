import { StyleSheet } from "react-native";

export default StyleSheet.create({
  navBar: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  leftComponent: {
    flex: 1,
    alignItems: "flex-start"
  },
  rightComponent: {
    flex: 1,
    alignItems: "flex-end"
  }
});
