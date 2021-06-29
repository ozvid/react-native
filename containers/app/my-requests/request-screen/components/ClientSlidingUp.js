/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { statuses } from "../../../../../constants";
import { SlidingUp } from "../../../../../components";
import RequestInProcess from "./RequestInProcess";
import RequestCreated from "./RequestCreated";
import RequestDelivered from "./RequestDelivered";
import { statusTitles } from "../../../../../constants/text";

const ClientSlidingUp = ({ data, courier, confirmRequest }) => {
  const displayPickUpTime = moment(data.pickupTime.seconds * 1000).format(
    "h:mm a"
  );
  return (
    <SlidingUp
      data={() => {
        switch (data.status) {
          case statuses.created:
            return {
              title: "Confirming your delivery partner",
              belowText: "We are looking for a delivery partner for you.",
              content: <RequestCreated data={data} />
            };
          case statuses.courierAssigned:
            return {
              title: "Delivery Partner request confirmed",
              belowText: `Your delivery partner will arrive at the pickup location at ${displayPickUpTime}.`,
              content: <RequestInProcess data={data} courier={courier} />
            };
          case statuses.toPickup:
          case statuses.arrived:
          case statuses.toDropOff:
          case statuses.arrivedAtDropOff:
          case statuses.arrivedAtDropOffPhotoTaken:
            return {
              title: statusTitles[data.status],
              content: <RequestInProcess data={data} courier={courier} />
            };
          case statuses.pendingConfirmation:
            return {
              title: "Confirm package delivery to complete request",
              content: (
                <RequestDelivered data={data} confirmRequest={confirmRequest} />
              )
            };
          default:
            return {};
        }
      }}
    />
  );
};

ClientSlidingUp.propTypes = {
  data: PropTypes.object,
  courier: PropTypes.object,
  saveRateAndTips: PropTypes.func
};

export default ClientSlidingUp;
