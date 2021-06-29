/* eslint-disable no-nested-ternary */
import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator, Alert } from "react-native";
import { withNavigation, SafeAreaView } from "react-navigation";
import PropTypes from "prop-types";
import { get, pickBy, identity } from "lodash";

import withRedux from "../../../../utils/withRedux";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import Map from "../../../../components/map";
import {
  setDropoffLocation,
  setPickupLocation,
  setPickupTime,
  setDistance
} from "../new-request.actions";
import PicturePicker from "../../../../components/picture-picker";
import DeliverySummaryForm from "./DeliverySummaryForm";
import Button from "../../../../components/button";
import colors from "../../../../theme/colors";
import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import { googleMaps } from "../../../../services";
import { getComponents } from "../../../../utils/geo";
import Text from "../../../../components/text";
import globalStyles from "../../../../theme/global-styles";
import { uploadImage } from "../../../../services/utils";
import CollectionManager from "../../../../services/firebase/collection";
import { APPLICATION_STATUSES } from "../../../../constants";
import { Users } from "../../../../services/firebase";

const Applications = new CollectionManager("applications");

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.veryLightGreyTwo,
    paddingTop: StatusBar.currentHeight
  },
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingBottom: 30
  },
  containerNotVerified: {
    backgroundColor: colors.white,
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  picturePicker: { marginTop: 20 },
  uploadButton: {
    marginTop: 20
  }
};

class DeliverySummaryScreen extends Component {
  state = {
    applicationStatus: null,
    uploading: false
  };

  componentDidMount() {
    this.props.setPickupTime(new Date());
    const { account, pickupLocation, pickupTime, dropoffLocation } = this.props;
    console.log({
      pickupLocation,
      pickupTime,
      dropoffLocation
    });
    if (get(account, "senderApplication")) {
      this.unSubs = this.userApplicationListener(account);
    } else {
      this.setState({
        applicationStatus: false
      });
    }
  }

  componentWillUnmount() {
    if (this.unSubs) {
      this.unSubs();
    }
  }

  userApplicationListener = account =>
    Applications.onDocSnapShot(account.senderApplication, () =>
      this.loadApplicationStatus(account)
    );

  loadApplicationStatus = account =>
    Applications.getDoc(account.senderApplication)
      .then(applicationDoc => {
        if (applicationDoc.exists) {
          if (
            applicationDoc.data().status === APPLICATION_STATUSES.VERIFIED &&
            !account.verifiedClient
          ) {
            this.props.navigation.navigate("loading");
          } else {
            this.setState({
              applicationStatus: applicationDoc.data().status
            });
          }
        } else {
          this.setState({
            applicationStatus: false
          });
        }
      })
      .catch(err => Alert.alert(err.message));

  handleUpload = async image => {
    this.setState({ uploading: true });
    const { account } = this.props;
    const { uid, role } = account;
    uploadImage(image)
      .then(({ url }) =>
        get(account, "senderApplication")
          ? Applications.updateDoc(account.senderApplication, {
              driverLicense: url,
              status: APPLICATION_STATUSES.PENDING
            })
          : Applications.addDoc({
              user: uid,
              driverLicense: url,
              role,
              status: APPLICATION_STATUSES.PENDING
            }).then(docRef =>
              Users.updateDoc(uid, {
                senderApplication: docRef.id
              })
            )
      )
      .then(() => this.props.navigation.navigate("loading"))
      .catch(err => Alert.alert(err.message))
      .finally(() => this.setState({ uploading: false }));
  };

