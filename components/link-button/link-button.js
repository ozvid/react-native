import React from "react";
import { withNavigation } from "react-navigation";

import Button from "../button";

const LinkButton = ({ navigation, to, children, style, goBack, ...rest }) => {
  const handleRedirect = () => {
    if (goBack) {
      navigation.goBack();
    } else {
      if (to === "drawer") {
        navigation.toggleDrawer();
      } else {
        navigation.navigate(to, { from: navigation.state.routeName });
      }
    }
  };

  const btnStyle = {
    minWidth: 40,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    ...style
  };

  return (
    <Button onPress={handleRedirect} style={btnStyle} {...rest}>
      {children}
    </Button>
  );
};

export default withNavigation(LinkButton);
