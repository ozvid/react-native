import React, { Component } from "react";
import { connect } from "react-redux";

import AlertPro from "react-native-alert-pro";
import { colors } from "../../theme";
import { showAlert, clearAlertState } from "./custom-alert.actions";

class CustomAlert extends Component {
  render() {
    const {
      message,
      title,
      visible = true,
      buttonText,
      onConfirm
    } = this.props;
    return (
      <AlertPro
        ref={ref => {
          this.AlertPro = ref;
          if (this.AlertPro) {
            visible ? this.AlertPro.open() : this.AlertPro.close();
          }
        }}
        onClose={() => this.props.clearAlertState()}
        showCancel={false}
        onConfirm={() => {
          this.AlertPro.close();
          this.props.clearAlertState();
          if (onConfirm) {
            onConfirm();
          }
        }}
        title={title || "Alert"}
        message={typeof message === "string" ? message : ""}
        textConfirm={buttonText || "Close"}
        customStyles={{
          mask: {
            backgroundColor: colors.overlay
          },
          container: {
            borderWidth: 1,
            borderColor: colors.manilla,
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowRadius: 10
          },
          buttonCancel: {
            backgroundColor: colors.whiteTwo
          },
          buttonConfirm: {
            backgroundColor: colors.manilla
          },
          textCancel: {
            color: colors.black
          },
          textConfirm: {
            color: colors.black
          }
        }}
      />
    );
  }
}

export default connect(null, {
  showAlert,
  clearAlertState
})(CustomAlert);
