import React, { Component } from "react";
import { View, ActivityIndicator, SectionList, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { orderBy, groupBy } from "lodash";
import PropTypes from "prop-types";

import CollectionManager from "../../../../services/firebase/collection";
import { parseStatus } from "../../../../services/utils";
import { Button, Text } from "../../../../components";
import { chevronIconSize, statuses } from "../../../../constants";
import * as screenStyles from "./my-requests.styles";
import { formatDate } from "../../../../utils/date";
import { packageNames } from "../../../../constants/text";

const Packages = new CollectionManager("packages");

class MyRequestsScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: "My Requests",
      headerLeft: null
    };
  };

  state = {
    isLoading: true,
    requests: null
  };

  componentDidMount() {
    const { account } = this.props;
    // eslint-disable-next-line react/prop-types
    this.props.navigation.addListener("willFocus", () => this.fetchPackages());
    this.unSubsPackages = Packages.where(
      "clientId",
      "==",
      account.uid
    ).onSnapshot(() => this.fetchPackages());
  }

  componentWillUnmount() {
    this.unSubsPackages();
  }

  fetchPackages = () => {
    this.setState({ isLoading: true });
    const { account } = this.props;
    Packages.where("clientId", "==", account.uid)
      .get()
      .then(requestsDoc =>
        requestsDoc.docs.map(request => ({ ...request.data(), id: request.id }))
      )
      .then(requests => orderBy(requests, "updated_at", "desc"))
      .then(requests =>
        requests.filter(
          c =>
            c.status !== statuses.cancelled &&
            c.status !== statuses.createdNotPaid
        )
      )
      .then(requests => this.setState({ requests }))
      .catch(() => Alert.alert("Error fetching packages"))
      .finally(() => this.setState({ isLoading: false }));
  };

  renderItem = ({ item, index }) => {
    const isDelivered = item.status === statuses.delivered;
    const date = item.pickupTime ? formatDate(item.pickupTime) : "Just Now";
    const navigation = isDelivered
      ? {
          to: "pastRequest",
          params: {
            package: item,
            title: date
          }
        }
      : {
          to: "request",
          params: {
            package: item
          }
        };

    return (
      <Button
        key={index}
        type="clear"
        style={screenStyles.sectionButton}
        onPress={() =>
          // eslint-disable-next-line react/prop-types
          this.props.navigation.navigate(navigation.to, navigation.params)
        }
      >
        <View>
          <Text
            text={`${packageNames[item.packageType]} Package`}
            size="medium"
            fontFamily="rubik-bold"
            align="left"
          />
          <Text text={date} size="smallPlus" align="left" />
        </View>
        <View style={screenStyles.listItemSectionRight}>
          <Text
            style={!isDelivered && screenStyles.activeStatus}
            text={parseStatus(item.status)}
            size="medium"
          />
          <Feather
            size={chevronIconSize}
            name="chevron-right"
            style={screenStyles.arrow}
          />
        </View>
      </Button>
    );
  };

  renderSectionHeader = title => (
    <Text style={screenStyles.sectionHeader} text={title} size="mediumPlus" />
  );

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" style={screenStyles.indicator} />;
    }
    const requestsGroupedByStatus = groupBy(this.state.requests, r =>
      r.status === statuses.delivered ? "Past Requests" : "Upcoming Requests"
    );
    const sections = Object.keys(requestsGroupedByStatus).map(status => ({
      title: status,
      data: requestsGroupedByStatus[status]
    }));
    sections.sort((a, b) => (b.title === "Upcoming Requests" ? 1 : -1));
    return (
      <SectionList
        style={screenStyles.parentContainer}
        renderItem={item => this.renderItem(item)}
        renderSectionHeader={({ section: { title } }) =>
          this.renderSectionHeader(title)
        }
        sections={sections}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

MyRequestsScreen.propTypes = {
  account: PropTypes.object
};

export default connect(state => ({
  account: state.account
}))(withNavigation(MyRequestsScreen));
