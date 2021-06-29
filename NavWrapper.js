import React, { Component } from "react";
import { connect } from "react-redux";
import { createAppContainer } from "react-navigation";
import PropTypes from "prop-types";

import NavigationService from "./services/navigation";
import Navigation from "./navigation/navigation";
import Loading from "./components/loading";
import CustomAlert from "./components/custom-alert";

const AppContainer = createAppContainer(Navigation);

class NavWrapper extends Component {
  render() {
    return (
      <>
        <Loading loading={this.props.loading} />
        <CustomAlert {...this.props.customAlert} />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          screenProps={{
            account: this.props.account
          }}
        />
      </>
    );
  }
}

NavWrapper.propTypes = {
  loading: PropTypes.any,
  customAlert: PropTypes.object,
  account: PropTypes.object
};

export default connect(state => ({
  account: state.account,
  loading: state.loading.visible,
  customAlert: state.customAlert
}))(NavWrapper);
