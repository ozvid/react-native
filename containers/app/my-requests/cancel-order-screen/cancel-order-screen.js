/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { withNavigation } from "react-navigation";
import LoadingOverlay from "react-native-loading-spinner-overlay";
import PropTypes from "prop-types";

import * as screenStyles from "./cancel-order.styles";
import { styles } from "../../../../theme";

import { Text, Button, AbsoluteButton } from "../../../../components";
import { CANCEL } from "../../../../constants/images";
import { Variables } from "../../../../services/firebase";

class CancelOrderScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      packageId: props.navigation.getParam("packageId"),
      packageType: props.navigation.getParam("packageType"),
      takeFees: props.navigation.getParam("takeFees"),
      fee: undefined
    };
  }

  componentDidMount() {
    const { packageType, takeFees } = this.state;
    if (takeFees) {
      Variables.getDoc("bookingFees").then(bookingFees =>
        this.setState({
          fee: bookingFees.data()[packageType]
        })
      );
    }
  }

  render() {
    const { packageId, fee, takeFees } = this.state;
    return (
      <React.Fragment>
        <LoadingOverlay visible={this.state.isLoading} />
        <View style={styles.fullContainerCenter}>
          <AbsoluteButton icon="cross" onPress={this.props.navigation.goBack} />
          <Image source={CANCEL} style={screenStyles.imageCancel} />
          <Text
            text="Are you sure you want to cancel this order?"
            size="regular"
            fontFamily="rubik-bold"
            style={screenStyles.text}
          />
          {fee && (
            <Text
              // text={`You'll need to pay $${fee} cancellation fee.`}
              text={`You'll pay $ ${fee * 0} cancellation fee.`}
              size="medium"
            />
          )}
        </View>
        {(fee || !takeFees) && (
          <Button
            text="Yes, cancel my order"
            style={screenStyles.cancelButton}
            onPress={() =>
              this.props.navigation.navigate("selectCancelType", {
                packageId,
                fee
              })
            }
          />
        )}
      </React.Fragment>
    );
  }
}

CancelOrderScreen.propTypes = {
  navigation: PropTypes.object
};

export default withNavigation(CancelOrderScreen);