  render() {
    const {
      pickupLocation,
      pickupTime,
      dropoffLocation,
      // eslint-disable-next-line no-shadow
      showAlert,
      // eslint-disable-next-line no-shadow
      setDistance,
      distance,
      account
    } = this.props;
    const { applicationStatus, uploading } = this.state;
    if (
      this.props.map.currentLocation &&
      !this.props.pickupLocation &&
      !this.isMapMounted
    ) {
      googleMaps
        .seekAddressByLatLng(this.props.map.currentLocation)
        .then(res => {
          const data = res.data.results[0].address_components;
          const components = pickBy(getComponents(data), identity);
          const longComponents = pickBy(getComponents(data, true), identity);
          this.props.setPickupLocation({
            description: `${components.zipCode} ${components.street} ${components.city} ${components.state}`,
            mainText: components.street,
            secondaryText: components.street,
            address: `${components.zipCode} ${components.street} ${components.city} ${components.state}`,
            lat: this.props.map.currentLocation.latitude,
            lng: this.props.map.currentLocation.longitude,
            components: { ...longComponents, state: components.state }
          });
        })
        .catch(err => Alert.alert(err.message));
      this.isMapMounted = true;
    }

    const handleConfirm = () => {
      if (!pickupTime || !dropoffLocation) {
        showAlert({
          message: "Pickup Time and Drop off Location are required"
        });
        return;
      }
      if (!distance) {
        showAlert({ message: "Error calculating distance" });
        return;
      }
      if (this.props.navigation) {
        this.props.navigation.navigate("newPackage");
      }
    };

    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <DismissKeyboardView style={styles.container}>
          {account.verifiedClient ? (
            <DeliverySummaryForm
              name={account.username}
              pickupLocation={pickupLocation}
              pickupTime={pickupTime}
              dropoffLocation={dropoffLocation}
              onPickupFocus={() =>
                this.props.navigation &&
                this.props.navigation.navigate("deliveryRequestDetails")
              }
              onDropoffFocus={() =>
                this.props.navigation &&
                this.props.navigation.navigate("deliveryRequestDetails")
              }
              onSubmit={() =>
                this.props.navigation &&
                this.props.navigation.navigate("deliveryRequestDetails")
              }
            />
          ) : applicationStatus !== null ? (
            applicationStatus === APPLICATION_STATUSES.PENDING ? (
              <View style={styles.containerNotVerified}>
                <Text
                  text="Your application is pending verification"
                  size="regular"
                />
              </View>
            ) : (
              <View style={styles.containerNotVerified}>
                <Text
                  text="Please upload a Facial Picture."
                  size="mediumPlus"
                />
                <View style={styles.picturePicker}>
                  <PicturePicker
                    isButton
                    button={{
                      type: uploading ? "disabled" : "primary",
                      disabled: uploading,
                      children: uploading ? (
                        <ActivityIndicator />
                      ) : (
                        <Text
                          size="medium"
                          text="Upload"
                          fontFamily="rubik-bold"
                        />
                      )
                    }}
                    onSelect={this.handleUpload}
                  />
                </View>
              </View>
            )
          ) : (
            <ActivityIndicator />
          )}
          <Map
            route={
              dropoffLocation && {
                distanceHandler: setDistance,
                origin: {
                  coordinate: pickupLocation
                    ? {
                        latitude: pickupLocation.lat,
                        longitude: pickupLocation.lng
                      }
                    : undefined
                },
                destination: {
                  coordinate: {
                    latitude: dropoffLocation.lat,
                    longitude: dropoffLocation.lng
                  }
                }
              }
            }
            fitToCoordinates={
              pickupLocation &&
              dropoffLocation && [
                {
                  latitude: pickupLocation.lat,
                  longitude: pickupLocation.lng
                },
                {
                  latitude: dropoffLocation.lat,
                  longitude: dropoffLocation.lng
                }
              ]
            }
          />
          {account.verifiedClient && (
            <View style={styles.button}>
              {this.props.navigation.getParam("isEdit", false) ? (
                <Button
                  text="Confirm"
                  onPress={() =>
                    this.props.navigation.navigate("newConfirmation")
                  }
                />
              ) : (
                <Button text="Confirm" onPress={handleConfirm} />
              )}
            </View>
          )}
        </DismissKeyboardView>
      </SafeAreaView>
    );
  }
}

export { DeliverySummaryScreen };

DeliverySummaryScreen.navigationOptions = {
  header: null,
  headerMode: "none"
};

DeliverySummaryScreen.propTypes = {
  pickupLocation: PropTypes.object,
  pickupTime: PropTypes.any,
  dropoffLocation: PropTypes.object,
  showAlert: PropTypes.func,
  setDistance: PropTypes.func,
  distance: PropTypes.number,
  setPickupTime: PropTypes.func,
  setPickupLocation: PropTypes.func,
  navigation: PropTypes.object,
  map: PropTypes.object,
  account: PropTypes.object
};

export default withRedux(
  withNavigation(DeliverySummaryScreen),
  ({ account, newRequest, map }) => ({
    account,
    ...newRequest,
    map
  }),
  {
    showAlert,
    setDropoffLocation,
    setPickupLocation,
    setPickupTime,
    setDistance
  }
);
