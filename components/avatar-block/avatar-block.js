import React from "react";
import { View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Text from "../text";
import { colors } from "../../theme";
import styles from "./avatar-block.styles";
import * as IMAGES from "../../constants/images";

const AvatarBlock = ({ style, imageURL, rate }) => (
  <View style={[style, styles.avatarBlock]}>
    <Image
      style={styles.avatar}
      source={!imageURL ? IMAGES.AVATAR : { uri: imageURL }}
    />
    {rate && (
      <View style={styles.rectangle}>
        <Entypo size={12} name="star" color={colors.aquaMarine} />
        <Text text={parseFloat(rate)} />
      </View>
    )}
  </View>
);

export default AvatarBlock;
