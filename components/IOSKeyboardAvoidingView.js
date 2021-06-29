/*
 * See here: https://stackoverflow.com/a/50135408
 */
import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  NativeModules,
  StatusBarIOS,
  Platform
} from "react-native";

const { StatusBarManager } = NativeModules;

export default class IOSKeyboardAvoidingView extends Component {
  state = { statusBarHeight: 0 };

  componentDidMount() {
    const STATUSBAR_HEIGHT =
      Platform.OS === "ios" ? 34 : StatusBarManager.HEIGHT;
    this.setState({
      statusBarHeight: STATUSBAR_HEIGHT
    });
    this.statusBarListener = StatusBarIOS.addListener(
      "statusBarFrameWillChange",
      statusBarData => {
        this.setState({ statusBarHeight: statusBarData.frame.height });
      }
    );
  }

  componentWillUnmount() {
    this.statusBarListener.remove();
  }

  render() {
    const { style, headerVisible = true, children } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={
          this.state.statusBarHeight + (headerVisible ? 44 : 0)
        }
        style={style}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }
}
