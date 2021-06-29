import { StyleSheet } from "react-native";

import globalStyle from "../../theme/global-styles";
import colors from "../../theme/colors";

export default StyleSheet.create({
  button: {
    ...globalStyle.button,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    backgroundColor: colors.white
  },
  title_h: {
    color: colors.warmGrey,
    paddingLeft: 30,
    marginTop: 19,
    marginBottom: 5
  }
});
