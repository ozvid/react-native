import React, { Component } from "react";
import { Image } from "react-native";
import ActionSheet from "react-native-actionsheet";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";

import Button from "../button";
import Text from "../text";
import styles from "./picture-picker.styles";

const CANCEL_INDEX = 2;
const DESTRUCTIVE_INDEX = 2;
const OPTIONS = ["Camera", "Library", "Cancel"];

class PicturePicker extends Component {
  actionSheet;

  chooseCamera = async () => {
    const { onSelect } = this.props;
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (onSelect && !result.cancelled) {
      onSelect(result.uri);
    }
  };

  chooseLibrary = async () => {
    const { onSelect } = this.props;
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (onSelect && !result.cancelled) {
      onSelect(result.uri);
    }
  };

  choosePicture = async index => {
    switch (index) {
      case 0:
        await this.chooseCamera();
        break;
      case 1:
        await this.chooseLibrary();
        break;
      default:
    }
  };

  render() {
    const { picture, isButton, button } = this.props;
    return (
      <React.Fragment>
        {isButton ? (
          <Button onPress={() => this.actionSheet.show()} text={button.text}>
            {button.children}
          </Button>
        ) : (
          <React.Fragment>
            <Button
              type="clear"
              style={styles.pictureButton}
              onPress={() => this.actionSheet.show()}
            >
              {picture ? (
                <Image style={styles.picture} source={{ uri: picture }} />
              ) : (
                <Text>Click here{`\n`}to add image</Text>
              )}
            </Button>
            <Text> {picture && "Press on image to choose another"} </Text>
          </React.Fragment>
        )}
        <ActionSheet
          // eslint-disable-next-line no-return-assign
          ref={ref => (this.actionSheet = ref)}
          title="Select"
          options={OPTIONS}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.choosePicture}
        />
      </React.Fragment>
    );
  }
}

PicturePicker.propTypes = {
  picture: PropTypes.string,
  isButton: PropTypes.bool,
  button: PropTypes.shape({
    text: PropTypes.string,
    children: PropTypes.element
  })
};

export default PicturePicker;
