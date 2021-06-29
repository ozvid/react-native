import React, { Component } from "react";
import { SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { groupBy, sortBy } from "lodash";
import moment from "moment";
import { Feather } from "@expo/vector-icons";

import screenStyles from "./account.styles";
import { SectionList } from "../../../components";
import { statuses } from "../../../constants";
import colors from "../../../theme/colors";
import { Packages } from "../../../services/firebase";
import * as utils from "../../../services/utils";

class ListRequestScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Delivery History"
    };
  };

  state = {
    packages: null,
    isLoading: false
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", () => this.fetchPackages());
  }

  fetchPackages = () => {
    this.setState({ isLoading: true });
    let startAt = new Date();
    startAt.setHours(0, 0, 0, 0);

    Packages.where("courierId", "==", this.props.account.uid)
      .get()
      .then(packagesDoc =>
        packagesDoc.docs
          .map(packageDoc => ({
            label: `${packageDoc.data().from.address}, ${
              packageDoc.data().to.address
            }`,
            b_label: utils.parseStatus(packageDoc.data().status),
            id: packageDoc.id,
            created_timestamp_at: packageDoc.data().created_at.seconds * 1000,
            ...packageDoc.data()
          }))
          .filter(
            c =>
              c.status === statuses.delivered || c.status === statuses.cancelled
          )
      )
      .then(packages => sortBy(packages, "pickupTime").reverse())
      .then(packages => this.setState({ packages }))
      .catch(() => Alert.alert("Error fetching packages"))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { isLoading, packages } = this.state;

    const groupDataList = groupBy(packages, r =>
      moment(r.pickupTime.seconds * 1000).format("MMMM DD, YYYY")
    );

    const sections = Object.keys(groupDataList).map(key => ({
      title: key,
      data: groupDataList[key]
    }));

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

export default connect(state => ({
  account: state.account
}))(withNavigation(ListRequestScreen));
