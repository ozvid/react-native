import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    paddingTop: 0,
    justifyContent: "space-between"
  },
  textTop: {
    color: "#425062",
    backgroundColor: "transparent",
    fontSize: 16,
    fontWeight: "normal",
    position: "absolute",
    top: 30,
    zIndex: 100,
    textAlign: "center",
    width: "100%"
  },
  iconStyle: {
    paddingLeft: 10,
    paddingTop: 30,
    width: 80,
    height: 60,
    zIndex: 99
  },
  accountInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
    height: 72
  },
  inputBox: {
    backgroundColor: "transparent",
    padding: 10,
    marginTop: 10,
    width: "100%",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#CED4DA"
  },
  buttonPrimary: {
    height: 45,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#1ab7e2",
    shadowColor: "#1ab7e2",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  buttonSecondary: {
    height: 45,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#e6e6e6",
    shadowColor: "#e6e6e6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  buttonFacebook: {
    height: 45,
    marginHorizontal: 5,
    backgroundColor: "#3b5998",
    shadowColor: "#3b5998",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  accountDetail: {
    color: "#9FB0C5",
    fontSize: 16,
    fontWeight: "normal"
  },
  footer: {
    marginBottom: 40,
    flexDirection: "column"
  }
});
