import React, { Component } from "react";
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
          reset,
          onPayment,
          charge_method,
          getCard,
          network_change,

        } from '../../actions/Map';

import { View, NetInfo, Image,ActivityIndicator, StatusBar, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";
import AndroidBackButton from "react-native-android-back-button";
''

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Body,
  Left,
  Right,
  IconNB,
  Item,
  Input,

  Form
} from "native-base";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import * as Animatable from 'react-native-animatable';

import styles from "./styles";

const dropoff = require("../../../img/dropoff.png");
const deviceHeight = Dimensions.get("window").height;

const radio_props = [
  {label: 'CASH', value: 'CASH' },
  {label: 'CARD', value: 'CARD' }
];



class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.charge_type,

    }

  }

 componentWillMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    
        NetInfo.isConnected.fetch().done(
          (isConnected) => {  this.props.network_change(isConnected); }
        );
 
  }


  async componentDidMount(){
    this.props.reset();

    if (this.props.fetch_price_error) {
      const pricee = await this.props.fetchPrice(this.props.vehicle, this.props.emergency);
    }

    var km_num = Number(this.props.distanceInKM);
    var hr_num = Number(this.props.distanceInHR);
    var num_price_per_km = Number(this.props.prices.per_km);
    var num_price_per_hr = Number((this.props.prices.per_hr)/60);
    var num_emergency = Number(this.props.prices.emergency);
    var num_base = Number(this.props.prices.base_price);

    var price = (km_num * num_price_per_km) + (hr_num * num_price_per_hr) + num_emergency + num_base;
    var pricee= Math.ceil(price);
    this.props.StorePrice(pricee);

  }


  handleConnectionChange = (isConnected) => {
        // this.setState({ status: isConnected });
          this.props.network_change(isConnected);
          //console.log(`is connected: ${this.state.status}`);
  }

  calculatePriceThe () {



}


  formatDollar(num) {
      var p = num.toFixed(2).split(".");
      return "₦" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
          return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") + "." + p[1];
  }

  placeOrder() {
    this.props.submitOrder(this.props.user.userid,
      this.props.pickup,
      this.props.destination,
      this.props.emergency,
      this.props.order_info,
      this.props.pickup_coords,
      this.props.dropoff_coords,
      this.props.type,
      this.props.scheduled,
      this.props.estimated_price,
      this.props.distanceInKM,
      this.props.distanceInHR,
      this.props.screenshot,
      this.props.prices.base_price,
      this.props.prices.tollgate,
      this.props.prices.emergency,
      this.props.vehicle,
      this.props.charge_type,
      this.props.flutterwave_token,
      this.props.transaction_id
    );
  }

  handler() {
    if (this.props.order_success) {
      this.props.navigation.navigate('Confirm');
    } else if (this.props.error_submitting_order) {
      //this.props.navigation.navigate('ErrorPage');
    }
  }

  choose_card(val){
    this.props.charge_method(val);

  }



  render() {
    return (
      <Container style={styles.container}>
          {this.handler()}

        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Pickup')}
         />

        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Pickup')}>
              <Icon  style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title  style = {{color: '#888', fontWeight: '100'}}> SUMMARY </Title>
          </Body>
          <Right />
        </Header>


        <View style ={styles.mainContainer}>
              {this.props.edit_progress &&
                <ActivityIndicator style = {{
                justifyContent: 'center',
                alignItems: 'center',
              }} />
            }
            <View style ={styles.firstText}>
              <Text style = {{color: "#CCC"}}>
                  YOUR ROUTE
              </Text>

              <View style = {styles.route}>
                <Image source={scooter_circle} style={styles.drawerCover}/>
                <Text style = {{fontSize: 13,color: "#CCC"}}>
                    {this.props.distanceInHR} mins
                </Text>
                  <Text style = {{fontSize: 13,color: "#CCC"}}>
                      {this.props.distanceInKM} KM
                  </Text>
                <Image source={flag} style={styles.drawerCover}/>
              </View>
            </View>

            <View style = {styles.dispatcher}>
              <Text style = {{color: "#CCC"}}>
                  DISPATCHER
              </Text>
              <Text style ={{padding: 20, color: '#888', fontSize: 13,}}> A dispatcher
              will be assigned to you shortly </Text>
            </View>

            <View style = {styles.cost}>
              <Text style = {{color: "#CCC"}}>
                  ESTIMATED COST
              </Text>
              {(this.props.pickup !== '') && (this.props.destination !== '') &&
              (!this.props.distance_error) && (!this.props.getting_distance) &&
              (!this.props.fetching_prices) && (!this.props.fetch_error) &&

              <View style={styles.costText}>

                <Text style={styles.costTextText}>

                  ₦ {this.props.estimated_price}
                </Text>
              </View>
            }

              <View style={styles.confirmButton}>
                <TouchableOpacity style = {styles.continue}
                  onPress = {() => this.placeOrder()}
                  disabled = {this.props.estimated_price === null && (this.props.fetch_error === true) ? true : false} >
                  <View style={styles.buttonContainer}>
                    <Text style = {styles.continueText}>{this.props.estimated_price === null && (this.props.fetch_error === true) ? 'ERROR OCCURED !' : 'DELIVER'}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Image style = {styles.footer} source = {trame}/>
            </View>



        </View>
        </Container>
    );
  }
}


const trame = require("../../../img/TRAME.png");
const bike_circle = require("../../../img/bike_circle.png");
const loc= require("../../../img/loc.png");
const flag = require("../../../img/flag.png");
const truck = require("../../../img/truck_circle.png");
const scooter_circle = require("../../../img/scooter_circle.png");
const menu = require("../../../img/MENU.png");


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
    prices,
    network_connected,
    order_info,
    card,
    pickup_coords,
    dropoff_coords,
    type,
    charge_type,
    edit_progress,
    fetch_price_error,
    last_4,
	  card_exist,
    screenshot,
    scheduled,
    order_success,flutterwave_token,transaction_id,
    error_submitting_order,
    error, region, user, distance_info, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    distanceInKM,
    distanceInHR,
    hoveron,
    distance_info,
    loading,
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
    scheduled,
    order_success,
    card,
    charge_type,
    error_submitting_order,
    edit_progress,
    fetch_price_error,
    screenshot,
    last_4,
	  card_exist,
    flutterwave_token,
    transaction_id,
    network_connected,
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
  reset,
  getCard,
  submitOrder,
  onPayment,
  charge_method,
  network_change,
})(Summary);
