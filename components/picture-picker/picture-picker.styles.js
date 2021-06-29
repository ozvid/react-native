import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

const avt_size = 80;

export default StyleSheet.create({
  pictureButton: {
    width: 110,
    height: 110,
    marginBottom: 10,
    alignSelf: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.disabled,
    shadowColor: colors.disabled,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    justifyContent: "center"
  },
  picture: {
    width: 108,
    height: 108,
    borderRadius: 4
  },
  pictureEmpty: {
    padding: 30,
    width: 70,
    height: 70,
    borderRadius: 4
  },
  btnAvatar: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(75, 204, 196)",
    width: 23,
    height: 23,
    borderRadius: 23 / 2,
    overflow: "hidden",
    bottom: 23,
    left: avt_size / 2 - 10,
    zIndex: 1000
  },
  avatar: {
    zIndex: 999,
    alignSelf: "center",
    height: avt_size,
    width: avt_size,
    borderRadius: avt_size / 2,
    backgroundColor: colors.disabled
  }
});
