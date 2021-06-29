import { colors, fonts, styles } from "../../../../theme";

export const listItemContainer = {
  marginTop: 18
};

export const activeStatus = {
  color: colors.aquaMarine
};

export const parentContainer = {
  ...styles.fullContainer,
  backgroundColor: colors.whiteTwo
};

export const listItem = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 30,
  paddingVertical: 12,
  borderColor: colors.gray,
  borderBottomWidth: 0.5,
  backgroundColor: colors.white
};

export const listItemDate = {
  textAlign: "left",
  paddingHorizontal: 30,
  paddingVertical: 6
};

export const listItemSection = {
  flex: 1
};

export const listItemSectionRight = {
  flexDirection: "row",
  alignItems: "center"
};

export const sectionHeader = {
  ...fonts.listSectionHeading,
  backgroundColor: colors.whiteTwo,
  borderColor: colors.gray,
  borderBottomWidth: 0.5,
  textAlign: "left",
  paddingTop: 25,
  paddingBottom: 7,
  paddingLeft: 30
};

export const arrow = {
  marginLeft: 13
};

export const sectionButton = {
  ...listItem,
  minHeight: 70
};

export const indicator = {
  paddingTop: 30
};
