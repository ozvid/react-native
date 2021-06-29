import React from "react";
import { FlatList, View } from "react-native";
import { withNavigation } from "react-navigation";
import { Feather } from "@expo/vector-icons";

import styles from "./button-list.styles";
import colors from "../../theme/colors";
import Button from "../button";
import Text from "../text";

class ButtonList extends React.Component {
  handleRedirect = (to, navigation, params) => {
    if (to === "drawer") {
      navigation.toggleDrawer();
    } else {
      navigation.navigate(to, { from: navigation.state.routeName });
    }

    if (params) navigation.setParams(params);
  };

  renderButton = ({ item }) => {
    const {
      styleButton,
      icon,
      childrenIcon,
      iconColor = colors.black,
      iconSize = 23,
      navigation,
      params,
      to = null
    } = this.props;
    return (
      <Button
        type="clear"
        style={{ ...styles.button, ...styleButton }}
        onPress={() => this.handleRedirect(item.to || to, navigation, params)}
      >
        <Text
          size="medium"
          text={item.label}
          align="left"
          style={item.value && { width: "50%" }}
        />
        <View style={{ flexDirection: "row" }}>
          {item.value && (
            <Text
              size="medium"
              text={item.value}
              align="right"
              color={item.valueColor}
              style={{ left: "10%" }}
            />
          )}
          {childrenIcon ||
            (!item.noArrow && (
              <Feather
                name={icon || item.icon}
                color={iconColor || item.iconColor}
                size={iconSize || item.iconSize}
              />
            ))}
        </View>
      </Button>
    );
  };

  render() {
    const { listData = [], ...rest } = this.props;

    return (
      <FlatList
        {...rest}
        data={listData}
        renderItem={this.renderButton}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default withNavigation(ButtonList);
