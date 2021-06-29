import React from "react";
import { View } from "react-native";
import _ from "lodash";

import Button from "../button";
import Text from "../text";
import screenStyles from "./confirmation-block.styles";
import { colors } from "../../theme";
import { randomKey } from "../../services/utils";

export default ConfirmationBlock = ({ title, text, button, children }) => {
  return (
    <View style={screenStyles.blockInfoItem}>
      <View style={{ flex: 1 }}>
        {title && (
          <Text
            size="medium"
            text={title}
            fontFamily="rubik-bold"
            align="left"
          />
        )}
        {_.isArray(text)
          ? text.map(c => (
              <Text key={randomKey()} size="medium" text={c} align="left" />
            ))
          : text && <Text size="medium" text={text} align="left" />}
        {children}
      </View>
      <View style={screenStyles.bottomContainer}>
        {button && (
          <Button
            type="clear"
            style={screenStyles.btnEdit}
            onPress={button.onPress}
          >
            <Text
              size="medium"
              text={button.text}
              fontFamily="rubik-bold"
              color={colors.white}
            />
          </Button>
        )}
      </View>
    </View>
  );
};
