import { StyleSheet } from "react-native";
import { colors } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  actionContainer: {
    bottom: 40
  },
  btnMarginBottom: {
    marginBottom: 20
  },
  title: {
    marginTop: 30,
    lineHeight: 28,
    color: colors.blackLight
  },
  title_highlight: {
    marginTop: 15,
    color: colors.blackLight
  },
  image: { width: 200, height: 154 }
});
