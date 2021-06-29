/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Keyboard,
  Alert,
  Linking
} from "react-native";
import moment from "moment";
import PropTypes from "prop-types";

import SendAsapTextInput from "../../../../components/text-input/SendAsapTextInput";
import colors from "../../../../theme/colors";
import fonts from "../../../../constants/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
Keyboard.dismiss();
const componentStyles = StyleSheet.create({
  container: {
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightGreyThree
  }
});

function DeliverySummaryForm(props) {
  Keyboard.dismiss();
  const {
    name = "Incorrect Location",
    pickupLocation = {},
    pickupTime,
    dropoffLocation = {},
    onPickupFocus,
    onDropoffFocus,
    onSubmit = () => ({})
  } = props;
  const title =
    pickupLocation && pickupTime ? "Request Delivery" : "Anything to deliver?";

  const urlPickup = pickupLocation.address;
  const openMapPickupLocation = () => {
    if (pickupLocation.address == undefined) {
      Alert.alert("Can't find Pickup location");
    } else {
      let f = Platform.select({
        ios: () => {
          Linking.openURL("http://maps.apple.com/maps?daddr=" + urlPickup);
        },
        android: () => {
          console.log("ANDROID");
          Linking.openURL(
            "http://maps.google.com/maps?daddr=" + urlPickup
          ).catch(err => console.error("An error occurred", err));
        }
      });

      f();
    }
  };
  const dropoffUrl = dropoffLocation.address;
  const openDropOffLocation = () => {
    if (dropoffLocation.address == undefined) {
      Alert.alert("Can't find Drop off location");
    } else {
      let f = Platform.select({
        ios: () => {
          Linking.openURL("http://maps.apple.com/maps?daddr=" + dropoffUrl);
        },
        android: () => {
          console.log("ANDROID");
          Linking.openURL(
            "http://maps.google.com/maps?daddr=" + dropoffUrl
          ).catch(err => console.error("An error occurred", err));
        }
      });

      f();
    }
  };
  return (
    <View style={{ backgroundColor: colors.white }}>
      <SafeAreaView>
        <View style={componentStyles.container}>
          <Text style={{ ...fonts.listItemText, marginBottom: 8 }}>
            Hello, {name}
          </Text>
          <Text style={{ ...fonts.screenTitle, marginBottom: 20 }}>
            {title}
          </Text>
          <SendAsapTextInput
            style={{ marginBottom: 20 }}
            label="Pickup"
            value={pickupLocation.address}
            placeholder={
              pickupTime
                ? `Current location ${pickupTime &&
                    moment(pickupTime).format("MMMM DD h:mm a")}`
                : "Current location"
            }
            placeholderTextColor={colors.aquaMarine}
            onFocus={() =>
              onPickupFocus && onPickupFocus() && Keyboard.dismiss()
            }
          />

          <SendAsapTextInput
            label="Drop off"
            value={dropoffLocation.address}
            placeholder="Type a location"
            onFocus={() =>
              onDropoffFocus && onDropoffFocus() && Keyboard.dismiss()
            }
            onSubmitEditing={({ nativeEvent: { text } }) =>
              text && onSubmit(text)
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

DeliverySummaryForm.propTypes = {
  name: PropTypes.string,
  pickupLocation: PropTypes.object,
  pickupTime: PropTypes.any,
  dropoffLocation: PropTypes.object,
  onPickupFocus: PropTypes.func,
  onDropoffFocus: PropTypes.func,
  onSubmit: PropTypes.func
};

export default DeliverySummaryForm;
