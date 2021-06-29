import React, { Component } from "react";
import { View, SafeAreaView, Platform, Alert } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import screenStyles from "../account.styles";
import { updatePhoto } from "../account.actions";
import colors from "../../../../theme/colors";
import { ButtonList, AvatarPicker } from "../../../../components";
import * as ROLES from "../../../../constants/roles";

const CLIENT_LIST = [
  {
    label: "Username",
    to: "updateName",
    value: "Name",
    valueColor: colors.warmGrey
  },
  {
    label: "Phone Number",
    to: "updateNumber",
    value: "Verified",
    valueColor: colors.aquaMarine
  },
  {
    label: "Email",
    to: "updateEmail"
  },
  {
    label: "Change Password",
    to: "resetPassword"
  }
];

const COURIER_LIST = [
  {
    label: "Username",
    to: "updateName",
    value: "Name",
    valueColor: colors.warmGrey
  },
  {
    label: "Phone Number",
    to: "updateNumber",
    value: "Verified",
    valueColor: colors.aquaMarine
  },
  // {
  //   label: "Background Check",
  //   valueColor: colors.aquaMarine,
  //   noArrow: true
  // },
  {
    label: "Email",
    to: "updateEmail"
  },
  {
    label: "Car Info",
    to: "updateCarInfo"
  },
  {
    label: "Change Password",
    to: "resetPassword"
  }
];

class UpdateAccountScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Account Update"
    };
  };

  onSelect = async result => {
    const { updatePhoto, changeLoader, account } = this.props;

    const uri =
      Platform.OS === "ios" ? result.uri.replace("file://", "") : result.uri;

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        Alert.alert(e.message);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    updatePhoto("avatar", account.uid, blob);
  };

  render() {
    const { account } = this.props;

    const LIST_DATA =
      account.role === ROLES.COURIER ? COURIER_LIST : CLIENT_LIST;
    LIST_DATA[0].value = account.username;
    return (
      <SafeAreaView style={screenStyles.contentContainer}>
        <View style={{ marginTop: 29 }}>
          <AvatarPicker onSelect={this.onSelect} picture={account.photoURL} />
        </View>
        <View style={{ marginTop: 44 }}>
          <ButtonList
            listData={LIST_DATA}
            icon="chevron-right"
            styleButton={{ backgroundColor: colors.white }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    account: state.account,
    loading: state.loading
  }),
  {
    updatePhoto
  }
)(withNavigation(UpdateAccountScreen));
