/* eslint-disable consistent-return */
import React, { Component } from "react";
import ActionSheet from "react-native-actionsheet";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { FILE, firebaseService } from "../../services";
import { getFormattedDate, getFormattedTime } from "../../utils/date";
import { getBlob } from "../../services/utils";

const CANCEL_INDEX = 2;
const DESTRUCTIVE_INDEX = 2;
const OPTIONS = ["Camera", "Library", "Cancel"];

class FunctionPicker extends Component {
  generateImageName = name =>
    `${name}_${getFormattedDate()}_${getFormattedTime()}`;

  setStorePhoto = fileName => {
    return this.chooseCamera().then(result => {
      if (result.cancelled) {
        return Promise.reject(new Error("Permission Error"));
      }
      return FILE.movePhoto(result.uri, "SA_IMAGES", "package.jpg").then(() =>
        FILE.getPhoto("SA_IMAGES/package.jpg").then(data =>
          getBlob(data.uri).then(blob =>
            firebaseService.uploadFile({
              directory: "packages",
              file_id: this.generateImageName(fileName),
              device_file_full_path: blob
            })
          )
        )
      );
    });
  };

  isPermissions = async () => {
    const { status } = await Permissions.getAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      if (status !== "granted") {
        return;
      }
    }
  };

  chooseCamera = async () => {
    await this.isPermissions();

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.8
    });

    if (!!result && !result.cancelled) {
      return result;
    }
  };

  chooseLibrary = async () => {
    this.isPermissions();

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    });

    if (!!result && !result.cancelled) {
      return result;
    }
  };

  choosePicture = async index => {
    const { onSelect } = this.props;
    let result;

    switch (index) {
      case 0:
        result = await this.chooseCamera();
        break;
      case 1:
        result = await this.chooseLibrary();
        break;
      default:
    }

    if (onSelect) {
      onSelect(result);
    }
  };

  showActionSheet = () => this.actionSheet.show();

  // eslint-disable-next-line no-return-assign
  getActionSheetRef = ref => (this.actionSheet = ref);

  renderActionSheet() {
    const { title = "Avatar" } = this.props;
    return (
      <ActionSheet
        ref={this.getActionSheetRef}
        title={title}
        options={OPTIONS}
        cancelButtonIndex={CANCEL_INDEX}
        destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={this.choosePicture}
      />
    );
  }
}

export default FunctionPicker;
