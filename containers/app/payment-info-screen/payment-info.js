import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { Feather, Entypo } from "@expo/vector-icons";

import screenStyles from "./payment-info.styles";
import styleButtonList from "../../../components/button-list/button-list.styles";
import colors from "../../../theme/colors";
import { Button, Text } from "../../../components";
import { setCard } from "../new-request/new-request.actions";

class PaymentInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Payment Info"
    };
  };

  chooseCard = data => {
    const { navigation, setCard } = this.props;

    setCard(data);
    navigation.goBack();
  };

  renderButton = ({ item }) => {
    return (
      <Button
        type="clear"
        style={{ ...styleButtonList.button, backgroundColor: colors.white }}
        onPress={() => this.chooseCard(item)}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Entypo
            name="credit-card"
            size={26}
            style={{
              marginRight: 10
            }}
          />
          <Text align="left" text={`**** ${item.last4}`} color={colors.black} />
        </View>
        <Feather name="chevron-right" size={23} color={colors.black} />
      </Button>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={screenStyles.contentContainer}>
        <View style={{ marginTop: 44 }}>
          <Text
            text="Payment Methods"
            align="left"
            style={screenStyles.title_h}
          />
          <FlatList
            data={this.props.credit_cards}
            extraData={this.props}
            renderItem={this.renderButton}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            type="clear"
            style={{ ...styleButtonList.button, backgroundColor: colors.white }}
            onPress={() =>
              navigation.navigate("addCard", {
                isPlaseOrder: navigation.getParam("isPlaseOrder") || false
              })
            }
          >
            <Text align="left" text="Add Payment Card" color={colors.black} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    credit_cards: state.account.credit_cards
  }),
  {
    setCard
  }
)(withNavigation(PaymentInfoScreen));
