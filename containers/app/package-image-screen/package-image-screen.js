import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Entypo } from "@expo/vector-icons";
import ImageLoad from "react-native-image-placeholder";

import { colors, styles } from "../../../theme";
import screenStyles from "./package-image-styles";
import { Button, Text } from "../../../components";
import { NO_IMAGE } from "../../../constants/images";
import { packageDisplayTexts } from "../../../constants";

class PackageImageScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: null,
      headerLeft: (
        <View style={{ marginLeft: 15 }}>
          <Entypo
            color={colors.black}
            onPress={() => navigation.goBack(null)}
            name="chevron-left"
            size={30}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        borderBottomWidth: 0,
        shadowColor: "transparent"
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      packagePhotos: props.navigation.getParam("packagePhotos"),
      type: props.navigation.getParam("type"),
      current: "customer"
    };
  }

  renderButton = (text, isActive, onPress, buttonStyles = {}) => (
    <Button
      onPress={onPress}
      type="clear"
      style={{
        ...buttonStyles,
        ...(isActive && screenStyles.buttonActive)
      }}
    >
      <Text
        size="medium"
        fontFamily="rubik-bold"
        text={text}
        color={isActive && colors.white}
      />
    </Button>
  );

  getText = () => {
    switch (this.state.current) {
      case "customer":
        return "Request Image";
      case "courier_pick_up":
        return "Pick Up Image";
      case "courier":
        return "Drop Off Image";
      default:
        return "Image";
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <View style={styles.container}>
          <View style={styles.containerV2}>
            <ImageLoad
              source={
                this.state.packagePhotos[this.state.current]
                  ? { uri: this.state.packagePhotos[this.state.current] }
                  : NO_IMAGE
              }
              style={{ width: 259, height: 259 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={styles.title}
              text={this.getText()}
            />
            <Text
              align="center"
              size="medium"
              style={styles.title_highlight}
              text={packageDisplayTexts[this.state.type]}
            />
          </View>

          <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
            {this.renderButton(
              "Sender",
              this.state.current === "customer",
              () => this.setState({ current: "customer" }),
              screenStyles.buttonCustomer
            )}
            {this.renderButton(
              "Pick Up",
              this.state.current === "courier_pick_up",
              () => this.setState({ current: "courier_pick_up" }),
              screenStyles.buttonPickUp
            )}
            {this.renderButton(
              "Drop Off",
              this.state.current === "courier",
              () => this.setState({ current: "courier" }),
              screenStyles.buttonCourier
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(withNavigation(PackageImageScreen));
