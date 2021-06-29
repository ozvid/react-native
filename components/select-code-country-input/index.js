import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";

import RNPickerSelect from "react-native-picker-select";
import { CustomMask } from "react-native-masked-text/lib/masks";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";

import stylesSheets, { pickerSelectStyles } from "./index.styles";
import globalStyles from "../../theme/global-styles";

class SelectCodeCountryInput extends Component {
  mask = new CustomMask();

  state = {
    code: "+1",
    itemKey: "usa",
    renderInput: this.props.phoneNumber ? this.props.phoneNumber.substr(2) : "",
    itemsCode: [
      {
        label: "+1",
        value: "+1",
        key: "usa"
      }
      //  {
      //   label: "+91",
      //   value: "+91",
      //   key: "ind"
      // },
      // {
      //   label: "+7",
      //   value: "+7",
      //   key: "kz"
      // }
    ]
  };

  _onChange(value) {
    const {
      input: { onChange }
    } = this.props;
    const { code } = this.state;
    const mask = this.mask;

    const options = {
      mask: "999 999 9999",
      getRawValue: (maskedValue, settings) => `${code} ${maskedValue}`
    };

    const received = mask.getValue(value, options);
    const receivedRawValue = mask.getRawValue(received, options);

    this.setState({ renderInput: received });
    onChange(receivedRawValue);
  }

  render() {
    const {
      viewStyle,
      label,
      style,
      input: { restInput },
      meta: { touched, error },
      ...rest
    } = this.props;

    const { renderInput, itemsCode } = this.state;
    return (
      <View style={viewStyle}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={stylesSheets.selectInputBox}>
          <RNPickerSelect
            onValueChange={code => {
              const item = _.find(this.state.itemsCode, o => o.value === code);
              if (item) {
                this.setState(
                  {
                    code,
                    itemKey: item.key
                  },
                  () => this._onChange(this.state.renderInput)
                );
              }
            }}
            style={pickerSelectStyles}
            items={itemsCode}
            Icon={() => {
              return (
                <Ionicons name="md-arrow-dropdown" size={24} color="gray" />
              );
            }}
            itemKey={this.state.itemKey}
            value={this.state.code}
          />
          <TextInput
            style={[stylesSheets.inputBox, style]}
            ref={ref => (this.InputSelectCodeCountryField = ref)}
            value={renderInput}
            {...restInput}
            {...rest}
            onChangeText={value => this._onChange(value)}
          />
        </View>
        {touched && error && (
          <Text style={globalStyles.errorMessage}>{error}</Text>
        )}
      </View>
    );
  }
}

export default connect(state => ({
  phoneNumber: state.account.phoneNumber
}))(SelectCodeCountryInput);
