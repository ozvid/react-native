import * as React from "react";
import { View, StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown-v2";

import * as componentStyles from "./drop-down.styles";
import Text from "../text";
import { DROPDOWN_HEIGHT } from "../../constants";
import { colors } from "../../theme";

export default DropDown = ({
  input,
  label,
  options,
  placeholder,
  rowStyle = {},
  meta: { touched, error }
}) => {
  const renderRow = option => (
    <View style={componentStyles.dropdownRow}>
      <Text style={componentStyles.dropdownRowText}>{option.label}</Text>
    </View>
  );
  const getDropdownHeight = () => {
    const optionsCount = options.length;
    return {
      height:
        optionsCount <= 3
          ? (DROPDOWN_HEIGHT + StyleSheet.hairlineWidth) * optionsCount
          : (DROPDOWN_HEIGHT + StyleSheet.hairlineWidth) * 3.5
    };
  };
  const selectedValue =
    input.value && options.find(({ value }) => value === input.value);

  const dropdownTextStyle = selectedValue
    ? componentStyles.dropdownText
    : componentStyles.dropdownPlaceholder;
  const displayLabel = selectedValue ? selectedValue.label : placeholder;
  const onSelect = (_, option) => input.onChange(option.value);

  return (
    <View
      style={{
        // ...componentStyles.formRow,
        ...rowStyle
      }}
    >
      {label && <Text style={componentStyles.formRowLabel} text={label} />}
      <View>
        <ModalDropdown
          options={options}
          renderRow={renderRow}
          style={{ backgroundColor: colors.whiteTwo, borderRadius: 8 }}
          dropdownStyle={[componentStyles.dropdownOptions, getDropdownHeight()]}
          onSelect={onSelect}
        >
          <View style={componentStyles.dropdownValue}>
            <Text style={dropdownTextStyle} text={displayLabel} />
          </View>
        </ModalDropdown>
        {touched && error && (
          <Text style={componentStyles.formRowError} text={error} />
        )}
      </View>
    </View>
  );
};
