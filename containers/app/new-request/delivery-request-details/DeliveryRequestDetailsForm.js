import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-modal-datetime-picker";
import { pickBy, identity } from "lodash";

import moment from "moment";
import SendAsapTextInput from "../../../../components/text-input/SendAsapTextInput";
import colors from "../../../../theme/colors";
import fonts from "../../../../constants/fonts";
import { googleMaps } from "../../../../services";
import { Text } from "../../../../components";
import { getComponents } from "../../../../utils/geo";

const styles = {
  place: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "flex-start",
    borderBottom: "solid",
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightGreyThree
  },
  container: {
    backgroundColor: colors.white,
    padding: 30,
    borderBottom: "solid",
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightGreyThree,
    paddingTop: 14
  }
};

class DeliveryRequestDetailsForm extends React.Component {
  state = {
    focusedInputName: null,
    isDateTimePickerVisible: false,
    pickupLocation: undefined,
    pickupTime: undefined,
    dropoffLocation: undefined,
    places: []
  };

  componentWillMount() {
    const { pickupLocation, pickupTime, dropoffLocation } = this.props;
    this.setState({
      pickupLocation,
      pickupTime,
      dropoffLocation
    });
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  renderPlace = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          googleMaps.getPlaceDetails(item.place_id).then(response => {
            const data = response.data.result.address_components;
            const { state } = pickBy(getComponents(data), identity);
            const longComponents = pickBy(getComponents(data, true), identity);
            const location = {
              description: item.formatted_address,
              mainText: item.name,
              secondaryText: item.name,
              address: item.formatted_address,
              components: { ...longComponents, state },
              ...item.geometry.location
            };
            if (this.state.focusedInputName === "pickup") {
              this.props.onPickupLocationSelected(location);
              this.setState({ pickupLocation: location });
            } else {
              this.props.onDropoffLocationSelected(location);
              this.setState({ dropoffLocation: location });
            }
          });
        }}
        style={styles.place}
      >
        <Text text={item.name} size="mediumPlus" numberOfLines={1} />
        <Text text={item.formatted_address} size="medium" numberOfLines={1} />
      </TouchableOpacity>
    );
  };

  render() {
    const { props } = this;
    const { onCancel = () => ({}), onPickupTimeSelected = () => ({}) } = props;
    let title = "";
    switch (this.state.focusedInputName) {
      case "time":
        title = "Choose a pickup time";
        break;
      case "pickup":
        title = "Where to pickup?";
        break;
      case "dropoff":
      default:
        title = "Where to deliver?";
    }
    return (
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity
              style={{ ...fonts.listItemText, width: 30, marginBottom: 8 }}
              onPress={onCancel}
            >
              <Ionicons color={colors.black} name="md-close" size={30} />
            </TouchableOpacity>
            <Text style={{ ...fonts.screenTitle, marginBottom: 20 }}>
              {title}
            </Text>

            <SendAsapTextInput
              style={{ marginBottom: 20 }}
              value={
                this.state.pickupLocation && this.state.pickupLocation.address
              }
              label="Pickup"
              placeholder="Current location"
              placeholderTextColor={colors.aquaMarine}
              onPress={() => {
                this.setState({ focusedInputName: "pickup" });
              }}
              onChangeText={val => {
                this.setState({ pickupLocation: null });
                clearTimeout(this.timeOut);
                if (val.length > 2) {
                  this.timeOut = setTimeout(() => {
                    googleMaps
                      .searchLocation({ location: val })
                      .then(res => this.setState({ places: res.data.results }))
                      .catch(err => Alert.alert(err.message));
                  }, 500);
                }
              }}
            />

            <SendAsapTextInput
              style={{ marginBottom: 20 }}
              value={
                this.state.pickupTime &&
                moment(this.state.pickupTime).format("MMMM DD h:mm a")
              }
              label="Time"
              placeholder="Select Time"
              onPress={() => {
                this.setState({ focusedInputName: "time" });
                this.showDateTimePicker();
              }}
              onChangeText={val => {
                this.setState({ pickupTime: val.toString() });
                onPickupTimeSelected(undefined);
              }}
            />

            <SendAsapTextInput
              label="Drop off"
              value={
                this.state.dropoffLocation && this.state.dropoffLocation.address
              }
              placeholder="Type a location"
              textInputLeftPadding={63}
              listTop={60}
              onFocus={() => {
                this.setState({ focusedInputName: "dropoff" });
              }}
              onChangeText={val => {
                this.setState({ dropoffLocation: null });
                clearTimeout(this.timeOut);
                if (val.length > 2) {
                  this.timeOut = setTimeout(() => {
                    googleMaps
                      .searchLocation({ location: val })
                      .then(res => this.setState({ places: res.data.results }))
                      .catch(err => Alert.alert(err.message));
                  }, 1000);
                }
              }}
            />
          </View>
        </SafeAreaView>
        {this.state.places.length > 0 && (
          <View style={{ flex: 1, backgroundColor: colors.white }}>
            <FlatList
              data={this.state.places}
              renderItem={this.renderPlace}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.isDateTimePickerVisible}
          minimumDate={moment().toDate()}
          onCancel={this.hideDateTimePicker}
          onConfirm={val => {
            this.setState({ pickupTime: val.toString() });
            onPickupTimeSelected(val);
            this.hideDateTimePicker();
          }}
        />
      </View>
    );
  }
}

export default DeliveryRequestDetailsForm;
