import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export default StyleSheet.create({
  label: {
    height: 30,
    marginLeft: 7,
    color: colors.black,
    fontSize: 14,
    lineHeight: 30,
    opacity: 0.8
  },
  input: {
    flex: 1,
    fontSize: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: colors.veryLightGreyThree
  },
  inputCard: {
    flexDirection: "row",
    borderRadius: 3,
    borderWidth: 0.4,
    borderColor: "rgba(125, 142, 180, 0.8)",
    minHeight: 50,
    lineHeight: 20,
    alignItems: "center"
  },
  card: {
    marginLeft: 10
  }
});
