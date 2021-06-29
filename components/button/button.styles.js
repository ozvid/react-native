import theme from "../../theme";
import fonts from "../../constants/fonts";

const primary = {
  btn: {
    ...theme.styles.btn,
    borderWidth: 0,
    backgroundColor: theme.colors.primary
  },
  text: fonts.navigationTitle
};

const primaryOutlined = {
  btn: {
    ...theme.styles.btn,
    borderWidth: 1,
    borderColor: theme.colors.black,
    backgroundColor: theme.colors.transparent,
    shadowColor: theme.colors.black
  },
  text: {
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: theme.fonts.rubikBold
  }
};

const secondary = {
  btn: {
    ...theme.styles.btn,
    borderWidth: 0,
    backgroundColor: theme.colors.secondary,
    shadowColor: theme.colors.black
  },
  text: {
    color: theme.colors.primary,
    fontSize: 16,
    fontFamily: theme.fonts.rubikBold
  }
};

const secondaryOutlined = {
  btn: {
    ...theme.styles.btn,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.transparent,
    shadowColor: theme.colors.black
  },
  text: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontFamily: theme.fonts.rubikBold
  }
};

const disabled = {
  btn: {
    ...theme.styles.btn,
    borderWidth: 1.5,
    borderColor: theme.colors.whiteTwo,
    backgroundColor: theme.colors.whiteTwo
  },
  text: {
    color: theme.colors.disabled,
    fontSize: 16
  }
};

const clear = {
  btn: {
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0
  },
  text: {}
};

export const styles = {
  primary,
  primaryOutlined,
  secondary,
  secondaryOutlined,
  disabled,
  clear
};
