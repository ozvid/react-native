import React, { Component } from "react";
import { View, Animated } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SlidingUpPanel from "rn-sliding-up-panel";

import { metrics } from "../../theme";
import * as componentStyles from "./sliding-up.styles";
import Text from "../text";
import HandleButton from "../handle-button";
import { fontAwesomeShevronIconSize } from "../../constants";

const buttonHeight = 30;
const buttonMargin = 30;

class SlidingUp extends Component {
  state = {
    chevron: "up",
    draggableRange: {
      top: metrics.deviceHeight * 0.63,
      bottom: metrics.deviceHeight * 0
    }
  };

  animatedValue = new Animated.Value(metrics.deviceHeight * 0.1);

  savedTitle = "";

  firstTime = true;

  componentDidMount() {
    this.animatedValue.addListener(this.animatedValueListener);
  }

  animatedValueListener = ({ value }) => {
    if (value === this.state.draggableRange.top) {
      this.setState({ chevron: "down" });
    }

    if (value === this.state.draggableRange.bottom) {
      this.setState({ chevron: "up" });
    }
  };

  heightHandler = (bottom = 0, top) => {
    this.setState(prevState => ({
      draggableRange: {
        top: top ? metrics.deviceHeight * top : prevState.draggableRange.top,
        bottom: bottom
          ? metrics.deviceHeight * bottom
          : prevState.draggableRange.bottom
      }
    }));
  };

  slideEnd = value => {
    if (
      value !== this.state.draggableRange.top &&
      value !== this.state.draggableRange.bottom
    ) {
      this.state.chevron === "up" ? this._panel.show() : this._panel.hide();
    }
  };

  wrapper = (data, dragHandler) => {
    const { title, belowText, content, button } = data();
    return (
      <React.Fragment>
        {button ? (
          <HandleButton
            ref={() => {
              if (!this.buttonExists) {
                this.heightHandler(
                  (this.state.draggableRange.bottom + buttonHeight) /
                    metrics.deviceHeight,
                  (this.state.draggableRange.top + buttonHeight) /
                    metrics.deviceHeight
                );
              }
              this.buttonExists = true;
            }}
            style={{
              marginHorizontal: 30,
              marginBottom: buttonMargin,
              height: buttonHeight
            }}
            handleSubmit={button.onButtonPress}
            textButton={button.buttonText}
          />
        ) : (
          this.buttonExists && <View style={{ height: buttonHeight }} />
        )}
        <View style={componentStyles.container} {...dragHandler}>
          <View
            onLayout={event =>
              this.heightHandler(
                null,
                (button
                  ? event.nativeEvent.layout.height +
                    buttonHeight +
                    buttonMargin
                  : event.nativeEvent.layout.height) / metrics.deviceHeight
              )
            }
          >
            <View
              onLayout={event =>
                this.heightHandler(
                  (button
                    ? event.nativeEvent.layout.height +
                      buttonHeight +
                      buttonMargin
                    : event.nativeEvent.layout.height) / metrics.deviceHeight,
                  null
                )
              }
              style={componentStyles.slidingUpHeaderContainer}
            >
              <View style={componentStyles.slidingUpHeader}>
                <Text
                  text={title}
                  fontFamily="rubik-bold"
                  size="regular"
                  style={{ textAlign: "left" }}
                />
                <FontAwesome
                  name={`chevron-${this.state.chevron}`}
                  size={fontAwesomeShevronIconSize}
                  onPress={() =>
                    this.state.chevron === "up"
                      ? this._panel.show()
                      : this._panel.hide()
                  }
                />
              </View>
              {belowText ? (
                <View style={{ marginBottom: 16 }}>
                  <Text
                    text={belowText}
                    size="medium"
                    style={componentStyles.slidingUpBelowText}
                  />
                </View>
              ) : (
                <View style={{ marginVertical: 16 }} />
              )}
            </View>
            {content}
          </View>
        </View>
      </React.Fragment>
    );
  };

  render() {
    return (
      <SlidingUpPanel
        animatedValue={this.animatedValue}
        draggableRange={this.state.draggableRange}
        ref={c => {
          if (c) {
            const { top, bottom } = c.props.draggableRange;
            const initPos = c._initialDragPosition;
            const { title } = this.props.data();
            if (
              bottom !== 0 &&
              initPos > bottom &&
              initPos < top &&
              title !== this.savedTitle &&
              !this.firstTime
            ) {
              this.savedTitle = title;
              c.show();
              this.firstTime = false;
            }
          }
          this._panel = c;
        }}
        backdropOpacity={0}
        onDragEnd={value => this.slideEnd(value)}
        onMomentumDragEnd={value => this.slideEnd(value)}
      >
        {dragHandler => this.wrapper(this.props.data, dragHandler)}
      </SlidingUpPanel>
    );
  }
}
export default SlidingUp;
