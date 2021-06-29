import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import { isNumber } from "util";
import { Map, SendAsapMarker } from "../../../../../components";
import { statuses } from "../../../../../constants";
import { CAR } from "../../../../../constants/images";

const ClientMap = ({ data, courierLocation }) => {
  let mapProps;
  switch (data.status) {
    case statuses.created:
      mapProps = {
        children: <SendAsapMarker active coordinate={data.from} />,
        route: {
          origin: { coordinate: data.from },
          destination: { coordinate: data.to }
        },
        fitToCoordinates: [data.from, data.to]
      };
      break;
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
          origin: {
            coordinate: courierLocation,
            marker: null
          },
          destination: {
            coordinate: data.from,
            title:
              courierLocation && isNumber(courierLocation.timeLeft)
                ? `${courierLocation.timeLeft} min`
                : "Estimating Time"
          }
        },
        fitToCoordinates: courierLocation &&
          courierLocation.latitude &&
          courierLocation.longitude && [data.from, courierLocation],
        children: (
          <SendAsapMarker
            rotation={
              _.get(courierLocation, "bearing") ? courierLocation.bearing : 0
            }
            coordinate={courierLocation}
            image={CAR}
          />
        )
      };
      break;
    case statuses.arrived:
      mapProps = {
        children: <SendAsapMarker title="Arrived" coordinate={data.from} />,
        animateToRegion: data.from
      };
      break;
    case statuses.toDropOff:
      mapProps = {
        route: {
          origin: {
            coordinate: courierLocation,
            marker: null
          },
          destination: {
            coordinate: data.to,
            title:
              courierLocation && isNumber(courierLocation.timeLeft)
                ? `${courierLocation.timeLeft} min`
                : "Estimating Time"
          }
        },
        fitToCoordinates: courierLocation &&
          courierLocation.latitude &&
          courierLocation.longitude && [data.to, courierLocation],
        children: (
          <SendAsapMarker
            rotation={
              _.get(courierLocation, "bearing") ? courierLocation.bearing : 0
            }
            coordinate={courierLocation}
            image={CAR}
          />
        )
      };
      break;
    case statuses.arrivedAtDropOff:
    case statuses.arrivedAtDropOffPhotoTaken:
      mapProps = {
        children: <SendAsapMarker title="Arrived" coordinate={data.to} />,
        animateToRegion: data.to
      };
      break;
    default:
      break;
  }
  return <Map {...mapProps} />;
};

ClientMap.propTypes = {
  data: PropTypes.object,
  courierLocation: PropTypes.object
};

export default ClientMap;
