import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { colors } from "../../../../../theme";
import { Text } from "../../../../../components";
import { randomKey } from "../../../../../services/utils";

const TIPS = ["5", "10", "15", "..."];

const styles = StyleSheet.create({
  tips: {
    backgroundColor: colors.whiteTwo,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5
  },
  tipsActive: {
    backgroundColor: colors.manilla
  }
});

class Tips extends Component {
  renderTip = (tip, tipIndex, isActive) => {
    return isActive ? (
      <TouchableOpacity
        key={randomKey()}
        style={[styles.tips, styles.tipsActive]}
        onPress={() => this.props.changeTips({ index: 0, value: 0 })}
      >
        <Text text={tip === "..." ? tip : `$${tip}`} size="medium" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        key={randomKey()}
        style={styles.tips}
        onPress={() =>
          this.props.changeTips({
            index: tip !== "..." ? tipIndex : 0,
            value: tip === "..." ? "3.5" : tip,
            openCustomTipsForm: tip === "..."
          })
        }
      >
        <Text text={tip === "..." ? tip : `$${tip}`} size="medium" />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <React.Fragment>
        {TIPS.map((e, i) =>
          e === TIPS[this.props.tips.index - 1]
            ? this.renderTip(e, i + 1, true)
            : this.renderTip(e, i + 1, false)
        )}
      </React.Fragment>
    );
  }
}

Tips.propTypes = {
  tips: PropTypes.object,
  changeTips: PropTypes.func
};

export default Tips;
