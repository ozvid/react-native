import { StyleSheet } from "react-native";
import colors from "./colors";
import metrics from "./metrics";
import fonts from "./fonts";

export default StyleSheet.create({
  fullContainer: {
    flex: 1
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    flex: 1,
    padding: metrics.gutters.medium * 6
  },
  scrollViewContentContainer: {
    paddingHorizontal: metrics.gutters.big * 2
  },
  fullContainerCenter: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  containerV2: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  btn: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25
  },
  headerText: {
    fontFamily: fonts.rubik,
    fontSize: 16
  },
  headerTextLarge: {
    fontFamily: fonts.rubikBold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0,
    color: colors.white
  },
  errorMessage: {
    color: colors.red
  },
  divider: {
    height: 1,
    backgroundColor: colors.veryLightGreyTwo
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
  drableContainer: {
    flex: 1,
    zIndex: 1,
    backgroundColor: colors.white,
    paddingTop: 21
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderColor: colors.gray
  },
  disabledButton: {
    backgroundColor: colors.veryLightGrey
  },
  hiddenInput: {
    height: 0
  }
});
