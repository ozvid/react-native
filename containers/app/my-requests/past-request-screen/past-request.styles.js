import theme, { colors, metrics } from "../../../../theme";

export const mapView = {
  width: metrics.deviceWidth,
  height: 200
};

export const parentContainer = {
  ...theme.styles.fullContainer,
  backgroundColor: colors.whiteTwo
};

export const contentContainer = {
  backgroundColor: colors.content,
  flex: 1
};

export const title_h = {
  color: colors.warmGrey,
  paddingLeft: 30,
  marginTop: 19,
  marginBottom: 5
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

export const blockMInfo = {
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
