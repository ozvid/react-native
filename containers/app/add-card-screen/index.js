import React, { Component } from "react";
import { SafeAreaView, Alert } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { updateProfile } from "../account/account.actions";
import globalStyles from "../../../theme/global-styles";
import CardForm from "./components/CardForm";
import { Button, Text } from "../../../components";
import { colors } from "../../../theme";
import DismissKeyboardView from "../../../components/DismissKeyboardView";
import IOSKeyboardAvoidingView from "../../../components/IOSKeyboardAvoidingView";
import { firebaseService } from "../../../services";
import { changeLoader } from "../../../components/loading/loading.actions";
import { setCard } from "../new-request/new-request.actions";
import { TestCreditCard } from "../../../constants";
import { showAlert } from "../../../components/custom-alert/custom-alert.actions";

class AddCardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Add Card",
      headerRight: (
        <Button
          type="clear"
          onPress={() => navigation.state.params.handleSubmit()}
          style={{ marginRight: 15 }}
        >
          <Text
            text="Add"
            size="medium"
            color={colors.aquaMarine}
            fontFamily="rubik-bold"
          />
        </Button>
      )
    };
  };

  handleSubmit = ({ name, number, address_zip, exp_date }) => {
    const { navigation, updateProfile, account, changeLoader } = this.props;
    changeLoader({ visible: true });
    firebaseService
      .createCreditCard({
        card: {
          name,
          number: number.replace(/\s/g, ""),
          address_zip,
          exp_month: parseInt(exp_date.split("/")[0], 10),
          exp_year: 2000 + parseInt(exp_date.split("/")[1], 10)
        }
      })
      .then(res => {
        account.credit_cards.push({
          stripe_id: res.data.id,
          last4: res.data.last4,
          brand: res.data.brand
        });

        if (navigation.getParam("isPlaceOrder")) {
          setCard(account.credit_cards);
        }

        updateProfile({
          credit_cards: account.credit_cards
        });
      })
      .catch(err => this.props.showAlert({ message: err.message }))
      .finally(() => changeLoader({ visible: false }));
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.fullContainer}>
        <DismissKeyboardView>
          <IOSKeyboardAvoidingView style={globalStyles.fullContainer}>
            <CardForm
              onSubmit={this.handleSubmit}
              navigation={this.props.navigation}
            />
          </IOSKeyboardAvoidingView>
        </DismissKeyboardView>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    account: state.account
  }),
  {
    updateProfile,
    changeLoader,
    setCard,
    showAlert
  }
)(withNavigation(AddCardScreen));
