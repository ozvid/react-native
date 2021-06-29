import { StyleSheet } from "react-native";
import { colors, fonts } from "../../theme";

export default StyleSheet.create({
  label: {
    height: 30,
    marginLeft: 7,
    color: colors.black,
    fontSize: 14,
    lineHeight: 30,
    opacity: 0.8
  },

  inputBox: {
    minHeight: 50,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    lineHeight: 20,
    borderRadius: 3,
    borderWidth: 0.4,
    borderColor: "rgba(125, 142, 180, 0.8)"
  },
  // SendAsapInputText
  paragraph: {
    fontFamily: fonts.rubik,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    color: colors.black
  },
  textInputPlaceholder: {
    fontFamily: fonts.rubik,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    color: colors.warmGrey
  }
});
