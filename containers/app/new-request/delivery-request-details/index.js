import React from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import { withNavigation, Header } from "react-navigation";

import colors from "../../../../theme/colors";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import IOSKeyboardAvoidingView from "../../../../components/IOSKeyboardAvoidingView";
import DeliveryRequestDetailsForm from "./DeliveryRequestDetailsForm";
import Button from "../../../../components/button";
import {
  setPickupLocation,
  setPickupTime,
  setDropoffLocation
} from "../new-request.actions";
import { Text } from "../../../../components";

const DeliveryRequestDetailsScreen = props => {
  const {
    pickupLocation,
    pickupTime,
    dropoffLocation,
    setPickupLocation,
    setPickupTime,
    setDropoffLocation
  } = props;
  const isValid = pickupTime && dropoffLocation;

  return (
    <DismissKeyboardView>
      <IOSKeyboardAvoidingView
        headerVisible={false}
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: colors.veryLightGreyTwo,
          paddingTop: StatusBar.currentHeight
        }}
      >
        <DeliveryRequestDetailsForm
          name={props.name}
          onCancel={() => props.navigation && props.navigation.goBack()}
          pickupLocation={pickupLocation}
          pickupTime={pickupTime}
          dropoffLocation={dropoffLocation}
          onPickupLocationSelected={setPickupLocation}
          onPickupTimeSelected={setPickupTime}
          onDropoffLocationSelected={setDropoffLocation}
        />
        <View
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 30
          }}
        >
          {isValid ? (
            <Button
              text="Done"
              onPress={() => props.navigation && props.navigation.goBack()}
            />
          ) : null}
        </View>
      </IOSKeyboardAvoidingView>
    </DismissKeyboardView>
  );
};

DeliveryRequestDetailsScreen.navigationOptions = {
  header: null,
  headerMode: "none"
};

export { DeliveryRequestDetailsScreen };

export default connect(
  ({ newRequest }) => ({
    ...newRequest
  }),
  {
    setPickupLocation,
    setPickupTime,
    setDropoffLocation
  }
)(withNavigation(DeliveryRequestDetailsScreen));
