import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,ActivityIndicator,
  View,TouchableOpacity,
  StatusBar,
} from "react-native";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getDistance,
          calculatePrice,
          StorePrice,
          submitOrder,
          updateCard,
          reset,
          verifyCard,
          onPayment,
          charge_method,

        } from '../../actions/Map';

import AndroidBackButton from "react-native-android-back-button";

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";

const s = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});
const USE_LITE_CREDIT_CARD_INPUT = false;
const menu = require("../../../img/MENU.png");

class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_data: null,
    }

  }
  _onChange = formData => {
    /* eslint no-console: 0 */
    this.setState({card_data: formData});
    this.props.updateCard(formData);
    //console.log(JSON.stringify(formData, null, " "));
  };

  _onFocus = field => {
    /* eslint no-console: 0 */
    console.log(field);
  };

  nav() {
    if (this.props.onpayment) {
      if (!this.props.card_exist){
        this.props.charge_method('CASH');
      }
      this.props.navigation.navigate('Map');
    } else {
      this.props.navigation.navigate('Payment');
    }
  }
  render() {
    return (
      <View style={s.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />

        <AndroidBackButton
          onPress={() => this.nav()}
         />

        <Header  style = {{borderBottomColor: "#FFF", backgroundColor: "#0397DD"}}>
          <Left>
            <Button transparent onPress={() =>this.nav()}>
              <Icon name="arrow-back" style = {{color: '#FFF'}} />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#FFF', fontWeight: '100'}}>Payment</Title>
          </Body>
          <Right />
        </Header>
        <View style = {{flex: 3, marginTop: 20}}>

        { USE_LITE_CREDIT_CARD_INPUT ?
          (<LiteCreditCardInput
              autoFocus
              inputStyle={s.input}

              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />) :
            (<CreditCardInput
                autoFocus

                requiresName
                requiresCVC
                requiresPostalCode={false}

                labelStyle={s.label}
                inputStyle={s.input}
                validColor={"black"}
                invalidColor={"red"}
                placeholderColor={"darkgray"}

                onFocus={this._onFocus}
                onChange={this._onChange} />)
        }
      </View>
      {this.props.card_exist && !this.props.from_payment && this.nav()}
      {this.props.card !== null &&
      <View style = {{flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      //alignContents: 'center',
                      }}>
                      <Text
                      style = {{
                        fontSize: 15,
                        marginTop: 10,
                        alignSelf: 'center',
                        color: '#f62e2e',
                        marginBottom: 15,
                      }}
                      >{this.props.card_status}</Text>
                      <TouchableOpacity
                      disabled = {this.props.load}
                      onPress = {() => this.props.verifyCard(this.props.card,this.props.user.userid)}
                      style = {{
                          width: '80%',
                          backgroundColor: '#FFF',
                          height: '40%',
                          backgroundColor: '#0397DD',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }}>
                      {this.props.load ?

                     <ActivityIndicator/>
                       :
                    <Text
                      style = {{
                          color: '#FFF',
                          fontWeight: '200',
                          fontSize: 20,
                          textAlign: 'center',
                      }}
                      >CONTINUE</Text>
                    }

                      </TouchableOpacity>

      </View>
      }
    </View>
    );
  }
}




const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    estimated_price,
    distanceInKM,
    distanceInHR,
    load,
    prices,
    order_info,
    card,
    pickup_coords,
    card_exist,
    dropoff_coords,
    type,
    onpayment,card_status,
    charge_type,
    edit_progress,
    screenshot,from_payment,
    scheduled,
    order_success,flutterwave_token,transaction_id,
    error_submitting_order,
    error, region, user, distance_info, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    onpayment,
    error,
    distanceInKM,
    distanceInHR,
    hoveron,
    distance_info,
    loading,
    card_exist,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    emergency,
    prices,
    estimated_price,
    order_info,
    pickup_coords,
    dropoff_coords,
    type,
    scheduled,card_status,
    order_success,
    card,load,
    charge_type,
    error_submitting_order,
    edit_progress,
    screenshot,
    flutterwave_token,
    transaction_id,from_payment,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  update_region,
  fetchPrice,
  getDistance,
  calculatePrice,
  StorePrice,
  updateCard,
  reset,

  verifyCard,
  submitOrder,
  onPayment,
  charge_method,
})(CardView);
