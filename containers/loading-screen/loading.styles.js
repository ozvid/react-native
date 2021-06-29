import { StyleSheet } from "react-native";
import theme from "../../theme";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 75
  },
  btn_skip: {
    position: "absolute",
    top: 20,
    right: 20,
    alignSelf: "flex-end"
  },
  slide: {
    flex: 1,
    paddingHorizontal: 37
  },
  img_intro: {
    width: 300,
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
    borderRadius: 20
  },
  btn_next: {
    position: "absolute",
    right: 45,
    bottom: 75,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: theme.colors.secondary
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    left: 37,
    right: "auto",
    alignItems: "center",
    height: 50,
    alignItems: "center"
  },
  dot: {
    width: 4.5,
    height: 4.5,
    marginHorizontal: 5.5,
    borderRadius: 2.25,
    backgroundColor: theme.colors.white,
    opacity: 0.2
  },
  activeDotContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 10.5,
    height: 10.5,
    marginHorizontal: 5,
    backgroundColor: theme.colors.transparent,
    borderWidth: 0.5,
    borderRadius: 5.25,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },
  activeDot: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    backgroundColor: theme.colors.white
  }
});
