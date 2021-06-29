import React from "react";
import { ActivityIndicator, Modal, View, StyleSheet } from "react-native";

import { colors } from "../../theme";

export const Loading = props => {
  return (
    <Modal
      animationType="fade"
      visible={props.loading}
      presentationStyle="overFullScreen"
      transparent
    >
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.overlay
  }
});

export default Loading;
