import { StyleSheet } from "react-native";
import theme from "../../theme";

export default StyleSheet.create({
  label: {
    height: 30,
    marginLeft: 7,
    color: theme.colors.black,
    fontSize: 14,
    lineHeight: 30,
    opacity: 0.8
  },
  inputBox: {
    flex: 1,
    fontSize: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10
  },
  selectInputBox: {
    flexDirection: "row",
    borderRadius: 3,
    borderWidth: 0.4,
    borderColor: "rgba(125, 142, 180, 0.8)",
    minHeight: 50,
    lineHeight: 20
  }
});

export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    borderRightWidth: 0.4,
    borderColor: "rgba(125, 142, 180, 0.8)",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    width: 70,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderRightWidth: 0.4,
    borderColor: "rgba(125, 142, 180, 0.8)",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    width: 70,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  iconContainer: {
    top: 10,
    right: 12
  }
};
