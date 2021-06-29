import React, { Component } from "react";
import Entypo from "@expo/vector-icons/Entypo";

import Button from "../button";

class AbsoluteButton extends Component {
  render() {
    return (
      <Button
        style={{
          position: "absolute",
          left: 15,
          top: 28,
          zIndex: 1
        }}
        type="clear"
        onPress={() => this.props.onPress()}
      >
        <Entypo
          name={this.props.icon ? this.props.icon : "chevron-left"}
          size={30}
        />
      </Button>
    );
  }
}
export default AbsoluteButton;
