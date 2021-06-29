import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { View, ScrollView } from "react-native";

import globalStyles from "../../../../theme/global-styles";
import screenStyles from "../../account/account.styles";
import { required, getCardType, cvc } from "../../../../utils/validations";
import { isDateExpired } from "../../../../utils/date";
import { TextInput, CardNumberInput } from "../../../../components";

const dateFormatter = date => {
  if (!date) return "";
  date = date.split("/").length < 2 ? date : date.split("/").join("");
  const splitter = /.{1,2}/g;
  date = date.substring(0, 4);
  return date
    .substring(0, 4)
    .match(splitter)
    .join("/");
};

class CardForm extends Component {
  componentDidMount() {
    const { navigation, handleSubmit } = this.props;

    navigation.setParams({
      handleSubmit
    });
  }

  render() {
    return (
      <ScrollView style={globalStyles.container}>
        <Field
          viewStyle={{ marginBottom: 20 }}
          style={screenStyles.input}
          name="name"
          label="Card Holder's Name"
          component={TextInput}
          validate={required}
        />
        <Field
          viewStyle={{ marginBottom: 20 }}
          style={screenStyles.input}
          name="number"
          label="Payment Methods"
          component={CardNumberInput}
          validate={required}
          keyboardType="numeric"
        />
        <View style={screenStyles.rowField}>
          <Field
            viewStyle={{ width: "50%", paddingRight: 29 }}
            style={screenStyles.input}
            label="Exp. Date"
            name="exp_date"
            keyboardType="numeric"
            placeholder="MM/YY"
            component={TextInput}
            validate={required}
            format={dateFormatter}
          />
          <Field
            viewStyle={{ width: "50%" }}
            style={screenStyles.input}
            label="CVV"
            name="cvc"
            keyboardType="numeric"
            component={TextInput}
            max={4}
            validate={[required, cvc]}
          />
        </View>
        <Field
          viewStyle={{ marginTop: 20 }}
          style={screenStyles.input}
          name="address_zip"
          label="Zip Code"
          keyboardType="numeric"
          component={TextInput}
          validate={required}
        />
      </ScrollView>
    );
  }
}

const validate = values => {
  const error = {
    number: "",
    exp_date: ""
  };
  if (values.number != undefined) {
    if (
      !getCardType(values.number) ||
      values.number.replace(/\s/g, "").toString().length < 14
    ) {
      error.number = "Invalid card number";
    }
  }
  if (values.exp_date != undefined) {
    if (
      values.exp_date.split("/").length != 2 ||
      parseInt(values.exp_date.split("/")[0]) > 12
    ) {
      error.exp_date = "Incorrect date";
    } else if (isDateExpired(values.exp_date)) {
      error.exp_date = "Date expired";
    }
  }
  return error;
};

const Form = reduxForm({
  form: "CardForm",
  validate
})(CardForm);

export default connect()(Form);
