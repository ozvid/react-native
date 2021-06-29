import React from "react";
import { View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";

import { Text, Button } from "../../../../../components";
import { COURIER } from "../../../../../constants/images";
import * as screenStyles from "../request.styles";
import AddressBlock from "../../../../../components/address-block/address-block";
import ArrowBlockButton from "../../../../../components/arrow-block-button";
import { statuses } from "../../../../../constants";

const RequestCreated = ({ navigation, data }) => {
  return (
    <React.Fragment>
      <View style={screenStyles.slidingUpImage}>
        <Image source={COURIER} style={{ height: 100, width: 147 }} />
      </View>
      <Button
        type="clear"
        style={{ ...screenStyles.blockButton, ...screenStyles.centred }}
        onPress={() =>
          navigation.navigate("cancelOrder", {
            packageId: data.id,
            packageType: data.packageType,
            takeFees: data.status !== statuses.created
          })
        }
      >
        <Text
          size="medium"
          align="left"
          text="Cancel Order"
          color="alert"
          style={screenStyles.cancelText}
        />
      </Button>
      <AddressBlock data={data} />
      <ArrowBlockButton
        navigation={navigation}
        text="Package Details"
        to="packageDetails"
        params={{ package: data }}
      />
    </React.Fragment>
  );
};

RequestCreated.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object
};

export default withNavigation(RequestCreated);
