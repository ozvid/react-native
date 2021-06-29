import React, { Component } from "react";
import { SafeAreaView, ActivityIndicator, Alert, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { groupBy, get, sortBy } from "lodash";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { change } from "redux-form";

import screenStyles from "./open-request.styles";
import { SectionList, Text, Button } from "../../../components";
import { Packages, Applications } from "../../../services/firebase";
import { colors } from "../../../theme";
import { Capitalize } from "../../../services/utils";
import { APPLICATION_STATUSES, FORMS } from "../../../constants";

const styles = {
  containerNotVerified: {
    backgroundColor: colors.white,
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  button: {
    marginTop: 15
  }
};

class ListRequestScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: "Open Request",
      headerLeft: null
    };
  };

  state = {
    packages: [],
    isLoading: false,
    applicationStatus: null
  };

  componentDidMount() {
    const { account } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    if (account.verifiedCourier) {
      this.setOpenPackagesListener();
    } else if (get(account, "deliveryPartnerApplication")) {
      this.unSubsApplication = this.userApplicationListener(account);
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
    if (this.unSubsApplication) {
      this.unSubsApplication();
    }
  }

  userApplicationListener = account =>
    Applications.onDocSnapShot(account.deliveryPartnerApplication, () =>
      this.loadApplicationStatus(account)
    );

  loadApplicationStatus = account =>
    Applications.getDoc(account.deliveryPartnerApplication)
      .then(applicationDoc => {
        if (applicationDoc.exists) {
          if (
            applicationDoc.data().status === APPLICATION_STATUSES.VERIFIED &&
            !account.verifiedCourier
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
      .catch(err => Alert.alert(err.message))
      .finally(() => this.setState({ isLoading: false }));

  setOpenPackagesListener = () => {
    this.props.navigation.addListener("willFocus", () => this.fetchPackages());
    this.unSubs = Packages.where("status", "==", "created").onSnapshot(() =>
      this.fetchPackages()
    );
  };

  fetchPackages = () => {
    this.setState({ isLoading: true });
    const { account } = this.props;
    Packages.where("status", "==", "created")
      .get()
      .then(packagesDoc =>
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
              c.pickupTime.seconds >
                moment()
                  .startOf("day")
                  .unix() && c.clientId !== account.uid
          )
      )
      .then(packages => sortBy(packages, "created_at").reverse())
      .then(packages => this.setState({ packages }))
      .catch(err =>
        Alert.alert(`Error while fetching packages: ${err.message}`)
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  handlePassVerification = () => {
    // eslint-disable-next-line no-shadow
    const { change, account, navigation } = this.props;
    if (get(account, "deliveryPartnerApplication")) {
      change(
        FORMS.BE_DELIVERY_PARTNER,
        "applicationId",
        account.deliveryPartnerApplication
      );
    }
    navigation.navigate("beDeliveryPartner");
  };

  render() {
    const { isLoading, packages, applicationStatus } = this.state;
    const { account } = this.props;
    if (this.props.navigation.getParam("goToUpcoming", false)) {
      this.props.navigation.setParams({ goToUpcoming: false });
      this.props.navigation.navigate("upcoming");
    }

    const groupDataList = groupBy(packages, r => {
      const date = new Date(r.pickupTime.seconds * 1000);
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

    return (
      <SafeAreaView style={screenStyles.contentContainer}>
        {// eslint-disable-next-line no-nested-ternary
        isLoading ? (
          <ActivityIndicator
            size="large"
            style={screenStyles.indicatorColors}
          />
        ) : // eslint-disable-next-line no-nested-ternary
        account.verifiedCourier ? (
          <SectionList
            childrenIcon={
              <Feather name="chevron-right" size={23} color={colors.black} />
            }
            sections={sections}
            // eslint-disable-next-line react/destructuring-assignment
            navigation={this.props.navigation}
            to="requestDetail"
          />
        ) : (
          applicationStatus !== null &&
          (applicationStatus === APPLICATION_STATUSES.PENDING ? (
            <View style={styles.containerNotVerified}>
              <Text
                text="Your application is pending verification"
                size="regular"
              />
            </View>
          ) : (
            <View style={styles.containerNotVerified}>
              <Text
                text="Please pass verification to deliver packages"
                size="mediumPlus"
              />
              <View style={styles.button}>
                <Button
                  onPress={this.handlePassVerification}
                  text="Pass Verification"
                />
              </View>
            </View>
          ))
        )}
      </SafeAreaView>
    );
  }
}

ListRequestScreen.propTypes = {
  navigation: PropTypes.object,
  account: PropTypes.object,
  change: PropTypes.func
};

export default connect(
  state => ({
    account: state.account
  }),
  {
    change
  }
)(withNavigation(ListRequestScreen));
