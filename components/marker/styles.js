import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export default StyleSheet.create({
  markerTitle: {
    height: 25,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.black,
    justifyContent: "center"
  },
  markerTitleBottom: {
    height: 8,
    width: 3,
    backgroundColor: colors.black
  },
  markerContainer: {
    alignItems: "center"
  },
  markerInnerContainerActive: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: colors.aquaMarine
  },
  markerInnerContainerInactive: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: colors.black
  },
  markerInner: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    margin: 5
  },
  image: {
    width: 40,
    height: 20
  }
});
