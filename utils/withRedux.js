import React, { Component } from "react";
import { connect } from "react-redux";

export default function(
  ComposedComponent,
  mapState = null,
  mapDispatch = null
) {
  class ReduxWrapper extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  ReduxWrapper.navigationOptions = ComposedComponent.navigationOptions;

  return connect(mapState, mapDispatch)(ReduxWrapper);
}
