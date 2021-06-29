import { StyleSheet } from "react-native";

import { colors } from "../../../theme";

export default StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "900"
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  form: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 32
  },
  image: {
    width: 99,
    height: 76
  },
  forgotLink: {
    color: colors.black,
    fontSize: 14,
    marginTop: 20
  },
  marginTop20: { marginTop: 20 }
});
