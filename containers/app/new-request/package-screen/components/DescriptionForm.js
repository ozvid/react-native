/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import theme from "../../../../../theme";
import { required } from "../../../../../utils/validations";
import {
  SendAsapInputText,
  HandleButton,
  Text
} from "../../../../../components";

// new-description have keyboard

const DescriptionForm = ({ handleSubmit, submitting }) => {
  return (
    <>
      <ScrollView style={theme.styles.fullContainer}>
        <View
          style={{
            backgroundColor: theme.colors.white,
            padding: theme.metrics.gutters.medium * 6
          }}
        >
          <Text
            style={{ marginBottom: 20 }}
            // text="What's in your package?"
            text="What is in your package?"
            size="exRegular"
            fontFamily="rubik-bold"
          />
          <Text
            style={{ marginBottom: 10 }}
            align="left"
            fontFamily="rubik-bold"
            // text="Please describe the goods you want to deliver and any announcements in a short paragraph."
            text="Please describe the items you want delivered and any info you want the delivery partner to know before accepting the delivery."
            size="medium"
          />
          <Field
            name="publicNotes"
            component={SendAsapInputText}
            viewStyle={{ marginBottom: 20, maxHeight: 200 }}
            placeholder="Public Description"
            editable
            maxLength={140}
            multiline
            numberOfLines={8}
            validate={required}
          />
          <Text
            style={{ marginBottom: 10 }}
            align="left"
            fontFamily="rubik-bold"
            // text="Add additional notes such as house number or package placement etc. Delivery partner can see it only after accepting the package."
            text="Add additional notes such as gate codes, apartment #, recipient phone # etc. Delivery partner can see private notes only after accepting the request."
            size="medium"
          />
          <Field
            name="description"
            component={SendAsapInputText}
            viewStyle={{ marginBottom: 20, maxHeight: 200 }}
            placeholder="Private notes..."
            editable
            maxLength={140}
            multiline
            numberOfLines={8}
            validate={required}
          />
        </View>
      </ScrollView>
      <HandleButton
        style={{ marginBottom: 36, marginHorizontal: 36 }}
        submitting={submitting}
        handleSubmit={handleSubmit}
        textButton="Next"
      />
    </>
  );
};

const Form = reduxForm({
  form: "PackageForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(DescriptionForm);

export default connect()(Form);
