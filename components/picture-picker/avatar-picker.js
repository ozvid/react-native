import React from "react";
import { View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "../button";
import styles from "./picture-picker.styles";
import colors from "../../theme/colors";
import * as images from "../../constants/images";
import FunctionPicker from "./function-picker";

export default class AvatarPicker extends FunctionPicker {
  render() {
    const { picture } = this.props;

    return (
      <View>
        <Image
          source={!!picture ? { uri: picture } : images.AVATAR}
          style={styles.avatar}
        />
        <Button
          type="clear"
          style={styles.btnAvatar}
          onPress={this.showActionSheet}
        >
          <Feather name="plus" color={colors.white} size={20} />
        </Button>
        {this.renderActionSheet()}
      </View>
    );
  }
}
