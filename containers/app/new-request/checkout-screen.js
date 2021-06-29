/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

/* eslint-disable no-shadow */
import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { formValueSelector, destroy } from "redux-form";
import PropTypes from "prop-types";

import { styles, colors, metrics } from "../../../theme";
import screenStyles from "./new-request.styles";
import styleButtonList from "../../../components/button-list/button-list.styles";
import { HandleButton, Text, Button } from "../../../components";
import { addPackage, setCard } from "./new-request.actions";
import { firebaseService, FILE } from "../../../services";
import { getFormattedDate, getFormattedTime } from "../../../utils/date";
import { changeLoader } from "../../../components/loading/loading.actions";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";

import { packageNames } from "../../../constants/text";

import { statuses } from "../../../constants";

class CheckoutScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Checkout",
      headerStyle: {}
    };
  };

  componentDidMount() {
    const { setCard, account } = this.props;
    if (account.credit_cards.length > 0) {
      setCard(account.credit_cards[0]);
    }
  }

  getBlob = photoURL => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        Alert.alert(e.message);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photoURL, true);
      xhr.send(null);
    });
  };

  showDisclaimer = () => {
    this.props.showAlert({
      message:
        "By submitting this request, you agreed that you are not shipping, sending or storing any unlawful material, for fraudulent purposes, for promoting or encouraging any illegal activity, or for committing or assisting in the commission of a crime and abide to SendASAP “Open Box” Policy. You may seal the package(s) after the delivery partner inspects the package(s).",
      title: "Disclaimer",
      buttonText: "Confirm",
      onConfirm: this.placeOrder
    });
  };

  placeOrder = async () => {
    const {
      card,
      price,
      width,
      height,
      length,
      account,
      //photoURL,
      navigation,
      pickupTime,
      packageType,
      description,
      publicNotes,
      pickupLocation,
      dropoffLocation = {}
    } = this.props;
    // const price;
    // const dropoffLocation = {
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
    // };
    const photoURL =
      "https://firebasestorage.googleapis.com/v0/b/send-asap.appspot.com/o/avatar%2F1QOgRuBgEYQSHgSH3usqKxasffT2?alt=media&token=f236b703-cee9-40b0-a1e2-f87a53a7a4dc";

    this.props.changeLoader({ visible: true });

    console.log("Test", {
      packageType,
      dimensions: {
        length,
        width,
        height
      },
      from: {
        address: pickupLocation.address, // warning type undefined
        latitude: pickupLocation.lat,
        longitude: pickupLocation.lng,
        ...pickupLocation.components
      },
      to: {
        address: dropoffLocation.address, // warning type undefined
        latitude: dropoffLocation.lat,
        longitude: dropoffLocation.lng,
        ...dropoffLocation.components
      },
      pickupTime,
      price,
      description,
      publicNotes,
      packagePhotos: {
        // customer: result.url,
        courier: ""
      },
      status: statuses.createdNotPaid,
      clientId: account.uid,
      stripePaymentId: 0,
      clientPhone: account.phoneNumber,
      paymentCardId: card.stripe_id
    });
    this.getBlob(photoURL).then(blob => {
      firebaseService
        .uploadFile({
          directory: `packages`,
          file_id: `client_${
            account.uid
          }_${getFormattedDate()}_${getFormattedTime()}`,
          device_file_full_path: blob
        })
        .then(result => {
          this.props.addPackage({
            packageType,
            dimensions: {
              length,
              width,
              height
            },
            from: {
              address: pickupLocation.address, // warning type undefined
              latitude: pickupLocation.lat,
              longitude: pickupLocation.lng,
              ...pickupLocation.components
            },
            to: {
              address: dropoffLocation.address, // warning type undefined
              latitude: dropoffLocation.lat,
              longitude: dropoffLocation.lng,
              ...dropoffLocation.components
            },
            pickupTime,
            price,
            description,
            publicNotes,
            packagePhotos: {
              customer: result.url,
              courier: ""
            },
            status: statuses.createdNotPaid,
            clientId: account.uid,
            stripePaymentId: 0,
            clientPhone: account.phoneNumber,
            paymentCardId: card.stripe_id
          });

          this.props.destroy("PackageForm");
          FILE.deletePhoto(photoURL);
          navigation.navigate("loading");
        });
    });
  };

  render() {
    const {
      navigation,
      packageType,
      card,
      pickupLocation = {},
      dropoffLocation = {},
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
      price
    } = this.props;
    return (
      <SafeAreaView style={styles.fullContainer}>
        <View style={styles.fullContainer}>
          <View style={screenStyles.blockInfoItem}>
            <View>
              <Text
                size="medium"
                fontFamily="rubik-bold"
                align="left"
                text={`1 ${packageNames[packageType]} Package`}
              />
              <Text
                size="medium"
                text={`Pickup: ${pickupLocation.address || ""}`}
                align="left"
                color={colors.warmGrey}
              />
              <Text
                size="medium"
                text={`Drop off: ${dropoffLocation.mainText || ""}`}
                // text={'John Nicholas Trail, Santa Clara County, CA, United States of America'}
                align="left"
                color={colors.warmGrey}
              />
            </View>
          </View>

          <View style={{ marginHorizontal: 30 }}>
            <View style={screenStyles.sbText}>
              <Text size="medium" text="Subtotal" aling="left" />
              <Text
                size="medium"
                align="right"
                text={`${price}$`}
                /*text={`${10}$`}*/
              />
            </View>
            <View style={screenStyles.sbText}>
              <Text size="medium" text="Tax and Fees" align="left" />
              <Text size="medium" align="right" text="0$" />
            </View>
            <View
              style={[
                screenStyles.lineTop,
                screenStyles.sbText,
                { paddingVertical: 10 }
              ]}
            >
              <Text
                size="medium"
                fontFamily="rubik-bold"
                text="Total"
                align="left"
              />
              <Text
                size="medium"
                fontFamily="rubik-bold"
                align="right"
                text={`${price}$`}
                // text={`${10}$`}
              />
            </View>
          </View>
          <Button
            type="clear"
            style={{
              ...styleButtonList.button,
              backgroundColor: colors.white
            }}
            onPress={() =>
              navigation.navigate("paymentInfo", {
                isPlaseOrder: true
              })
            }
          >
            <View>
              <Text
                size="medium"
                align="left"
                text={card ? "Select Card" : "Add Card"}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {card && (
                <Text
                  text={`**** ${card.last4}`}
                  align="right"
                  color={colors.warmGrey}
                  style={{ left: "10%" }}
                />
              )}
              <Feather name="chevron-right" size={23} color={colors.black} />
            </View>
          </Button>
        </View>
        <HandleButton
          style={{
            ...styles.handleSubmitBottom,
            margin: metrics.gutters.medium * 6,
            opacity: !card ? 0.7 : 1
          }}
          submitting={!card}
          handleSubmit={this.showDisclaimer}
          textButton="Place Order"
        />
      </SafeAreaView>
    );
  }
}

