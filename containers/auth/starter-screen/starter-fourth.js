import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";

import { Text, Button } from "../../../components";
import screenStyles from "./starter.styles";
import { LOGO } from "../../../constants/images";
import { USER_ROLES } from "../../../constants";

// eslint-disable-next-line no-shadow
const StarterFourthScreen = ({ navigation }) => {
  const onSignUpPress = role => {
    navigation.navigate("signup", { role });
  };

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.logoContainer}>
        <Image source={LOGO} style={screenStyles.image} />
      </View>
      <View style={screenStyles.actionContainer}>
        <Button
          onPress={() => onSignUpPress(USER_ROLES.CLIENT)}
          style={screenStyles.btnMarginBottom}
        >
          <Text
            color="#000"
            fontFamily="rubik-bold"
            size="regular"
            text="Sign Up as Sender"
          />
        </Button>
        <Button
          onPress={() => onSignUpPress(USER_ROLES.COURIER)}
          style={screenStyles.btnMarginBottom}
        >
          <Text
            color="#000"
            fontFamily="rubik-bold"
            size="regular"
            text="Sign Up as Delivery Partner"
          />
        </Button>
        <Button
          onPress={() => navigation.navigate("login")}
          style={screenStyles.btnMarginBottom}
          type="primaryOutlined"
        >
          <Text
            color="#000"
            fontFamily="rubik-bold"
            size="regular"
            text="Log In"
          />
        </Button>
      </View>
    </View>
  );
};

StarterFourthScreen.propTypes = {
  navigation: PropTypes.object
};

export default StarterFourthScreen;
