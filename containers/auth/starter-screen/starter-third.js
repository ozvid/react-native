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

class StarterThirdScreen extends Component {
  handleNext = () => {
    this.props.navigation.navigate("starterFourth");
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <View style={globalStyles.container}>
          <View style={globalStyles.containerV2}>
            <Image
              source={require("../../../assets/images/Graphics/Intro_3.png")}
              style={{ width: 153, height: 230 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={screenStyles.title}
              // text="Track the packages that you're expecting!"
              text="Track the items you are expecting!"
            />
            <Text
              align="center"
              size="medium"
              style={screenStyles.title_highlight}
              // text="You can select multiple sized packages, and see your delivery tracking in real-time."
              text="Confirm your delivery request and track your delivery in real-time."
            />
          </View>
          <HandleButton
            style={globalStyles.handleSubmitBottom}
            textButton="Let's go!"
            handleSubmit={this.handleNext}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default StarterThirdScreen;
