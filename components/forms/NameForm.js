import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { View, TextInput as Input, ScrollView } from "react-native";
import { Switch } from "react-native-switch";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "../../containers/auth/signup-screen/signup.styles";
import { required } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";
import { colors } from "../../theme";
import { USER_ROLES, FORMS } from "../../constants";

const NameForm = ({
  handleSubmit,
  textButton,
  submitting,
  change,
  isBusiness,
  role,
  form
}) => (
  <View style={screenStyles.form}>
    <ScrollView style={globalStyles.fullContainer}>
      <Text
        align="center"
        size="exRegular"
        style={screenStyles.title}
        text={
          form === FORMS.UPDATE ? "What's your new name?" : "What's your name?"
        }
      />
      <Text
        align="center"
        size="medium"
        style={screenStyles.title_highlight}
        text="Your name will appear on the app when the delivery partner gets your request."
      />
      <Field
        name="name"
        component={TextInput}
        viewStyle={screenStyles.boxTopI}
        placeholder="Your name"
        validate={required}
      />
      {role === USER_ROLES.CLIENT && form !== FORMS.UPDATE && (
        <React.Fragment>
          <View style={[globalStyles.rowContainer, { marginTop: 20 }]}>
            <Text
              style={{ marginRight: 10 }}
              text="Business"
              size="mediumPlus"
            />
            <Switch
              value={isBusiness}
              onValueChange={val => change("isBusiness", val)}
              activeText="On"
              inActiveText="Off"
              backgroundActive={colors.primary}
            />
          </View>
          {isBusiness && (
            <Field
              name="businessName"
              component={TextInput}
              viewStyle={{ marginTop: 20 }}
              placeholder="Business name"
              validate={required}
            />
          )}
        </React.Fragment>
      )}
    </ScrollView>
    <HandleButton
      style={globalStyles.handleSubmitBottom}
      handleSubmit={handleSubmit}
      textButton={textButton}
      submitting={submitting}
    />
  </View>
);

NameForm.propTypes = {
  handleSubmit: PropTypes.func,
  textButton: PropTypes.string,
  submitting: PropTypes.bool,
  change: PropTypes.func,
  isBusiness: PropTypes.bool,
  role: PropTypes.string,
  form: PropTypes.string
};

const Form = reduxForm({
  destroyOnUnmount: false
})(NameForm);

export default connect((state, props) => ({
  isBusiness: formValueSelector(props.form)(state, "isBusiness"),
  role: formValueSelector(props.form)(state, "role")
}))(Form);
