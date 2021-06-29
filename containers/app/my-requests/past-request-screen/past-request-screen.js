import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import _ from "lodash";

import * as screenStyles from "./past-request.styles";
import { Text } from "../../../../components";
import { styles, colors } from "../../../../theme";
import globalStyles from "../../../../theme/global-styles";
import AddressBlock from "../../../../components/address-block/address-block";
import Map from "../../../../components/map/map";
import ArrowBlockButton from "../../../../components/arrow-block-button";
import Rate from "../request-screen/components/Rate";

class PastRequestScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("title", "Request")
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      package: props.navigation.getParam("package")
    };
  }

  render() {
    const data = this.state.package;
    return (
      <ScrollView style={screenStyles.parentContainer}>
        <View style={[styles.fullContainer, { backgroundColor: colors.white }]}>
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
          <AddressBlock data={this.state.package} />
          <ArrowBlockButton
            navigation={this.props.navigation}
            text="Package Details"
            to="packageDetails"
            params={{ package: this.state.package }}
          />
          {/* <View
            style={{ ...screenStyles.blockInfoItem, paddingHorizontal: 30 }}
          >
            <Text size="medium" text="Subtotal:" />
            <Text size="medium" text="$19.99" />
          </View>
          <View
            style={{ ...screenStyles.blockInfoItem, paddingHorizontal: 30 }}
          >
            <Text size="medium" text="Tip:" />
            <Text size="medium" text="$5.00" />
          </View>
          <View style={{ ...globalStyles.divider, marginHorizontal: 30 }} /> */}
          <View
            style={{ ...screenStyles.blockInfoItem, paddingHorizontal: 30 }}
          >
            <Text size="medium" text="Total:" fontFamily="rubik-bold" />
            <Text size="medium" text={`$${data.price}`} />
          </View>
          <View style={globalStyles.divider} />
          {_.get(data, "rate") ? (
            <View
              style={{ ...screenStyles.blockInfoItem, paddingHorizontal: 30 }}
            >
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text size="medium" text="Your rate" fontFamily="rubik-bold" />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end"
                }}
              >
                <Rate rate={data.rate} readOnly />
              </View>
            </View>
          ) : (
            <React.Fragment />
          )}
        </View>
      </ScrollView>
    );
  }
}
export default PastRequestScreen;
