import { StyleSheet } from "react-native";
import { colors } from "../../../theme";

export default StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 32
  },
  title: {
    marginTop: 30,
    lineHeight: 29,
    color: colors.black
  },
  title_highlight: {
    marginTop: 15,
    color: colors.black
  },
  viewInput: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  boxTopI: {
    marginTop: 40
  },
  code: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
