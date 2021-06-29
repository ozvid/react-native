import React from "react";
import { connect } from "react-redux";
import { SafeAreaView, View, Image } from "react-native";

import { LOGO } from "../../constants/images";
import { styles } from "../../theme";

class OnboardingScreen extends React.Component {
  navigateTo = route => this.props.navigation.navigate(route);

  componentWillMount() {
    setTimeout(() => this.navigateTo("starter"), 1000);
  }

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <View style={styles.fullContainerCenter}>
          <Image source={LOGO} style={{ width: 200, height: 154 }} />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(OnboardingScreen);
