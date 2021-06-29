import React from "react";
import { Field, reduxForm } from "redux-form";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "../../theme/global-styles";
import screenStyles from "./form.styles";
import { required } from "../../utils/validations";
import { Text, TextInput, HandleButton } from "..";

const CarInfoForm = ({ handleSubmit, submitting }) => {
  return (
    <View style={screenStyles.form}>
      <ScrollView style={globalStyles.fullContainer}>
        <Text
          align="center"
          size="exRegular"
          style={screenStyles.title}
          text="Car Information"
        />
        <Field
          name="car.make"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="Make"
          validate={[required]}
        />
        <Field
          name="car.model"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="Model"
          validate={[required]}
        />
        <Field
          name="car.plate"
          component={TextInput}
          viewStyle={screenStyles.boxTopI}
          placeholder="Plate"
          validate={[required]}
        />
      </ScrollView>
      <HandleButton
        style={globalStyles.handleSubmitBottom}
        handleSubmit={handleSubmit}
        textButton="Save"
        submitting={submitting}
      />
    </View>
  );
};

CarInfoForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

const Form = reduxForm()(CarInfoForm);

export default Form;
