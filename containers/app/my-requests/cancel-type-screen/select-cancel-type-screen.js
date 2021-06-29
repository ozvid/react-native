/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from "react";
import { View, Alert } from "react-native";
import LoadingOverlay from "react-native-loading-spinner-overlay";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";

import { AbsoluteButton, Button, Text } from "../../../../components";
import * as screenStyles from "./select-cancel-type.styles";
import { styles } from "../../../../theme";
import { cancelOrder } from "../functions";

class SelectCancelTypeScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  state = {
    isLoading: false
  };

  handleCancel = reason => {
    const { navigation } = this.props;
    const packageId = navigation.getParam("packageId");
    // const fee = navigation.getParam("fee");
    const fees = navigation.getParam("fee");
    const fee = fees * 0;

    if (reason !== "Other") {
      this.setState({ isLoading: true });
      cancelOrder(packageId, reason, fee)
        .then(() => navigation.navigate("myRequestsList"))
        .catch(err => Alert.alert(err.message))
        .finally(() => this.setState({ isLoading: false }));
    } else {
      navigation.navigate("cancelOtherNotes", { packageId, fee });
    }
  };

  render() {
    return (
      <View style={styles.fullContainerCenter}>
        <LoadingOverlay visible={this.state.isLoading} />
        <AbsoluteButton icon="cross" onPress={this.props.navigation.goBack} />
        <Text
          style={screenStyles.headerText}
          text="Order cancelled"
          size="exRegular"
          fontFamily="rubik-bold"
        />
        <Text
          style={screenStyles.belowHeaderText}
          text="Tell us the reason to help us improve"
          size="medium"
        />
        <Button
          onPress={() => this.handleCancel("Delivery Partner not on time")}
          textStyle={screenStyles.buttonText}
          style={screenStyles.button}
          text="Delivery Partner not on time"
          type="disabled"
        />
        <Button
          onPress={() => this.handleCancel("Request incorrect")}
          textStyle={screenStyles.buttonText}
          style={screenStyles.button}
          text="Request incorrect"
          type="disabled"
        />
        <Button
          onPress={() => this.handleCancel("Other")}
          textStyle={screenStyles.buttonText}
          style={screenStyles.button}
          text="Other"
          type="disabled"
        />
      </View>
    );
  }
}

SelectCancelTypeScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(SelectCancelTypeScreen);
