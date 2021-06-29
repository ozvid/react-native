import React from "react";
import { View, SafeAreaView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { change } from "redux-form";
import { get } from "lodash";

import { withNavigation } from "react-navigation";
import colors from "../../../../theme/colors";
import { HandleButton, Text } from "../../../../components";
import globalStyles from "../../../../theme/global-styles";
import screenStyles from "../account.styles";
import * as images from "../../../../constants/images";
import { Applications } from "../../../../services/firebase";
import { FORMS, USER_ROLES } from "../../../../constants";

// eslint-disable-next-line no-shadow
const StartCourierScreen = ({ navigation, account, change }) => {
  const handleSubmit = () => {
    const senderApplication = get(account, "senderApplication");
    if (senderApplication) {
      Applications.getDoc(senderApplication)
        .then(applicationDoc => {
          if (applicationDoc.exists) {
            const application = applicationDoc.data();
            change(
              FORMS.BE_DELIVERY_PARTNER,
              "driverLicense",
              application.driverLicense
            );
            change(FORMS.BE_DELIVERY_PARTNER, "role", USER_ROLES.COURIER);
            navigation.navigate("vehicle");
          } else {
            navigation.navigate("driverLicense");
          }
        })
        .catch(err => Alert.alert(err.message));
    } else {
      navigation.navigate("driverLicense");
    }
  };
  return (
    <SafeAreaView style={globalStyles.fullContainer}>
      <View style={globalStyles.container}>
        <View style={globalStyles.containerV2}>
          <Image source={images.DELIVERY} style={{ width: 260, height: 198 }} />
          <Text
            align="center"
            size="exRegular"
            fontFamily="rubik-bold"
            style={screenStyles.title}
            text="Be our delivery partner and make money while traveling and commuting"
          />
          <Text
            align="center"
            size="medium"
            style={globalStyles.title_highlight}
            text="Make extra cash while traveling."
          />
        </View>
        <HandleButton
          style={globalStyles.handleSubmitBottom}
          textButton="Let's go!"
          handleSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

StartCourierScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <View style={{ marginLeft: 15 }}>
        <Ionicons
          color={colors.black}
          onPress={() => navigation.goBack(null)}
          name="md-close"
          size={30}
        />
      </View>
    ),
    headerStyle: {
      elevation: 0,
      borderBottomWidth: 0,
      shadowColor: "transparent"
    }
  };
};

StartCourierScreen.propTypes = {
  navigation: PropTypes.object,
  account: PropTypes.object,
  change: PropTypes.func
};

export default connect(
  state => ({
    account: state.account
  }),
  {
    change
  }
)(withNavigation(StartCourierScreen));
