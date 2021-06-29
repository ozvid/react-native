import React from "react";
import moment from "moment";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import _ from "lodash";
import {
  View,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

import {
  SlidingUp,
  AvatarBlock,
  Text,
  AddressBlock,
  ArrowBlockButton,
  Button
} from "../../../../components";
import { STATUSES_TEXT_COURIER, statuses } from "../../../../constants";
import { Packages, cancelOrderCourier } from "../../../../services/firebase";
import screenStyles from "../upcoming.styles";
import { colors } from "../../../../theme";

const CourierSlidingUp = ({
  data,
  client,
  takePhotoDropOff,
  takePhotoPickUp,
  currentLocation,
  navigation,
  showAlert,
  changeLoader
}) => {
  const updateStatus = status => Packages.updateDoc(data.id, { status });

  const displayPickUpTime = moment(data.pickupTime.seconds * 1000).format(
    "h:mm a"
  );

  const showPickUpReminder = () => {
    showAlert({
      title: "Reminder",
      message:
        "Visually inspect the package for illegality and damages. Please note any damages and have the sender agree to the damages before accepting it. If you suspect any illegal activity at your discretion, you can refuse to accept the package and must notify SendASAP immediately.",
      onConfirm: false
    });
    updateStatus(statuses.arrived);
  };

  const showDisclaimer = () => {
    showAlert({
      message: "Are you sure to cancel request?",
      buttonText: "Ok",
      onConfirm: () => {
        changeLoader({ visible: true });
        cancelOrderCourier({ packageId: data.id })
          .then(() => {
            changeLoader({ visible: false });
            navigation.goBack(null);
          })
          .catch(err => {
            changeLoader({ visible: false });
            Alert.alert(err.message);
          });
      }
    });
  };

  const renderBottomPanel = () => {
    return (
      <React.Fragment>
        {client ? (
          <React.Fragment>
            <View style={screenStyles.blockInfoUser}>
              <AvatarBlock imageURL={client.photoURL} />
              <View style={{ paddingLeft: 20 }}>
                <Text
                  size="medium"
                  align="left"
                  fontFamily="rubik-bold"
                  text={client.username}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${client.phoneNumber}`)}
                >
                  <View style={screenStyles.iconPhoneLabel}>
                    <FontAwesome
                      name="phone"
                      size={16}
                      color={colors.warmGrey}
                    />
                    <Text
                      size="medium"
                      style={{ paddingLeft: 5 }}
                      color={colors.warmGrey}
                      text={`Call ${client.username}`}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <AddressBlock data={data} />
            <View style={{ ...screenStyles.topLine, paddingHorizontal: 15 }}>
              <ArrowBlockButton
                navigation={navigation}
                text="Package Details"
                to="packageDetails"
                params={{ package: data }}
              />
              <Button
                type="clear"
                style={{ ...screenStyles.blockButton, ...screenStyles.centred }}
                onPress={showDisclaimer}
              >
                <Text
                  size="medium"
                  align="left"
                  text="Cancel Order"
                  color="alert"
                />
              </Button>
              {/* <ArrowBlockButton text="Need Help?" to="" /> */}
            </View>
          </React.Fragment>
        ) : (
          <View style={screenStyles.loadingBlock}>
            <ActivityIndicator />
          </View>
        )}
      </React.Fragment>
    );
  };

  return (
    <SlidingUp
      data={() => {
        switch (data.status) {
          case statuses.courierAssigned:
            return {
              ...STATUSES_TEXT_COURIER.courierAssigned(
                currentLocation.timeLeft,
                currentLocation.distance,
                displayPickUpTime,
                _.get(client, "username")
              ),
              button: {
                buttonText: "Start Request",
                onButtonPress: () => updateStatus(statuses.toPickup)
              },
              content: renderBottomPanel()
            };
          case statuses.toPickup:
            return {
              ...STATUSES_TEXT_COURIER.toPickup(
                currentLocation.timeLeft,
                currentLocation.distance,
                displayPickUpTime,
                _.get(client, "username")
              ),
              button: {
                buttonText: "Arrived",
                onButtonPress: showPickUpReminder
              },
              content: renderBottomPanel()
            };
          case statuses.arrived:
            return {
              ...STATUSES_TEXT_COURIER.arrived(_.get(client, "username")),
              button: {
                buttonText: "Take Photo to Confirm Pickup",
                onButtonPress: takePhotoPickUp
              },
              content: renderBottomPanel()
            };
          case statuses.toDropOff:
            return {
              ...STATUSES_TEXT_COURIER.toDropOff(
                currentLocation.timeLeft,
                currentLocation.distance,
                displayPickUpTime
              ),
              button: {
                buttonText: "Arrived",
                onButtonPress: () => updateStatus(statuses.arrivedAtDropOff)
              },
              content: renderBottomPanel()
            };
          case statuses.arrivedAtDropOff:
            return {
              ...STATUSES_TEXT_COURIER.arrivedAtDropOff,
              button: {
                buttonText: "Take Photo",
                onButtonPress: takePhotoDropOff
              },
              content: renderBottomPanel()
            };
          case statuses.arrivedAtDropOffPhotoTaken:
            return {
              ...STATUSES_TEXT_COURIER.arrivedAtDropOffPhotoTaken,
              button: {
                buttonText: "Confirm Drop off",
                onButtonPress: () => updateStatus(statuses.pendingConfirmation)
              },
              content: renderBottomPanel()
            };
          case statuses.pendingConfirmation:
            return {
              ...STATUSES_TEXT_COURIER.pendingConfirmation,
              content: renderBottomPanel()
            };
          default:
            return {};
        }
      }}
    />
  );
};

export default CourierSlidingUp;
