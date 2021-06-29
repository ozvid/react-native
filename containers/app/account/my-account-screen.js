import React from "react";
import { View, SafeAreaView, Switch, ScrollView } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import LoadingOverlay from "react-native-loading-spinner-overlay";
import { Linking } from "expo";
import * as Constants from "expo-constants";
import PropTypes from "prop-types";

import screenStyles from "./account.styles";
import colors from "../../../theme/colors";
import { ButtonList, Text, Button, AvatarBlock } from "../../../components";
import { firebaseService } from "../../../services";
import { logout } from "../../auth/auth.actions";
import * as ROLES from "../../../constants/roles";
import { changeLoader } from "../../../components/loading/loading.actions";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";
import * as stripe from "../../../services/stripe";
import ArrowBlockButton from "../../../components/arrow-block-button";
import { getProfile } from "./account.actions";

const LIST_DATA_CLIENT = [
  {
    label: "Account Update",
    to: "updateAccount"
  },
  {
    label: "Payment Info",
    to: "paymentInfo"
  }
];

const LIST_DATA_COURIER = [
  {
    label: "Account Update",
    to: "updateAccount"
  },
  {
    label: "Delivery History",
    to: "requestHistory"
  }
];

const LIST_DATA_2_CLIENT = [
  {
    label: "Terms of Use",
    to: "terms"
  },
  {
    label: "Privacy Policy",
    to: "privacyPolicy"
  }
];

const LIST_DATA_2_COURIER = [
  {
    label: "Terms of Use",
    to: "terms"
  },
  {
    label: "Privacy Policy",
    to: "privacyPolicy"
  },
  {
    label: "Delivery Partner Agreement",
    to: "partnerAgreement"
  }
];

class MyAccountScreen extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: "My Account",
      headerLeft: null
    };
  };

  state = {
    hasStripe: false,
    loading: false
  };

  componentDidMount() {
    Linking.addEventListener("url", this.handleUrl);
  }

  onChangeSwitchCourier = () => {
    const { account, navigation } = this.props;
    const role = account.role === ROLES.COURIER ? ROLES.CLIENT : ROLES.COURIER;

    firebaseService.updateProfile({ role }).then(() => {
      navigation.navigate("loading");
    });
  };

  handleUrl = event => {
    // eslint-disable-next-line no-shadow
    const { showAlert, navigation } = this.props;
    const { queryParams } = Linking.parse(event.url);
    firebaseService
      .createStripeAccount({ access_token: queryParams.code })
      .then(() => navigation.navigate("loading"))
      .catch(err =>
        this.setState(
          {
            loading: false
          },
          () =>
            showAlert({
              message: `Stripe connect error: ${err.message}`
            })
        )
      );
  };

  connectStripe = () => {
    this.setState({ loading: true });
    const {
      account: { email, phoneNumber, username }
    } = this.props;
    const { projectId } = Constants.default.manifest.extra.firebase;
    const redirectUrl =
      Constants.default.appOwnership === "standalone"
        ? `https://us-central1-${projectId}.cloudfunctions.net/handleAccessTokenFromStandalone`
        : `https://us-central1-${projectId}.cloudfunctions.net/handleAccessToken`;
    stripe.oauth(redirectUrl, {
      product_description: "send-asap",
      email,
      first_name: username,
      phone_number: phoneNumber,
      business_type: "individual"
    });
  };

  render() {
    // eslint-disable-next-line no-shadow
    const { navigation, account, logout } = this.props;
    const { hasStripe, loading } = this.state;

    const LIST_DATA_1 =
      account.role === ROLES.COURIER ? LIST_DATA_COURIER : LIST_DATA_CLIENT;

    return (
      <SafeAreaView style={screenStyles.contentContainer}>
        <ScrollView style={screenStyles.fullContainer}>
          <LoadingOverlay visible={loading} />
          <AvatarBlock
            imageURL={account.photoURL}
            style={screenStyles.avatarBlock}
          />
          <View style={screenStyles.buttonsBlock}>
            <ButtonList
              listData={LIST_DATA_1}
              icon="chevron-right"
              styleButton={{ backgroundColor: colors.white }}
            />
            {(account.stripeAccountId && account.role !== ROLES.CLIENT) ||
            hasStripe ? (
              <ArrowBlockButton
                navigation={navigation}
                text="Stripe Connected"
                type="disabled"
              />
            ) : (
              account.role !== ROLES.CLIENT && (
                <ArrowBlockButton
                  navigation={navigation}
                  textType="clear"
                  text="Stripe Connect"
                  onPress={this.connectStripe}
                />
              )
            )}
            <Text text="SendASAP" align="left" style={screenStyles.title_h} />
            {(account.role === ROLES.COURIER || account.wasCourier) && (
              <ArrowBlockButton
                navigation={navigation}
                text="Delivery Partner Mode"
                type="clear"
                rightSide={
                  <Switch
                    trackColor={{
                      true: colors.aquaMarine
                    }}
                    value={account.role === ROLES.COURIER}
                    onValueChange={this.onChangeSwitchCourier}
                  />
                }
              />
            )}
            {account.role !== ROLES.COURIER && !account.wasCourier && (
              <Button
                onPress={() => navigation.navigate("beDeliveryPartner")}
                style={screenStyles.btnCourier}
              >
                <Text
                  size="medium"
                  align="left"
                  color={colors.black}
                  fontFamily="rubik-bold"
                  text="Be a Delivery Partner"
                />
              </Button>
            )}
            <ButtonList
              listData={
                account.role === ROLES.COURIER
                  ? LIST_DATA_2_COURIER
                  : LIST_DATA_2_CLIENT
              }
              icon="chevron-right"
              styleButton={{ backgroundColor: colors.white }}
            />
          </View>
          <ArrowBlockButton
            navigation={navigation}
            type="clear"
            text="Logout"
            onPress={logout}
            style={screenStyles.logoutBlock}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

MyAccountScreen.propTypes = {
  navigation: PropTypes.object,
  account: PropTypes.object,
  logout: PropTypes.func,
  showAlert: PropTypes.func,
  getProfile: PropTypes.func
};

export default connect(
  state => ({
    account: state.account
  }),
  {
    logout,
    changeLoader,
    showAlert,
    getProfile
  }
)(withNavigation(MyAccountScreen));
