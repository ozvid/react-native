import React from "react";
import { View, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { get } from "lodash";
import { withNavigation } from "react-navigation";

import { Text, Button } from "../../../../../components";
import * as screenStyles from "../request.styles";

import AvatarBlock from "../../../../../components/avatar-block";
import { statuses } from "../../../../../constants";

const RequestInProcess = ({ courier, navigation, data }) => {
  return (
    <React.Fragment>
      {courier ? (
        <React.Fragment>
          <View style={screenStyles.slidingUpBody}>
            <View
              style={{ ...screenStyles.slidingUpImage, marginVertical: 36 }}
            >
              <AvatarBlock
                image={courier.photoURL}
                rate={get(courier, "rate")}
              />
              <View style={screenStyles.courierImageInfo}>
                <Text
                  text={courier.username}
                  fontFamily="rubik-bold"
                  size="medium"
                />
                <Text
                  text={`${courier.car.make} ${courier.car.model}`}
                  size="medium"
                />
                <Text text={`Plate: ${courier.car.plate}`} size="medium" />
              </View>
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
          </View>
        </React.Fragment>
      ) : (
        <View style={screenStyles.loadingBlock}>
          <ActivityIndicator />
        </View>
      )}
    </React.Fragment>
  );
};

RequestInProcess.propTypes = {
  courier: PropTypes.object,
  navigation: PropTypes.object,
  data: PropTypes.object
};

export default withNavigation(RequestInProcess);
