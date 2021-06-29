import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SafeAreaView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../../../theme/global-styles";
import AgreeForm from "../../../../components/forms/AgreeForm";
import { beDeliveryPartner } from "../account.actions";
import { FORMS } from "../../../../constants";

// eslint-disable-next-line no-shadow
const AgreeScreen = ({ beDeliveryPartner, navigation }) => (
  <SafeAreaView style={globalStyles.fullContainer}>
    <AgreeForm
      onSubmit={beDeliveryPartner}
      form={FORMS.BE_DELIVERY_PARTNER}
      navigation={navigation}
    />
  </SafeAreaView>
);

AgreeScreen.propTypes = {
  beDeliveryPartner: PropTypes.func,
  navigation: PropTypes.object
};

export default connect(null, {
  beDeliveryPartner
})(withNavigation(AgreeScreen));
