import React, { Component } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";

import { styles, colors } from "../../../../theme";
import componentStyles from "./styles";
import screenStyles from "../account.styles";
import { Text, Map, ArrowBlockButton } from "../../../../components";
import AddressBlock from "../../../../components/address-block";
import Rate from "../../my-requests/request-screen/components/Rate";
import { Transfers } from "../../../../services/firebase";

class RequestDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Request Details"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      amount: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.getParam("data");
    Transfers.where("package_id", "==", data.id)
      .get()
      .then(response => response.docs[0])
      .then(doc => (doc ? (doc.data().amount / 100).toFixed(2) : 0))
      .then(amount => this.setState({ amount }));
  }

  render() {
    const { amount } = this.state;
    const { navigation } = this.props;

    const data = navigation.getParam("data");

    return (
      <SafeAreaView style={screenStyles.contentContainer}>
        <ScrollView>
          <View style={styles.fullContainer}>
            <View style={{ backgroundColor: colors.white }}>
              <Map
                showsUserLocation={false}
                route={{
                  origin: { coordinate: data.from },
                  destination: { coordinate: data.to }
                }}
                style={{ height: 200 }}
                initialRegion={data.from}
                fitToCoordinates={[data.from, data.to]}
              />
              <AddressBlock data={data} />
              <ArrowBlockButton
                navigation={this.props.navigation}
                text="Package Details"
                to="packageDetails"
                params={{ package: data }}
              />
              <View>
                <View style={componentStyles.priceContainer}>
                  <Text fontFamily="rubik-bold" size="medium" text="Total:" />
                  <Text size="medium" text={`$${amount}`} />
                </View>
              </View>
              {data.rate && (
                <View style={componentStyles.rateContainer}>
                  <Text size="medium" text="Rate:" fontFamily="rubik-bold" />
                  <View style={componentStyles.rateContainerInner}>
                    <Rate rate={data.rate} readOnly />
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

RequestDetailScreen.propTypes = {
  navigation: PropTypes.object
};

export default connect()(withNavigation(RequestDetailScreen));
