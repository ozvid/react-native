import React from "react";
import { SafeAreaView, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import { styles, colors } from "../../theme";
import globalStyles from "../../theme/global-styles";

const screenStyles = {
  header: { marginLeft: 15, flexDirection: "row", alignItems: "center" }
};

class DeliveryPartnerAgreementScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Delivery Partner Agreement",
      headerLeft: (
        <View style={screenStyles.header}>
          <Ionicons
            color={colors.black}
            onPress={() => navigation.goBack(null)}
            name="md-close"
            size={30}
          />
        </View>
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <WebView
          useWebKit
          startInLoadingState
          source={{
            uri: "https://SendASAP-75568.web.app/deliveryPartnerAgreement.htm"
            // uri: "https://send-asap.web.app/deliveryPartnerAgreement.htm"
          }}
          renderLoading={() => (
            <View style={globalStyles.fullContainerCenter}>
              <ActivityIndicator />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(withNavigation(DeliveryPartnerAgreementScreen));
