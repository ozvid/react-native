import { colors } from "../../theme";
import { DROPDOWN_HEIGHT } from "../../constants";

export const formInputRow = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 36,
  borderBottomWidth: 1,
  borderBottomColor: colors.glacier
};

export const formInputIcon = {
  height: 20,
  width: 20,
  resizeMode: "contain"
};

export const errorText = {
  // paddingHorizontal: 15,
  // marginHorizontal: 8,
  textAlign: "right",
  color: colors.venetianRed,
  opacity: 0.8,
  justifyContent: "flex-end"
};

export const errorInput = {
  borderBottomWidth: 1,
  borderBottomColor: colors.venetianRed,
  opacity: 0.8
};

export const formInput = {
  marginHorizontal: 8,
  borderWidth: 0,
  backgroundColor: colors.transparent,
  color: colors.white,
  fontSize: 14
};

export const formRow = {
  paddingVertical: 8,
  paddingHorizontal: 24
};

export const formRowInput = {
  color: colors.black,
  fontSize: 15,
  fontWeight: "400",
  minHeight: 40,
  height: 40,
  paddingTop: 8,
  paddingBottom: 8,
  backgroundColor: colors.white
};

export const textarea = {
  borderColor: colors.lightGrey,
  borderWidth: 0.5
};

export const textareaText = {
  backgroundColor: colors.white,
  color: colors.black,
  fontSize: 15,
  fontWeight: "400",
  height: 160
};

export const formRowLabel = {
  fontSize: 13,
  color: colors.black,
  textAlign: "left",
  opacity: 0.7,
  paddingBottom: 4
};

export const formRowError = {
  color: colors.red,
  opacity: 0.8,
  textAlign: "left"
};

export const dropdownText = {
  width: "100%",
  textAlign: "left",
  fontSize: 16,
  fontWeight: "500",
  paddingHorizontal: 8
};

export const dropdownPlaceholder = {
  ...dropdownText,
  opacity: 0.75
};

export const dropdownValue = {
  height: DROPDOWN_HEIGHT,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  borderColor: colors.transparent,
  borderWidth: 1
};

export const dropdownRow = {
  height: DROPDOWN_HEIGHT
};

export const dropdownRowText = {
  height: DROPDOWN_HEIGHT,
  fontSize: 16,
  color: colors.brigthGrey,
  textAlign: "left",
  fontWeight: "500",
  paddingVertical: 8,
  paddingHorizontal: 16
};

export const dropdownOptions = {
  flex: 1,
  // width: "87%",
  backgroundColor: colors.whiteTwo,
  borderColor: colors.transparent,
  borderWidth: 1
};
