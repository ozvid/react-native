import React from "react";
import { View, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import { Icon } from "expo";

import Text from "../../../components/text";
import Button from "../../../components/button";
import LinkButton from "../../../components/link-button";
import { logout } from "../../auth/auth.actions";
import * as images from "../../../constants/images";
import screenStyles from "./drawer-menu.styles";
import theme from "../../../theme";

const DrawerMenu = ({ account, logout }) => {
  const profileImage = account.photoURL
    ? { uri: account.photoURL }
    : images.avatar;

  return (
    <View style={theme.styles.fullContainer}>
      <ScrollView
        style={screenStyles.container}
        contentContainerStyle={theme.styles.scrollViewContentContainer}
      >
        <LinkButton style={screenStyles.btnProfile} to="account">
          <View style={screenStyles.avatarContainer}>
            <Image style={screenStyles.avatarImage} source={profileImage} />
          </View>
          <View>
            <Text
              color="primary"
              align="left"
              text={`${account.displayName || "User"}`}
            />
            <Text
              color="description"
              size="small"
              align="left"
              text="View Profile"
            />
          </View>
        </LinkButton>

        <Button type="clear" style={screenStyles.menuItem} onPress={logout}>
          <Icon.Feather name="log-out" size={25} color={theme.colors.white} />
          <Text color="secondary" text="Log Out" />
        </Button>
      </ScrollView>
    </View>
  );
};

export default connect(
  state => ({
    account: state.account
  }),
  {
    logout
  }
)(DrawerMenu);
