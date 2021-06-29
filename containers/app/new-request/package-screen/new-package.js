import React, { Component } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation, Header } from "react-navigation";
import { SubmissionError } from "redux-form";

import { styles, metrics } from "../../../../theme";
import ButtonPackageSize from "./components/ButtonPackageSize";
import { AbsoluteButton } from "../../../../components";
import { calculatePrice } from "../new-request.actions";

const validate = values => {
  const errors = {};
  if (!values.packageType) {
    errors.packageType = "required ";
  }
  return errors;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class NewPackageScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  handleNext = values => {
    const { navigation, distance, calculatePrice } = this.props;
    calculatePrice({ distance, packageType: values.packageType });
    return sleep(1000).then(() => {
      const valid = validate(values);

      if (Object.entries(valid).length !== 0 && valid.constructor === Object) {
        throw new SubmissionError(
          {
            packageType: valid.packageType,
            _error: "Choose package!"
          },
          "PackageForm"
        );
      } else if (!navigation.getParam("isEdit")) {
        navigation.navigate("newDescription");
      } else {
        navigation.navigate("newConfirmation");
      }
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.fullContainer}>
        <AbsoluteButton onPress={navigation.goBack} />
        {metrics.deviceHeight < 600 ? (
          <ScrollView style={styles}>
            <ButtonPackageSize
              navigation={navigation}
              onSubmit={this.handleNext}
            />
          </ScrollView>
        ) : (
          <View
            style={[
              styles.fullContainer,
              { marginTop: Header.HEIGHT, marginBottom: 24 }
            ]}
          >
            <ButtonPackageSize
              navigation={navigation}
              onSubmit={this.handleNext}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    distance: state.newRequest.distance
  }),
  {
    calculatePrice
  }
)(withNavigation(NewPackageScreen));
