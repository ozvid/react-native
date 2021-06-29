import React from "react";
import { View, SafeAreaView, Alert } from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import * as turf from "@turf/turf";

import { AbsoluteButton, AddressTop } from "../../../../components";
import { styles, colors } from "../../../../theme";
import { statuses } from "../../../../constants";

import { firebaseService } from "../../../../services";
import { Packages, Locations, Users } from "../../../../services/firebase";

import { changeLoader } from "../../../../components/loading/loading.actions";
import FunctionPicker from "../../../../components/picture-picker/function-picker";
import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import CourierMap from "./CourierMap";
import CourierSlidingUp from "./CourierSlidingUp";

const screenStyles = {
  container: {
    flex: 1,
    position: "relative"
  },
  addressTop: {
    position: "absolute",
    alignSelf: "center",
    top: 72,
    zIndex: 1,
    backgroundColor: colors.white
  }
};

class RequestDetailScreen extends FunctionPicker {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  state = {
    mPackage: this.props.navigation.getParam("data"),
    client: null,
    currentLocation: {
      timeLeft: false,
      distance: 0
    }
  };

  packagesUnsubscriber;

  componentDidMount() {
    const packageId = this.state.mPackage.id;
    this.packagesUnsubscriber = Packages.onDocSnapShot(packageId, doc =>
      doc.data().status === statuses.delivered ||
      doc.data().status === statuses.created ||
      doc.data().status === statuses.cancelled
        ? this.props.navigation.navigate("list")
        : doc.data().status !== statuses.cancelled &&
          this.setState({
            mPackage: { id: doc.id, ...doc.data() }
          })
    );
    Users.getDoc(this.state.mPackage.clientId)
      .then(userDoc =>
        this.setState({
          client: userDoc.data()
        })
      )
      .catch(err => Alert.alert(`Error fetching client: ${err.message}`));
  }

  componentWillUnmount() {
    this.packagesUnsubscriber();
  }

  makeTransfer = () => {
    const { navigation } = this.props;
    this.props.changeLoader({ visible: true });
    firebaseService
      .makeTransfer({ package_id: this.state.mPackage.id })
      .then(() => {
        navigation.navigate("requestHistory");
        this.props.changeLoader({ visible: false });
      })
      .catch(err => {
        this.props.changeLoader({ visible: false });
        Alert.alert(err.message);
      });
  };

  handleLocation = (location, prevLocation) => {
    const { mPackage, currentLocation } = this.state;
    if (
      mPackage.status !== statuses.toDropOff &&
      mPackage.status !== statuses.toPickup
    ) {
      return;
    }
    this.setState({
      currentLocation: {
        ...currentLocation,
        ...location,
        bearing: prevLocation
          ? turf.bearing(
              turf.point([prevLocation.latitude, prevLocation.longitude]),
              turf.point([location.latitude, location.longitude])
            )
          : 0
      }
    });
  };

  distanceHandler = (distance, duration) => {
    const { currentLocation, mPackage } = this.state;
    if (
      mPackage.status !== statuses.toDropOff &&
      mPackage.status !== statuses.toPickup
    ) {
      return;
    }
    const data = {
      ...currentLocation,
      timeLeft: duration,
      distance
    };
    Locations.setDoc(mPackage.courierId, data).then(() =>
      this.setState({ currentLocation: data })
    );
  };

  updateStatus = status =>
    Packages.updateDoc(this.state.mPackage.id, { status });

  takePhotoDropOff = () => {
    // eslint-disable-next-line no-shadow
    const { changeLoader } = this.props;
    if (Constants.isDevice) {
      changeLoader({ visible: true });
      this.setStorePhoto(this.state.mPackage.courierId).then(result => {
        Packages.updateDoc(this.state.mPackage.id, {
          status: statuses.arrivedAtDropOffPhotoTaken,
          "packagePhotos.courier": result.url
        }).then(() => {
          changeLoader({ visible: false });
        });
      });
    } else {
      this.updateStatus(statuses.arrivedAtDropOffPhotoTaken);
    }
  };

  takePhotoPickUp = () => {
    // eslint-disable-next-line no-shadow
    const { changeLoader } = this.props;
    if (Constants.isDevice) {
      changeLoader({ visible: true });
      this.setStorePhoto(this.state.mPackage.courierId).then(result => {
        Packages.updateDoc(this.state.mPackage.id, {
          status: statuses.toDropOff,
          "packagePhotos.courier_pick_up": result.url
        }).then(() => {
          changeLoader({ visible: false });
        });
      });
    } else {
      this.updateStatus(statuses.toDropOff);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <View style={screenStyles.container}>
          <AbsoluteButton onPress={this.props.navigation.goBack} />

          <AddressTop
            pickupLocation={this.state.mPackage.from.address}
            dropoffLocation={this.state.mPackage.to.address}
            style={screenStyles.addressTop}
          />
          <CourierMap
            data={this.state.mPackage}
            distanceHandler={this.distanceHandler}
            handleLocation={this.handleLocation}
            currentLocation={this.state.currentLocation}
          />
        </View>
        <CourierSlidingUp
          showAlert={this.props.showAlert}
          changeLoader={this.props.changeLoader}
          data={this.state.mPackage}
          client={this.state.client}
          takePhotoDropOff={this.takePhotoDropOff}
          takePhotoPickUp={this.takePhotoPickUp}
          currentLocation={this.state.currentLocation}
          navigation={this.props.navigation}
        />
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    account: state.account
  }),
  {
    changeLoader,
    showAlert
  }
)(withNavigation(RequestDetailScreen));
