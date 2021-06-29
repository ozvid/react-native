import React, { Component } from "react";
import { View, SectionList } from "react-native";
import Button from "../button";
import Text from "../text";
import styles from "./section-list.styles";

class SendAsapSectionList extends Component {
  handleRedirect = (to, navigation, params) => {
    if (to === "drawer") {
      navigation.toggleDrawer();
    } else {
      navigation.navigate(to, {
        from: navigation.state.routeName,
        ...params
      });
    }
  };

  renderSectionHeader = title => {
    return (
      <View>
        <Text text={title} align="left" style={styles.title_h} />
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { params, childrenIcon, styleButton, to, navigation } = this.props;
    return (
      <Button
        type="clear"
        style={{ ...styles.button, ...styleButton }}
        onPress={() =>
          this.handleRedirect(to, navigation, {
            ...params,
            data: item
          })
        }
      >
        <View>
          <Text
            size="smallPlus"
            fontFamily="rubik-bold"
            text={item.label}
            align="left"
          />
          <Text size="smallPlus" text={item.b_label} align="left" />
        </View>
        <View style={{ flexDirection: "row" }}>{childrenIcon}</View>
      </Button>
    );
  };

  render() {
    const { sections, style } = this.props;
    return (
      <SectionList
        style={style}
        renderItem={item => this.renderItem(item)}
        renderSectionHeader={({ section: { title } }) =>
          this.renderSectionHeader(title)
        }
        sections={sections}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

export default SendAsapSectionList;
