import React, { Component } from "react";
import { Alert, View, Linking } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

import theme from "../../theme";
import screenStyles from "./address-block.styles";
import Text from "../text";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class AddressBlock extends Component {
  openMapPickupLocation = address => {
    if (address == undefined) {
      Alert.alert("Can't find Pickup location");
    } else {
      let f = Platform.select({
        ios: () => {
          Linking.openURL("http://maps.apple.com/maps?daddr=" + address);
        },
        android: () => {
          console.log("ANDROID");
          Linking.openURL(
            "http://maps.google.com/maps?daddr=" + address
          ).catch(err => console.error("An error occurred", err));
        }
      });

      f();
    }
  };

  openDropOffLocation = address => {
    if (address == undefined) {
      Alert.alert("Can't find Drop off location");
    } else {
      let f = Platform.select({
        ios: () => {
          Linking.openURL("http://maps.apple.com/maps?daddr=" + address);
        },
        android: () => {
          console.log("ANDROID");
          Linking.openURL(
            "http://maps.google.com/maps?daddr=" + address
          ).catch(err => console.error("An error occurred", err));
        }
      });

      f();
    }
  };
  render() {
    const {
      data = {
        to: {
          address: ""
        },
        from: {
          address: ""
        }
      }
    } = this.props;

    return (
      <View style={screenStyles.blockMInfo}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 0.1,
            paddingTop: 15,
            paddingBottom: 30
          }}
        >
          <MaterialCommunityIcons
            size={24}
            name="circle-small"
            color={theme.colors.aquaMarine}
          />
          <View
            style={{
              width: 2,
              height: 41,
              backgroundColor: theme.colors.veryLightGrey
            }}
          />
          <MaterialCommunityIcons
            size={24}
            name="circle-small"
            color={theme.colors.black}
          />
        </View>
        <View style={theme.styles.fullContainer}>
          <TouchableOpacity
            onPress={() => this.openMapPickupLocation(data.from.address)}
          >
            <View style={screenStyles.blockInfoItem}>
              <View>
                <Text
                  size="medium"
                  align="left"
                  text="Pickup"
                  fontFamily="rubik-bold"
                />
                <Text
                  color={theme.colors.warmGrey}
                  align="left"
                  text={moment(data.pickupTime.seconds * 1000).format("h:mm a")}
                />
              </View>
              <View style={theme.styles.fullContainer}>
                <Text text={data.from.address} align="right" size="medium" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.openDropOffLocation(data.to.address)}
          >
            <View style={screenStyles.blockInfoItem}>
              <View style={theme.styles.fullContainer}>
                <Text
                  size="medium"
                  align="left"
                  text="Dropdoff"
                  fontFamily="rubik-bold"
                />
                <Text
                  color={theme.colors.warmGrey}
                  align="left"
                  text={`${moment(data.pickupTime.seconds * 1000)
                    .add(30, "minutes")
                    .format("h:mm")}-${moment(data.pickupTime.seconds * 1000)
                    .add(35, "minutes")
                    .format("h:mm a")}`}
                />
              </View>

              <View style={theme.styles.fullContainer}>
                <Text text={data.to.address} align="right" size="medium" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
