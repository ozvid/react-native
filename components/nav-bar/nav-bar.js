import React from "react";
import { View } from "react-native";

import Text from "../text";
import styles from "./nav-bar.styles";

const NavBar = ({ leftComponent, centerComponent, rightComponent, title }) => (
  <View style={styles.navBar}>
    <View style={styles.leftComponent}>{leftComponent}</View>
    {centerComponent}
    {title && <Text size="medium">{title}</Text>}
    <View style={styles.rightComponent}>{rightComponent}</View>
  </View>
);

export default NavBar;
