import React, { Component } from "react";
import Entypo from "@expo/vector-icons/Entypo";

import Button from "../button";

class AbsoluteBackButton extends Component {
  render() {
    return (
      <Button
        style={{
          position: "absolute",
          left: 15,
          top: 36,
          zIndex: 1
        }}
        type="clear"
        onPress={() => this.props.goBack()}
      >
        <Entypo name="chevron-left" size={30} />
      </Button>
    );
  }
}
export default AbsoluteBackButton;
