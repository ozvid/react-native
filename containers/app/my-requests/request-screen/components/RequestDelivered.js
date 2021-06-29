import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";

import { Text, Button } from "../../../../../components";
import * as screenStyles from "../request.styles";

import Rate from "./Rate";
import Tips from "./Tips";
import AddressBlock from "../../../../../components/address-block/address-block";
import ArrowBlockButton from "../../../../../components/arrow-block-button";
import CustomTips from "./CustomTips";

class RequestDelivered extends Component {
  state = {
    rate: 0,
    tips: {
      index: 0,
      value: 0,
      openCustomTipsForm: false
    }
  };

  render() {
    return (
      <React.Fragment>
        <View style={screenStyles.slidingUpBody}>
          <View style={screenStyles.deliveredBlock}>
            <View style={screenStyles.wrapContainer}>
              <View style={screenStyles.horizontalContainer}>
                <View style={screenStyles.textBlock}>
                  <Text
                    text="Rate your delivery partner"
                    fontFamily="rubik-bold"
                    size="medium"
                    align="left"
                  />
                </View>
                <View style={screenStyles.itemsBlock}>
                  <Rate
                    rate={this.state.rate}
                    changeRate={rate => this.setState({ rate })}
                  />
                </View>
              </View>
              <View style={screenStyles.spaceBetween} />
              <View style={screenStyles.horizontalContainer}>
                <View style={screenStyles.textBlock}>
                  <Text
                    text="Add tips"
                    fontFamily="rubik-bold"
                    size="medium"
                    align="left"
                  />
                </View>
                <View style={screenStyles.itemsBlock}>
                  <Tips
                    tips={this.state.tips}
                    changeTips={tips => this.setState({ tips })}
                  />
                </View>
              </View>
              <View style={screenStyles.spaceBetween} />
              <View style={screenStyles.horizontalContainer}>
                <View style={{ flexDirection: "column", flex: 1 }}>
                  {this.state.tips.index === 4 &&
                  this.state.tips.value &&
                  !this.state.tips.openCustomTipsForm ? (
                    <React.Fragment>
                      <Text
                        text={`Tip amount: $${this.state.tips.value}`}
                        fontFamily="rubik-bold"
                        size="medium"
                      />
                      <View style={screenStyles.spaceBetween} />
                    </React.Fragment>
                  ) : (
                    <React.Fragment />
                  )}
                  <Button
                    text="Confirm"
                    onPress={() =>
                      this.props.confirmRequest(
                        this.state.rate,
                        this.state.tips.value
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          <AddressBlock data={this.props.data} />

          <ArrowBlockButton
            navigation={this.props.navigation}
            text="Package Details"
            to="packageDetails"
            params={{ package: this.props.data }}
          />
          {/* <ArrowBlockButton
            text="Need help?"
            to="packageDetails"
            params={{ package: this.props.data }}
          /> */}
        </View>
        <CustomTips
          visible={this.state.tips.openCustomTipsForm}
          changeTips={tips => this.setState({ tips })}
        />
      </React.Fragment>
    );
  }
}

export default withNavigation(RequestDelivered);
