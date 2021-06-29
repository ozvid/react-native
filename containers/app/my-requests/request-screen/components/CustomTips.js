import React, { Component } from "react";
import { View, Animated, TextInput } from "react-native";
import { withNavigation } from "react-navigation";
import SlidingUpPanel from "rn-sliding-up-panel";
import PropTypes from "prop-types";

import { Text, Button } from "../../../../../components";
import { colors, metrics } from "../../../../../theme";

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  tipsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
    marginHorizontal: 36,
    alignItems: "center"
  },
  tips: {
    flexDirection: "row",
    alignItems: "center"
  },
  tipsText: { fontFamily: "rubik", fontSize: 20 },
  button: { borderRadius: 0 }
};

class CustomTips extends Component {
  formValue;

  handlePress = () => {
    if (parseFloat(this.formValue)) {
      this.props.changeTips({
        index: 4,
        value: parseFloat(this.formValue),
        openCustomTipsForm: false
      });
      this.panelRef.hide();
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.visible && (
          <SlidingUpPanel
            ref={c => {
              // eslint-disable-next-line no-unused-expressions
              c && c.show();
              this.panelRef = c;
            }}
            animatedValue={new Animated.Value(metrics.deviceHeight * 0.1)}
            draggableRange={{
              top: metrics.deviceHeight * 0.5,
              bottom: 0
            }}
          >
            {() => (
              <View style={styles.container}>
                <View style={styles.tipsContainer}>
                  <Text
                    text="Amount:"
                    fontFamily="rubik-bold"
                    size="exRegular"
                  />
                  <View style={styles.tips}>
                    <Text text="$" fontFamily="rubik" size="exRegular" />
                    <TextInput
                      autoFocus
                      keyboardType="numeric"
                      style={styles.tipsText}
                      // eslint-disable-next-line no-return-assign
                      onChangeText={text => (this.formValue = text)}
                    />
                  </View>
                </View>
                <Button
                  text="Set Tip"
                  style={styles.button}
                  onPress={this.handlePress}
                />
              </View>
            )}
          </SlidingUpPanel>
        )}
      </React.Fragment>
    );
  }
}

CustomTips.propTypes = {
  visible: PropTypes.bool,
  changeTips: PropTypes.func
};

export default withNavigation(CustomTips);
