import React from "react";
import { View, Image } from "react-native";
import { Marker } from "react-native-maps";
import PropTypes from "prop-types";

import { colors } from "../../theme";
import Text from "../text";
import styles from "./styles";

const SendAsapMarker = ({
  coordinate,
  title,
  active = false,
  image,
  rotation
}) => {
  if (!coordinate) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <React.Fragment>
      {image ? (
        <Marker.Animated
          coordinate={
            typeof coordinate === "object"
              ? {
                  longitude: coordinate.longitude || 0,
                  latitude: coordinate.latitude || 0
                }
              : {
                  longitude: 0,
                  latitude: 0
                }
          }
          style={rotation && { transform: [{ rotate: `${rotation}deg` }] }}
        >
          <Image source={image} style={styles.image} />
        </Marker.Animated>
      ) : (
        <Marker coordinate={coordinate}>
          <View style={styles.markerContainer}>
            {title && (
              <React.Fragment>
                <View style={styles.markerTitle}>
                  <Text text={title} color={colors.white} />
                </View>
                <View style={styles.markerTitleBottom} />
              </React.Fragment>
            )}
            <View
              style={
                active
                  ? styles.markerInnerContainerActive
                  : styles.markerInnerContainerInactive
              }
            >
              <View style={styles.markerInner} />
            </View>
          </View>
        </Marker>
      )}
    </React.Fragment>
  );
};

SendAsapMarker.propTypes = {
  coordinate: PropTypes.object,
  title: PropTypes.string,
  active: PropTypes.bool,
  image: PropTypes.any,
  rotation: PropTypes.number
};

export default SendAsapMarker;
