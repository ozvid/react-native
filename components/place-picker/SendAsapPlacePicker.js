import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import colors from "../../theme/colors";
import fonts from "../../constants/fonts";

const SendAsapPlacePicker = props => {
  const {
    label = "Label",
    placeholder = "Type a location",
    placeholderTextColor = colors.warmGrey,
    textInputLeftPadding = 50,
    listTop = 100,
    style = {},
    onFocus = () => ({}),
    onPlaceSelected = () => ({}),
    value,
    ...rest
  } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 10,
        backgroundColor: colors.veryLightGreyTwo,
        ...style
      }}
    >
      <View style={{ minWidth: 50 }}>
        <Text style={{ ...fonts.textInputPlaceholder, color: colors.warmGrey }}>
          {label}
        </Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        minLength={2}
        autoFocus={true}
        returnKeyType={"search"}
        listViewDisplayed={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          onPlaceSelected(data, details);
          // this.props.notifyChange(details.geometry.location);
        }}
        query={{
          key: "AIzaSyAauCANwVXelvblEn6H7wOF_cifMvsUYoU",
          language: "en"
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
        textInputProps={{
          onFocus
        }}
        getDefaultValue={() => value || ""}
        styles={{
          container: {
            position: "absolute",
            paddingLeft: textInputLeftPadding,
            top: 10,
            left: 0,
            right: 0,
            height: 41
          },
          textInputContainer: {
            height: "auto",
            padding: 0,
            margin: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRadius: 0,
            backgroundColor: colors.veryLightGreyTwo
          },
          description: {
            ...fonts.paragraph
          },
          predefinedPlacesDescription: {
            ...fonts.paragraph
          },
          textInput: {
            height: 19,
            marginTop: 0,
            marginBottom: 0,
            marginRight: 0,
            marginLeft: 0,
            paddingLeft: 10,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            backgroundColor: colors.veryLightGreyTwo,
            ...fonts.paragraph,
            lineHeight: 19
          },
          listView: {
            borderTop: "solid",
            borderTopWidth: 1,
            borderTopColor: colors.veryLightGreyThree,
            backgroundColor: colors.white,
            position: "absolute",
            top: listTop,
            left: -30,
            right: -30
          }
        }}
        {...rest}
      />
    </View>
  );
};

export default SendAsapPlacePicker;
