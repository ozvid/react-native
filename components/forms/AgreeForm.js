import React from "react";
import { reduxForm, formValueSelector } from "redux-form";
import { View, Image, Text as RNText } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { Text, HandleButton, Button } from "..";
import { USER_ROLES, FORMS } from "../../constants";
import { TERMS } from "../../constants/images";

const AgreeForm = ({ handleSubmit, navigation, role, form }) => {
  const contentText = (
    <RNText style={screenStyles.title_highlight}>
      <Text>Click to learn more about our </Text>
      <RNText onPress={() => navigation.navigate("terms")}>
        <Text color="aquaMarine">Terms of Use</Text>
      </RNText>
      <Text> and </Text>
      <RNText onPress={() => navigation.navigate("privacyPolicy")}>
        <Text color="aquaMarine">Privacy Policy</Text>
      </RNText>
      {role === USER_ROLES.COURIER ? (
        <React.Fragment>
          <Text text=", " />
          <RNText onPress={() => navigation.navigate("partnerAgreement")}>
            <Text color="aquaMarine">Delivery Partner Agreement.</Text>
          </RNText>
        </React.Fragment>
      ) : (
        <Text text="." />
      )}
    </RNText>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.containerV2}>
        <Image source={TERMS} style={{ width: 219, height: 230 }} />
        <Text
          align="center"
          size="exRegular"
          fontFamily="rubik-bold"
          style={screenStyles.title}
          text="Do you agree to our Terms of Use and Privacy Policy?"
        />
        <Text align="center" size="medium" style={screenStyles.title_highlight}>
          {contentText}
        </Text>
      </View>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton="Agree"
      />
      <Button
        style={{ marginTop: 10 }}
        type="clear"
        onPress={() =>
          navigation.navigate(
            form === FORMS.BE_DELIVERY_PARTNER ? "account" : "starterFourth"
          )
        }
      >
        <Text color="disabled" size="mediumPlus" text="Cancel" />
      </Button>
    </View>
  );
};

AgreeForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  role: PropTypes.string,
  form: PropTypes.string
};

const Form = reduxForm({
  destroyOnUnmount: false
})(AgreeForm);

export default connect((state, props) => ({
  role: formValueSelector(props.form)(state, "role")
}))(Form);
