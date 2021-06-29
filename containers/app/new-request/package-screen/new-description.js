import React from "react";
import { SafeAreaView, Alert } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { change } from "redux-form";
import Constants from "expo-constants";
import moment from "moment";

import { styles } from "../../../../theme";
import DescriptionForm from "./components/DescriptionForm";
import { FILE } from "../../../../services";
import FunctionPicker from "../../../../components/picture-picker/function-picker";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import IOSKeyboardAvoidingView from "../../../../components/IOSKeyboardAvoidingView";
import { testPhotoUrl } from "../../../../constants";

class NewDescriptionScreen extends FunctionPicker {
  setStorePhoto = async () => {
    const { navigation } = this.props;

    const result = await this.chooseCamera();
    const fileName = `package${moment().unix()}.jpg`;
    if (!result.cancelled) {
      FILE.movePhoto(result.uri, "SA_IMAGES", fileName)
        .then(() => {
          return FILE.getPhoto(`SA_IMAGES/${fileName}`).then(data => {
            this.props.change("PackageForm", "photoURL", data.uri);
            if (!navigation.getParam("isEdit")) {
              navigation.navigate("newConfirmation");
            }
          });
        })
        .catch(err => Alert.alert(err.message));
    }
  };

  handleSubmit = () => {
    const { navigation } = this.props;
    if (navigation.getParam("isEdit")) {
      navigation.navigate("newConfirmation");
    } else if (Constants.isDevice) {
      this.setStorePhoto();
    } else {
      this.props.change("PackageForm", "photoURL", testPhotoUrl);
      navigation.navigate("newConfirmation");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.fullContainer}>
        <DismissKeyboardView>
          <IOSKeyboardAvoidingView style={styles.fullContainer}>
            <DescriptionForm onSubmit={this.handleSubmit} />
          </IOSKeyboardAvoidingView>
        </DismissKeyboardView>
      </SafeAreaView>
    );
  }
}

export default connect(null, {
  change
})(withNavigation(NewDescriptionScreen));
