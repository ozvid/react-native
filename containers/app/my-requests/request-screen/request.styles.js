import { colors, styles } from "../../../../theme";

export const mapView = {
  flex: 1
};

export const centred = {
  justifyContent: "center",
  alignItems: "center"
};

export const parentContainer = {
  flex: 1,
  backgroundColor: colors.whiteTwo
};

export const slidingUpContainer = {
  ...styles.fullContainer,
  backgroundColor: colors.white,
  zIndex: 1
};

export const slidingUpHeaderContainer = {
  paddingHorizontal: 24,
  paddingTop: 16
};

export const slidingUpHeader = {
  flexDirection: "row",
  justifyContent: "space-between"
};

export const slidingUpBelowText = {
  textAlign: "left"
};

export const slidingUpImage = {
  flexDirection: "row",
  justifyContent: "center",
  marginVertical: 24
};

export const blockInfoItem = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 13
};

export const blockImg = {
  marginVertical: 40,
  justifyContent: "center",
  flexDirection: "row"
};

export const blockInfo = {
  paddingHorizontal: 30,
  paddingVertical: 12,
  borderColor: colors.gray,
  borderBottomWidth: 0.5,
  borderTopWidth: 0.5
};

export const addressStick = {
  width: "100%",
  justifyContent: "flex-start",
  paddingHorizontal: 30,
  flexDirection: "row"
};

export const stickContiner = {
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 0.1,
  paddingTop: 15,
  paddingBottom: 30
};

export const stick = {
  width: 2,
  height: 41,
  backgroundColor: colors.veryLightGrey
};

export const blockButton = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 30,
  paddingVertical: 12,
  borderColor: colors.gray,
  borderBottomWidth: 0.5,
  borderTopWidth: 0.5,
  backgroundColor: colors.white
};

export const courierImageInfo = {
  padding: 16,
  alignItems: "flex-start",
  justifyContent: "flex-start"
};

export const wrapContainer = {
  marginHorizontal: 24,
  marginVertical: 30
};

export const horizontalContainer = {
  flexDirection: "row"
};

export const spaceBetween = {
  flex: 1,
  padding: 12
};

export const textBlock = {
  justifyContent: "center",
  flex: 4,
  paddingRight: 6
};

export const itemsBlock = {
  flex: 5,
  justifyContent: "space-between",
  flexDirection: "row"
};

export const loadingBlock = {
  marginVertical: 10
};

export const addressTopStyles = {
  position: "absolute",
  alignSelf: "center",
  top: 72,
  zIndex: 1,
  backgroundColor: colors.white
};
