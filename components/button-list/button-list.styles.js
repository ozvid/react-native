import { StyleSheet } from "react-native";
import globalStyle from "../../theme/global-styles";

export default StyleSheet.create({
  button: {
    ...globalStyle.button,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5
  }
});
