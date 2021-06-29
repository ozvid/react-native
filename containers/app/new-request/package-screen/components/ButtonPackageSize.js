/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from "react";
import * as Location from "expo";
import * as Permissions from "expo-permissions";

import { View } from "react-native";
import { formValueSelector, reduxForm, change } from "redux-form";
import { connect } from "react-redux";

import { setPickupLocation } from "../../new-request.actions";
import screenStyles from "../../new-request.styles";
import {
  HandleButton,
  Text,
  RoundButton,
  GrayBlockText
} from "../../../../../components";
import { sizePackage, packageTypes } from "../../../../../constants";
import { colors, styles } from "../../../../../theme";
import AddressTop from "../../../../../components/address-top/addressTop";
import { packageNames, descriptions } from "../../../../../constants/text";
import { ScrollView } from "react-native-gesture-handler";

class ButtonPackageSize extends Component {
  state = {
    currentLocation: undefined
  };

  componentWillMount = async () => {
    const { pickupLocation = {} } = this.props;

    if (!pickupLocation.mainText) {
      const geocodeResult = await this._reverseGeocodeLocationAsync();
      const {
        street,
        city,
        region,
        postalCode,
        country,
        name
      } = geocodeResult[0];

      this.props.setPickupLocation({
        description: street,
        mainText: name,
        secondaryText: `${city}, ${region}, ${country}`,
        address: street,
        lat: this.state.currentLocation.latitude,
        lng: this.state.currentLocation.longitude
      });
    }
  };

  componentDidMount() {
    if (!this.props.navigation.getParam("isEdit", false)) {
      this.onCheck(packageTypes.SMALL);
    }
  }

  _reverseGeocodeLocationAsync = async () => {
    // this.props.locationPermission();
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // this.props.locationPermissionGranted();
    }
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    this.setState({
      currentLocation: {
        latitude,
        longitude
      }
    });
    return Location.reverseGeocodeAsync({
      latitude,
      longitude
    });
  };

  onCheck = name => {
    const { change } = this.props;
    change("packageType", name);
    change("length", sizePackage[name].length);
    change("width", sizePackage[name].width);
    change("height", sizePackage[name].height);
  };

  render() {
    const {
      navigation,
      handleSubmit,
      error,
      packageType,
      length,
      width,
      height,
      pickupLocation = {},
      dropoffLocation = {}
    } = this.props;
    const defaultLocation = "Current location";
    const pickupLocationDescription =
      pickupLocation.mainText || pickupLocation.address || defaultLocation;
    const dropoffLocationDescription = dropoffLocation.mainText;

    return (
      <View style={{ ...styles.container, paddingVertical: 0 }}>
        <View style={styles.fullContainer}>
          <AddressTop
            pickupLocation={pickupLocationDescription}
            dropoffLocation={dropoffLocationDescription}
          />
          <ScrollView>
            <Text
              // style={{ marginTop: 12 }}
              size="exRegular"
              fontFamily="rubik-bold"
              text="Choose your package type"
            />
            <View
              style={{
                ...screenStyles.containerBtnRound,
                justifyContent: "center"
              }}
            >
              <RoundButton
                text={packageNames.small}
                onPress={() => this.onCheck(packageTypes.SMALL)}
                isActive={packageType === packageTypes.SMALL}
              />
              <RoundButton
                text={packageNames.medium}
                isActive={packageType === packageTypes.MEDIUM}
                onPress={() => this.onCheck(packageTypes.MEDIUM)}
              />
              <RoundButton
                text={packageNames.large}
                isActive={packageType === packageTypes.LARGE}
                onPress={() => this.onCheck(packageTypes.LARGE)}
              />
              <RoundButton
                text={packageNames.suv}
                isActive={packageType === packageTypes.SUV}
                onPress={() => this.onCheck(packageTypes.SUV)}
              />
              <RoundButton
                text={packageNames.custom1}
                isActive={
                  packageType === packageTypes.CUSTOM1 ||
                  packageType === packageTypes.CUSTOM2 ||
                  packageType === packageTypes.CUSTOM3
                }
                onPress={() => navigation.navigate("customSize")}
              />
            </View>
            {error && <Text text={error} style={styles.errorMessage} />}
            {packageType ? (
              <React.Fragment>
                <GrayBlockText>
                  <Text>
                    <Text
                      size="medium"
                      text="Package size: "
                      fontFamily="rubik-bold"
                    />
                    <Text
                      size="medium"
                      text={`below ${length}" x ${width}" x ${height}"`}
                    />
                  </Text>
                </GrayBlockText>
                <Text
                  text={descriptions[packageType]}
                  size="medium"
                  color={colors.warmGrey}
                />
              </React.Fragment>
            ) : (
              <View style={{ height: 60 }} />
            )}
          </ScrollView>
        </View>

        <HandleButton
          style={!packageType && { opacity: 0.7 }}
          handleSubmit={handleSubmit}
          submitting={!packageType}
          textButton="Next"
        />
      </View>
    );
  }
}

const selector = formValueSelector("PackageForm");

const Form = reduxForm({
  form: "PackageForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ButtonPackageSize);

export default connect(
  state => ({
    packageType: selector(state, "packageType"),
    length: selector(state, "length"),
    width: selector(state, "width"),
    height: selector(state, "height"),
    pickupLocation: state.newRequest.pickupLocation,
    dropoffLocation: state.newRequest.dropoffLocation
  }),
  {
    change,
    setPickupLocation
  }
)(Form);