CheckoutScreen.propTypes = {
  packageType: PropTypes.string,
  length: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  description: PropTypes.string,
  publicNotes: PropTypes.string,
  photoURL: PropTypes.string,
  card: PropTypes.object,
  account: PropTypes.object,
  pickupLocation: PropTypes.object,
  pickupTime: PropTypes.object,
  dropoffLocation: PropTypes.object,
  price: PropTypes.number,
  addPackage: PropTypes.func,
  changeLoader: PropTypes.func,
  setCard: PropTypes.func,
  showAlert: PropTypes.func,
  destroy: PropTypes.func,
  navigation: PropTypes.object
};

const selector = formValueSelector("PackageForm");

export default connect(
  state => ({
    packageType: selector(state, "packageType"),
    length: selector(state, "length"),
    width: selector(state, "width"),
    height: selector(state, "height"),
    description: selector(state, "description"),
    publicNotes: selector(state, "publicNotes"),
    photoURL: selector(state, "photoURL"),
    card: state.newRequest.card,
    account: state.account,
    pickupLocation: state.newRequest.pickupLocation,
    pickupTime: state.newRequest.pickupTime,
    dropoffLocation: state.newRequest.dropoffLocation,
    price: state.newRequest.price
  }),
  {
    addPackage,
    destroy,
    changeLoader,
    setCard,
    showAlert
  }
)(withNavigation(CheckoutScreen));
