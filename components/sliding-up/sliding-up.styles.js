import theme from "../../theme";

export const container = {
  ...theme.styles.fullContainer,
  backgroundColor: theme.colors.white,
  zIndex: 5
};

export const slidingUpContainer = {
  ...theme.styles.fullContainer,
  backgroundColor: theme.colors.white
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
