import React from "react";
import _ from "lodash";
import { isNumber } from "util";
import { Map, SendAsapMarker } from "../../../../components";
import { statuses } from "../../../../constants";
import { CAR } from "../../../../constants/images";

const CourierMap = ({
  data,
  currentLocation,
  distanceHandler,
  handleLocation
}) => {
  let mapProps = {};
  switch (data.status) {
    case statuses.courierAssigned:
      mapProps = {
        children: <SendAsapMarker active coordinate={data.from} />,
        route: {
          origin: { coordinate: data.from },
          destination: { coordinate: data.to }
        },
        fitToCoordinates: [data.from, data.to]
      };
      break;
    case statuses.toPickup:
      mapProps = {
        route: {
          destination: {
            coordinate: data.from,
            title: isNumber(currentLocation.timeLeft)
              ? `${currentLocation.timeLeft} min`
              : "Estimating time"
          },
          distanceHandler
        },
        currentLocationImage: {
          image: CAR,
          rotation: currentLocation ? currentLocation.bearing : 0
        },
        fitToCoordinates: currentLocation.latitude &&
          currentLocation.longitude && [currentLocation, data.from]
      };
      break;
    case statuses.arrived:
      mapProps = {
        children: <SendAsapMarker title="Pickup" coordinate={data.from} />,
        animateToRegion: data.from
      };
      break;
    case statuses.toDropOff:
      mapProps = {
        route: {
          destination: {
            coordinate: data.to,
            title: isNumber(currentLocation.timeLeft)
              ? `${currentLocation.timeLeft} min`
              : "Estimating time"
          },
          distanceHandler
        },
        currentLocationImage: {
          image: CAR,
          rotation: currentLocation ? currentLocation.bearing : 0
        },
        fitToCoordinates: currentLocation.latitude &&
          currentLocation.longitude && [currentLocation, data.to]
      };
      break;
    case statuses.arrivedAtDropOff:
    case statuses.arrivedAtDropOffPhotoTaken:
      mapProps = {
        children: <SendAsapMarker title="Drop off" coordinate={data.to} />,
        animateToRegion: data.to
      };
      break;
    default:
      break;
  }

  return (
    <Map
      {...mapProps}
      showsUserLocation={false}
      locationHandler={handleLocation}
    />
  );
};

export default CourierMap;
