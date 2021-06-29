import React from "react";
import { connect } from "react-redux";
import { View, Platform, Alert } from "react-native";
import { PROVIDER_GOOGLE } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import _ from "lodash";
import PropTypes from "prop-types";
import Constants from "expo-constants";
import SendAsapMarker from "../marker";

import {
  setCurrentLocation,
  locationPermissionGranted,
  seekAddress
} from "./map.actions";
import { zoomLevels, milesInKms } from "../../constants";
import { colors, metrics } from "../../theme";

const EDGE_PADDING = {
  top: metrics.deviceHeight * 0.2,
  right: metrics.deviceHeight * 0.02,
  bottom: metrics.deviceHeight * 0.2,
  left: metrics.deviceHeight * 0.02
};

class Map extends React.Component {
  mapRef = null;

  geoQuery = null;

  unsubscribeUsers = [];

  prevLocation = null;

  timeOutRef = null;

  state = {
    isUserChangedRegion: false,
    mapReady: false
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // eslint-disable-next-line no-shadow
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        this.props.locationPermissionGranted();
        this.watchPosition();
        Location.getCurrentPositionAsync({}).then(location =>
          this.props.setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            ...zoomLevels.MEDIUM
          })
        );
      }
    } else {
      this.watchPosition();
      Location.getCurrentPositionAsync({})
        .then(location =>
          this.props.setCurrentLocation({
            ...location.coords,
            ...zoomLevels.MEDIUM
          })
        )
        .catch(err =>
          Alert.alert(`Error while getting position: ${err.message}`)
        );
    }
  }

  componentDidUpdate() {
    const { isUserChangedRegion, mapReady } = this.state;
    if (!this.mapRef || isUserChangedRegion || !mapReady) {
      return;
    }

    const { animateToRegion, fitToCoordinates } = this.props;

    if (animateToRegion && this.mapRef.animateToRegion) {
      this.mapRef.animateToRegion({
        ...zoomLevels.MEDIUM,
        ...animateToRegion
      });
    }
    if (fitToCoordinates && this.mapRef.fitToCoordinates) {
      this.mapRef.fitToCoordinates(fitToCoordinates, {
        edgePadding: EDGE_PADDING
      });
    }
  }

  componentWillUnmount() {
    if (this.geoQuery && this.geoQuery.cancel) {
      this.geoQuery.cancel();
    }
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
    if (this.locationWatcher) {
      this.locationWatcher.remove();
    }
  }

  handlePosition = position => {
    // eslint-disable-next-line no-shadow
    const { currentLocation, locationHandler, setCurrentLocation } = this.props;
    if (currentLocation && locationHandler) {
      locationHandler(position.coords, currentLocation);
    }
    setCurrentLocation(position.coords);
  };

  watchPosition = async () => {
    if (Platform.OS === "ios") {
      this.watchID = await navigator.geolocation.watchPosition(
        this.handlePosition,
        err => Alert.alert(err.message)
      );
    } else {
      this.locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 300,
          distanceInterval: 0
        },
        this.handlePosition
      );
    }
  };

  render() {
    const {
      route,
      style,
      mapStyle,
      children,
      currentLocation,
      currentLocationImage,
      showsUserLocation = true,
      initialRegion = {
        latitude: currentLocation && currentLocation.latitude,
        longitude: currentLocation && currentLocation.longitude
      }
    } = this.props;
    const containerStyle = style || { flex: 1 };
    const mapViewStyle = this.props.mapStyle || { flex: 1 };

    return (
      <View style={containerStyle}>
        <MapView
          key="map-view"
          // eslint-disable-next-line no-return-assign
          ref={ref => (this.mapRef = ref)}
          onMapReady={() => this.setState({ mapReady: true })}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          showsUserLocation={showsUserLocation}
          // followsUserLocation={true}
          onTouchStart={() => {
            if (this.timeOutRef) {
              clearTimeout(this.timeOutRef);
            }
            this.setState({ isUserChangedRegion: true }, () => {
              this.timeOutRef = setTimeout(
                () => this.setState({ isUserChangedRegion: false }),
                20000
              );
            });
          }}
          loadingEnabled
          style={mapViewStyle}
          initialRegion={
            currentLocation && {
              ...initialRegion,
              ...zoomLevels.MEDIUM
            }
          }
        >
          {currentLocation && (
            <React.Fragment>
              {children}
              {route && (
                <React.Fragment>
                  <MapViewDirections
                    onReady={data => {
                      if (data && route.distanceHandler) {
                        route.distanceHandler(
                          Math.round(data.distance * milesInKms * 10) / 10,
                          Math.round(data.duration * 10) / 10
                        );
                      }
                    }}
                    apikey={Constants.manifest.extra.googleMaps.apiKey}
                    origin={
                      _.get(route.origin, "coordinate")
                        ? route.origin.coordinate
                        : currentLocation
                    }
                    destination={route.destination.coordinate}
                    strokeColor={colors.aquaMarine}
                    resetOnChange={false}
                    strokeWidth={3}
                  />
                  {currentLocationImage
                    ? currentLocationImage !== "default" && (
                        <SendAsapMarker
                          image={currentLocationImage.image}
                          rotation={currentLocationImage.rotation}
                          coordinate={
                            route.origin
                              ? route.origin.coordinate
                              : currentLocation
                          }
                        />
                      )
                    : route.origin.marker !== null &&
                      _.get(route.origin, "coordinate") && (
                        <SendAsapMarker
                          active
                          coordinate={
                            route.origin
                              ? route.origin.coordinate
                              : currentLocation
                          }
                        />
                      )}
                  <SendAsapMarker
                    title={route.destination.title}
                    coordinate={route.destination.coordinate}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  currentLocation: PropTypes.object,
  locationHandler: PropTypes.func,
  setCurrentLocation: PropTypes.func,
  route: PropTypes.object,
  style: PropTypes.object,
  mapStyle: PropTypes.object,
  children: PropTypes.any,
  animateToRegion: PropTypes.object,
  currentLocationImage: PropTypes.any,
  showsUserLocation: PropTypes.bool,
  initialRegion: PropTypes.object,
  locationPermissionGranted: PropTypes.func,
  fitToCoordinates: PropTypes.array
};

export default connect(
  state => ({
    region: state.map.region,
    location: state.map.location,
    zoomLevel: state.map.zoomLevel,
    currentLocation: state.map.currentLocation,
    account: state.account
  }),
  {
    setCurrentLocation,
    locationPermissionGranted,
    seekAddress
  }
)(Map);
