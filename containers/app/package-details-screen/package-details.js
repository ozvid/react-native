import React, { Component } from "react";
import { SafeAreaView, View, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Feather, Entypo } from "@expo/vector-icons";

import { colors, styles } from "../../../theme";
import screenStyles from "./package-details.styles";
import styleButtonList from "../../../components/button-list/button-list.styles";
import { Text, Button } from "../../../components";
import * as IMAGES from "../../../constants/images";
import { packageNames } from "../../../constants/text";

class PackageDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Package Details",
      headerLeft: (
        <View style={{ marginLeft: 15 }}>
          <Entypo
            color={colors.black}
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={30}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.white
      }
    };
  };

  render() {
    const { navigation } = this.props;
    const packageInfo = navigation.getParam("package");
    return (
      <SafeAreaView style={styles.fullContainer}>
        <ScrollView style={styles.fullContainer}>
          <View style={styles.fullContainer}>
            <View style={screenStyles.blockImg}>
              <Image
                source={IMAGES.LOCATION}
                style={{ width: 131, height: 150 }}
              />
            </View>
            <View>
              <View style={screenStyles.blockInfo}>
                <Text
                  size="medium"
                  align="left"
                  text="Package Size:"
                  fontFamily="rubik-bold"
                />
                <Text
                  size="medium"
                  align="left"
                  text={`${packageNames[packageInfo.packageType]} (${
                    packageInfo.dimensions.height
                  }" x ${packageInfo.dimensions.length}" x ${
                    packageInfo.dimensions.width
                  }")`}
                />
              </View>
              <Button
                type="clear"
                style={{
                  ...styleButtonList.button,
                  backgroundColor: colors.white
                }}
                onPress={() =>
                  navigation.navigate("packageImage", {
                    packagePhotos: packageInfo.packagePhotos,
                    type: packageInfo.packageType
                  })
                }
              >
                <View>
                  <Text
                    size="medium"
                    align="left"
                    text="Package Images:"
                    fontFamily="rubik-bold"
                  />
                </View>
                <Feather name="chevron-right" size={23} color={colors.black} />
              </Button>
              <View style={screenStyles.blockInfo}>
                <Text
                  size="medium"
                  align="left"
                  text="Package Description:"
                  fontFamily="rubik-bold"
                />
                {packageInfo.description && (
                  <Text size="medium" align="left">
                    {packageInfo.description}
                  </Text>
                )}
                {packageInfo.publicNotes && (
                  <Text size="medium" align="left">
                    {packageInfo.publicNotes}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect()(withNavigation(PackageDetailsScreen));
