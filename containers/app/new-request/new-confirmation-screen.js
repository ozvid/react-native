/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { formValueSelector } from "redux-form";
import { calculatePrice } from "./new-request.actions";

import { styles } from "../../../theme";
import screenStyles from "./new-request.styles";
import { HandleButton, ConfirmationBlock } from "../../../components";
import { packageNames } from "../../../constants/text";
import { ASYNC_STATUSES } from "../../../constants";

class NewConfirmationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Price Confirmation",
      headerStyle: {}
    };
  };

  handleConfirmation = () => {
    const { navigation } = this.props;
    navigation.navigate("checkout");
  };

  render() {
    const {
      packageType,
      length,
      width,
      height,
      photoURL,
      description,
      publicNotes,
      packageName,
      pickupLocation = {},
      dropoffLocation = {},

      // dropoffLocation = {
      //   address:
      //     "John Nicholas Trail, Santa Clara County, CA, United States of America",
      //   components: {
      //     zipCode: "94043",
      //     city: "Mountain View",
      //     state: "CA",
      //     street: "Santa Clara County, CA"
      //   },
      //   description:
      //     "John Nicholas Trail, Santa Clara County, CA, United States of America",
      //   lat: 37.213333,
      //   lng: -122.045333,
      //   mainText:
      //     "John Nicholas Trail, Santa Clara County, CA, United States of America",
      //   secondaryText:
      //     "John Nicholas Trail, Santa Clara County, CA, United States of America"
      // },
      price,
      status,
      navigation: { navigate }
    } = this.props;
    return (
      <SafeAreaView style={styles.fullContainer}>
        <ScrollView>
          <View style={{ ...styles.fullContainer, paddingBottom: 30 }}>
            <View style={screenStyles.blockImg}>
              <Image
                source={{ uri: photoURL }}
                style={{ width: 150, height: 150 }}
              />
            </View>

            <View style={screenStyles.lineTop}>
              <ConfirmationBlock
                title="Locations:"
                text={[
                  `Pickup: ${pickupLocation.mainText ||
                    pickupLocation.address}`,
                  `Drop off: ${dropoffLocation.mainText ||
                    dropoffLocation.address}`
                ]}
                button={{
                  text: "Edit",
                  onPress: () =>
                    navigate("deliverySummary", {
                      isEdit: true
                    })
                }}
              />
              <ConfirmationBlock
                title="Package size:"
                text={`${packageNames[packageType]} (${length}" ${width}" ${height}")`}
                button={{
                  text: "Edit",
                  onPress: () =>
                    navigate("newPackage", {
                      isEdit: true
                    })
                }}
              />
              <ConfirmationBlock
                title="Package Description:"
                text={`${publicNotes}\n${description}`}
                button={{
                  text: "Edit",
                  onPress: () =>
                    navigate("newDescription", {
                      isEdit: true
                    })
                }}
              />
              {status === ASYNC_STATUSES.LOADING ? (
                <ConfirmationBlock>
                  <ActivityIndicator />
                </ConfirmationBlock>
              ) : (
                <ConfirmationBlock
                  title="Price:"
                  text={
                    // `$${10}`
                    status === ASYNC_STATUSES.SUCCESS
                      ? `${price}$`
                      : // ? `${100}$`
                        "Error while loading price"
                  }
                />
              )}
            </View>
          </View>

          <HandleButton
            style={screenStyles.handleButton}
            submitting={status !== ASYNC_STATUSES.SUCCESS}
            handleSubmit={this.handleConfirmation}
            textButton="Confirm"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const selector = formValueSelector("PackageForm");

export default connect(
  state => ({
    packageType: selector(state, "packageType"),
    length: selector(state, "length"),
    width: selector(state, "width"),
    height: selector(state, "height"),
    photoURL: selector(state, "photoURL"),
    description: selector(state, "description"),
    publicNotes: selector(state, "publicNotes"),
    pickupLocation: state.newRequest.pickupLocation,
    dropoffLocation: state.newRequest.dropoffLocation,
    distance: state.newRequest.distance,
    status: state.newRequest.status,
    price: state.newRequest.price
  }),
  {
    calculatePrice
  }
)(withNavigation(NewConfirmationScreen));
