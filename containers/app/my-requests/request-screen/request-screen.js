import React, { Component } from "react";
import { View, SafeAreaView, Alert } from "react-native";
import { connect } from "react-redux";
import LoadingOverlay from "react-native-loading-spinner-overlay";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import PropTypes from "prop-types";

import { changeLoader } from "../../../../components/loading/loading.actions";
import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import * as screenStyles from "./request.styles";
import { styles } from "../../../../theme";
import { statuses } from "../../../../constants/index";
import CollectionManager from "../../../../services/firebase/collection";
import { AbsoluteButton, AddressTop } from "../../../../components";
import { firebaseService } from "../../../../services";
import ClientMap from "./components/ClientMap";
import ClientSlidingUp from "./components/ClientSlidingUp";
import { Users } from "../../../../services/firebase";

export const STATUSES = [
  "created",
  "courier_assigned",
  "to_pickup",
  "arrived",
  "to_drop_off",
  "arrived_at_drop_off",
  "arrived_at_drop_off_photo_taken",
  "delivered"
];

const locations = new CollectionManager("locations");
const packages = new CollectionManager("packages");

class RequestScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  state = {
    courier: null,
    confirming: false,
    courierLocation: null,
    package: this.props.navigation.getParam("package")
  };

  packagesUnsubscriber;

  locationUnsubscriber;

  componentDidMount() {
    const packageId = this.state.package.id;
    this.packagesUnsubscriber = packages.onDocSnapShot(packageId, doc => {
      if (doc.data().status !== statuses.cancelled) {
        this.setState({ package: { id: doc.id, ...doc.data() } }, () => {
          if (_.get(doc.data(), "courierId")) {
            this.handleCourierInformation(doc.data().courierId);
          }
        });
      }
    });
    if (this.state.package.courierId) {
      this.handleCourierInformation(this.state.package.courierId);
    }
  }

  componentWillUnmount() {
    this.packagesUnsubscriber();
    if (this.locationUnsubscriber) {
      this.locationUnsubscriber();
    }
  }

  handleCourierInformation = courierId => {
    if (!this.locationUnsubscriber) {
      this.locationUnsubscriber = locations.onDocSnapShot(courierId, doc =>
        this.setState({ courierLocation: doc.data() })
      );
    }
    if (!this.state.courier) {
      Users.getDoc(courierId).then(userDoc =>
        this.setState({
          courier: userDoc.data()
        })
      );
    }
  };

  confirmRequest = (rate, tips) => {
    this.props.changeLoader({ visible: true });

    const packageId = this.state.package.id;
    this.packagesUnsubscriber();

    firebaseService
      .makeTransfer({ package_id: packageId })
      .then(() => rate && packages.updateDoc(packageId, { rate }))
      .then(
        () =>
          tips &&
          firebaseService
            .payTips({ packageId, tips })
            .then(() => packages.updateDoc(packageId, { tips }))
      )
      .then(() => {
        this.props.changeLoader({ visible: false });
        this.props.navigation.navigate("myRequestsList");
        this.props.showAlert({
          title: "Message",
          message: `Thanks for using our service!${
            rate ? " Your rate have been saved." : ""
          }`
        });
      })
      .catch(err => {
        this.props.changeLoader({ visible: false });
        Alert.alert(err.message);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <LoadingOverlay visible={this.state.confirming} />

        <View style={screenStyles.parentContainer}>
          <AbsoluteButton
            icon="chevron-left"
            onPress={this.props.navigation.goBack}
          />
          <AddressTop
            pickupLocation={this.state.package.from.address}
            dropoffLocation={this.state.package.to.address}
            style={screenStyles.addressTopStyles}
          />
          <ClientMap
            data={this.state.package}
            courierLocation={this.state.courierLocation}
          />
          <ClientSlidingUp
            data={this.state.package}
            courier={this.state.courier}
            confirmRequest={this.confirmRequest}
          />
        </View>
      </SafeAreaView>
    );
  }
}

RequestScreen.propTypes = {
  navigation: PropTypes.object,
  changeLoader: PropTypes.func,
  showAlert: PropTypes.func
};

export default connect(null, {
  changeLoader,
  showAlert
})(withNavigation(RequestScreen));
