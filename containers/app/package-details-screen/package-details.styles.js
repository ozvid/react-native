import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.content,
    flex: 1
  },
  blockImg: {
    marginVertical: 40,
    justifyContent: "center",
    flexDirection: "row"
  },
  blockInfo: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderColor: colors.gray,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5
  }
});
