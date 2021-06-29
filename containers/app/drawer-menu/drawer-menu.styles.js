import { StyleSheet } from "react-native";
import { metrics, colors } from "../../../theme";

export default StyleSheet.create({
  btnProfile: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 60
  },
  avatarContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    marginRight: 25,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.black,
    backgroundColor: colors.white
  },
  avatarImage: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    borderRadius: 30
  },
  btnText: {
    fontSize: 33,
    color: colors.white
  },
  menuItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 40,
    marginVertical: 5
  },
  menuText: {
    marginLeft: 20,
    textAlign: "left",
    color: colors.black
  }
});
