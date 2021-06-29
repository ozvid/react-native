import React, { Component } from "react";
import { View, TextInput, KeyboardAvoidingView } from "react-native";
import { withNavigation } from "react-navigation";
import LoadingOverlay from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as screenStyles from "./cancel-other-notes.styles";
import { styles } from "../../../../theme";
import { AbsoluteButton, Button, Text } from "../../../../components";
import { showAlert } from "../../../../components/custom-alert/custom-alert.actions";
import { cancelOrder } from "../functions";

class CancelOtherNotesScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cancelReason: "",
      packageId: props.navigation.getParam("packageId"),
      fee: props.navigation.getParam("fee")
    };
  }

  handleSubmit = () => {
    this.setState({ isLoading: true });
    const { cancelReason, packageId, fee } = this.state;

    if (!cancelReason) {
      this.setState({ isLoading: false }, () => {
        this.props.showAlert({
          message: "Please fill in the reason for cancellation"
        });
      });
      return;
    }

    cancelOrder(packageId, cancelReason, fee)
      .then(() => this.props.navigation.navigate("myRequestsList"))
      .catch(err => showAlert({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <View style={styles.container}>
        <LoadingOverlay visible={this.state.isLoading} />
        <AbsoluteButton icon="cross" onPress={this.props.navigation.goBack} />
        <KeyboardAvoidingView
          style={styles.fullContainer}
          behavior="padding"
          enabled
        >
          <View style={{ marginVertical: 86, marginHorizontal: 6, flex: 1 }}>
            <Text
              style={screenStyles.headerText}
              text="Order cancelled"
              size="exRegular"
              fontFamily="rubik-bold"
            />
            <Text
              text="Tell us the reason to help us improve."
              size="mediumPlus"
            />
            <TextInput
              placeholder="Notes..."
              style={screenStyles.textInput}
              multiline
              numberOfLines={4}
              editable
              value={this.state.cancelReason}
              onChangeText={cancelReason => this.setState({ cancelReason })}
            />
          </View>
          <Button text="Submit" onPress={this.handleSubmit} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

CancelOtherNotesScreen.propTypes = {
  navigation: PropTypes.object,
  showAlert: PropTypes.func
};

export default connect(null, {
  showAlert
})(withNavigation(CancelOtherNotesScreen));
