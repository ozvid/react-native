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

class StarterSecondScreen extends Component {
  handleNext = () => {
    this.props.navigation.navigate("starterThird");
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <View style={globalStyles.container}>
          <View style={globalStyles.containerV2}>
            <Image
              source={require("../../../assets/images/Graphics/Intro_2.png")}
              style={{ width: 181, height: 230 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={screenStyles.title}
              // text="Simple steps, and enjoy our service!"
              text="Simple steps and easy to use App!"
            />
            <Text
              align="center"
              size="medium"
              style={screenStyles.title_highlight}
              // text="All you have to do is set up the locations, snap a photo, and let the driver handle the rest!"
              text="Type your pickup location, drop off date and time, drop off location, then select item size and you are all set."
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

export default StarterSecondScreen;
