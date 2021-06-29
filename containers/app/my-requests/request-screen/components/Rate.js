import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import _ from "lodash";
import PropTypes from "prop-types";

import { colors } from "../../../../../theme";
import { randomKey } from "../../../../../services/utils";

class Rate extends Component {
  handleChangeRate = (rate, isActive) => {
    if (this.props.rate === 1 && isActive) {
      this.props.changeRate(0);
    } else {
      this.props.changeRate(rate);
    }
  };

  renderStar = (isActive, rate) => {
    return (
      <React.Fragment key={randomKey()}>
        {this.props.readOnly ? (
          <Entypo
            size={28}
            color={colors.aquaMarine}
            name={`star${isActive ? "" : "-outlined"}`}
          />
        ) : (
          <TouchableOpacity
            onPress={() => this.handleChangeRate(rate, isActive)}
          >
            <Entypo
              size={28}
              color={colors.aquaMarine}
              name={`star${isActive ? "" : "-outlined"}`}
            />
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  };

  render() {
    const stars = _.concat(
      _.fill(Array(this.props.rate), { isActive: true }),
      _.fill(Array(5 - this.props.rate), { isActive: false })
    );
    return stars.map((e, i) => this.renderStar(e.isActive, i + 1));
  }
}

Rate.propTypes = {
  rate: PropTypes.number,
  readOnly: PropTypes.bool,
  changeRate: PropTypes.func
};

export default Rate;
