/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from "react";
import { View, SafeAreaView, Image } from "react-native";

import { HandleButton, Text } from "../../../components";
import globalStyles from "../../../theme/global-styles";
import screenStyles from "./starter.styles";

class StarterFirstScreen extends Component {
  handleNext = () => {
    this.props.navigation.navigate("starterSecond");
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <View style={globalStyles.container}>
          <View style={globalStyles.containerV2}>
            <Image
              source={require("../../../assets/images/Graphics/Intro_1.png")}
              style={{ width: 260, height: 198 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={screenStyles.title}
              // text="On the way delivery application!"
              text="On-The-Way Delivery Application!"
            />
            <Text
              align="center"
              size="medium"
              style={screenStyles.title_highlight}
              // text={`You can now send packages/goods at an affordable price without traveling the distance yourself.\nAlso, travelers and commuters can earn money while traveling and commuting.`}
              text={`Customers, use SendASAP to deliver anything at affordable price.\nDelivery Partners, make money while driving or traveling to where you are already going.`}
            />
          </View>
          <HandleButton
            style={globalStyles.handleSubmitBottom}
            textButton="Next"
            handleSubmit={this.handleNext}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default StarterFirstScreen;
