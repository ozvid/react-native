import React, { Component } from "react";
import { SafeAreaView, View, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { styles, colors } from "../../../../theme";
import screenStyles from "../open-request.styles";
import styleButtonList from "../../../../components/button-list/button-list.styles";
import { HandleButton, Text, Button } from "../../../../components";
import AddressBlock from "../../../../components/address-block";
import Map from "../../../../components/map";
import { firebaseService } from "../../../../services";
import { statuses } from "../../../../constants";
import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";

class RequestDetailScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: "Request Details"
    };
  };

  showDisclaimer = () => {
    this.props.showAlert({
      message:
        "By accepting this request, you agree to thoroughly inspect the package(s) you will be carrying for illegal activities and damages and will not accept and carry unlawful material. Make sure the sender adheres to the “Open Box” Policy and seal the package(s) in your presence.",
      title: "Disclaimer",
      buttonText: "Confirm",
      onConfirm: this.acceptRequest
    });
  };

  acceptRequest = () => {
    const { navigation, account } = this.props;
    const data = navigation.getParam("data");

    setTimeout(() => {
      if (!account.stripeAccountId) {
        Alert.alert("Please connect your Stripe account to accept requests.");
        navigation.navigate("myAccount");
        return;
      }

      if (!account.car) {
        Alert.alert("Please, fill in your car details.");
        navigation.navigate("updateCarInfo");
        return;
      }

      firebaseService
        .updatePackage(data.id, {
          status: statuses.courierAssigned,
          courierId: account.uid,
          courierStripeAccountId: account.stripeAccountId
        })
        .then(() => navigation.navigate("list", { goToUpcoming: true }))
        .catch(err => Alert.alert(err.message));
    }, 1000);
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("data");

    return (
      <SafeAreaView style={styles.fullContainer}>
        <ScrollView style={styles.fullContainer}>
          <Map
            showsUserLocation={false}
            route={{
              origin: { coordinate: data.from },
              destination: { coordinate: data.to }
            }}
            style={{ height: 200 }}
            fitToCoordinates={[data.from, data.to]}
            initialRegion={data.from}
          />
          <View style={{ backgroundColor: colors.white }}>
            <AddressBlock data={data} />
            <Button
              type="clear"
              style={{
                ...styleButtonList.button,
                backgroundColor: colors.white
              }}
              onPress={() =>
                navigation.navigate("packageDetails", {
                  package: {
                    ...data,
                    description: false
                  }
                })
              }
            >
              <View>
                <Text size="medium" align="left" text="Package Details" />
              </View>
              <Feather name="chevron-right" size={23} color={colors.black} />
            </Button>
            <View
              style={{ ...screenStyles.blockInfoItem, paddingHorizontal: 30 }}
            >
              <Text
                size="medium"
                text="Estimated amount:"
                fontFamily="rubik-bold"
              />
              <Text size="medium" text={`$${(data.price * 0.8).toFixed(2)} `} />
            </View>
            <HandleButton
              textButton="Accept Request"
              style={{
                paddingHorizontal: 30,
                paddingVertical: 30,
                ...styles.handleSubmitBottom
              }}
              handleSubmit={this.showDisclaimer}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

RequestDetailScreen.propTypes = {
  account: PropTypes.object,
  navigation: PropTypes.object,
  showAlert: PropTypes.func
};

export default connect(
  state => ({
    account: state.account
  }),
  {
    showAlert
  }
)(withNavigation(RequestDetailScreen));
