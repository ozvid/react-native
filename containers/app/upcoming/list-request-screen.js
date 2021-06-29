import React, { Component } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Image,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { groupBy, sortBy } from "lodash";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import * as geofirex from "geofirex";

import screenStyles from "./upcoming.styles";
import { SectionList, Text, HandleButton } from "../../../components";
import { statuses } from "../../../constants";
import globalStyles from "../../../theme/global-styles";
import * as IMAGES from "../../../constants/images";
import colors from "../../../theme/colors";
import { Packages, Locations } from "../../../services/firebase";
import { Capitalize } from "../../../services/utils";
import { fetchGrantedLocationPermissionsAsync } from "../../../utils/geo";

class ListRequestScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Upcoming Request",
      headerLeft: null,
      locationSubscription: null
    };
  };

  state = {
    packages: null,
    isLoading: false
  };

  componentDidMount() {
    const { navigation, account } = this.props;
    navigation.addListener("willFocus", () => this.fetchPackages());
    const geo = geofirex.init(firebase);
    fetchGrantedLocationPermissionsAsync()
      .then(() =>
        Location.watchPositionAsync(
          {
            accuracy: 3,
            timeInterval: 3000,
            distanceInterval: 10
          },
          ({ coords }) => {
            const position = geo.point(coords.latitude, coords.longitude);
            return Locations.setDoc(
              account.id,
              { position, id: account.id },
              { merge: true }
            );
          }
        )
      )
      .then(locationSubscription => {
        this.setState({ locationSubscription });
      });
  }

  componentWillUnmount() {
    if (this.state.locationSubscription) {
      this.state.locationSubscription.remove();
    }
  }

  fetchPackages = () => {
    this.setState({ isLoading: true });
    Packages.where("courierId", "==", this.props.account.uid)
      .get()
      .then(
        packagesDoc =>
          packagesDoc.docs
            .map(c => ({
              id: c.id,
              label: Capitalize(
                `${c.data().from.address}, ${c.data().to.address}`
              ),
              b_label: moment(c.data().pickupTime.seconds * 1000).format(
                "h:mm a"
              ),
              ...c.data()
            }))
            .filter(
              c =>
                c.status !== statuses.delivered &&
                c.status !== statuses.cancelled
            )
        // .filter(
        //   c =>
        //     c.pickupTime.seconds >
        //     moment()
        //       .startOf("day")
        //       .unix()
        // )
      )
      .then(packages =>
        this.setState({ packages: sortBy(packages, "pickupTime").reverse() })
      )
      .catch(err =>
        Alert.alert(`Error while fetching packages: ${err.message}`)
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  renderEmpty = () => {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <View style={globalStyles.container}>
          <View style={globalStyles.containerV2}>
            <Image
              source={IMAGES.NO_REQUEST}
              style={{ width: 200, height: 189 }}
            />
            <Text
              align="center"
              size="exRegular"
              fontFamily="rubik-bold"
              style={globalStyles.title}
              text="Looks like you don’t have a upcoming request."
            />
          </View>
          <HandleButton
            style={globalStyles.handleSubmitBottom}
            textButton="See Open Requests"
            handleSubmit={() => navigation.navigate("openRequest")}
          />
        </View>
      </SafeAreaView>
    );
  };

  render() {
    const { isLoading, packages } = this.state;

    const groupDataList = groupBy(packages, r => {
      const date = new Date(r.created_timestamp_at);
      date.setHours(0, 0, 0, 0);

      if (moment().diff(date) > 1) {
        return "Today";
      }
      if (moment().diff(date) > 2) {
        return "Tomorrow";
      }
      return moment(r.pickupTime.seconds * 1000).format("MMMM DD");
    });

    const sections = Object.keys(groupDataList).map(key => ({
      title: key,
      data: groupDataList[key]
    }));
    if (packages && packages.length === 0) {
      return this.renderEmpty();
    }

    return (
      <SafeAreaView style={screenStyles.contentContainer}>
        {isLoading && (
          <ActivityIndicator size="large" style={{ paddingTop: 30 }} />
        )}
        {!isLoading && (
          <SectionList
            childrenIcon={
              <Feather name="chevron-right" size={23} color={colors.black} />
            }
            sections={sections}
            navigation={this.props.navigation}
            to="requestDetail"
          />
        )}
      </SafeAreaView>
    );
  }
}

ListRequestScreen.propTypes = {
  navigation: PropTypes.object,
  account: PropTypes.object
};

export default connect(state => ({
  account: state.account
}))(withNavigation(ListRequestScreen));
