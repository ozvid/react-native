/* eslint-disable no-shadow */
import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { change, formValueSelector } from "redux-form";
import PropTypes from "prop-types";

import { colors, styles } from "../../../../theme";
import CustomSizeForm from "./components/CustomSizeForm";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import IOSKeyboardAvoidingView from "../../../../components/IOSKeyboardAvoidingView";

class CustomSizeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{ marginLeft: 15 }}>
          <Ionicons
            color={colors.black}
            onPress={() => navigation.goBack()}
            name="md-close"
            size={30}
          />
        </View>
      )
    };
  };

  handleSubmit = ({ length, width, height, packageType }) => {
    const { navigation, change } = this.props;
    change("PackageForm", "packageType", packageType);
    change("PackageForm", "length", parseInt(length, 10));
    change("PackageForm", "width", parseInt(width, 10));
    change("PackageForm", "height", parseInt(height, 10));

    navigation.goBack();
  };

  render() {
    const { length, width, height } = this.props;

    return (
      <SafeAreaView style={styles.fullContainer}>
        <DismissKeyboardView>
          <IOSKeyboardAvoidingView style={styles.fullContainer}>
            <CustomSizeForm
              onSubmit={this.handleSubmit}
              initialValues={{ length, width, height }}
            />
          </IOSKeyboardAvoidingView>
        </DismissKeyboardView>
      </SafeAreaView>
    );
  }
}

CustomSizeScreen.propTypes = {
  navigation: PropTypes.object,
  length: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  change: PropTypes.func
};

const selector = formValueSelector("PackageForm");

export default connect(
  state => ({
    length: selector(state, "length"),
    width: selector(state, "width"),
    height: selector(state, "height")
  }),
  {
    change
  }
)(withNavigation(CustomSizeScreen));
