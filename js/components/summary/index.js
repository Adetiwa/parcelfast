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

        } from '../../actions/Map';

import { View, Image,ActivityIndicator, StatusBar, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";
import AndroidBackButton from "react-native-android-back-button";

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

    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
  }

  componentDidMount(){
    this.props.reset();
    if(!this.props.card_exist) {
      this.props.getCard(this.props.user.userid);
    }
  }
  componentWillUpdate() {
    this.checkForShit();
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
  checkForShit() {
    if (!this.props.card_exist && (this.props.flutterwave_token !== null)) {
      this.props.onPayment(true);
      this.props.navigation.navigate('CardView');
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
            <Title  style = {{color: '#888'}}> SUMMARY </Title>
          </Body>
          <Right />
        </Header>


        <Animatable.View animation='bounceIn' style ={styles.mainContainer}>
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
              <View style={styles.costText}>
                <Text style={styles.costTextText}>

                  ₦ {this.props.estimated_price}
                </Text>
              </View>

              <View style={styles.confirmButton}>
                <TouchableOpacity style = {styles.continue}
                  onPress = {() => this.placeOrder()}
                  disabled = {!this.props.card_exist ? true : false} >
                  <View style={styles.buttonContainer}>
                    <Text style = {styles.continueText}>CONFIRM</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Image style = {styles.footer} source = {trame}/>
            </View>



        </Animatable.View>

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
    order_info,
    card,
    pickup_coords,
    dropoff_coords,
    type,
    charge_type,
    edit_progress,
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
    screenshot,
    last_4,
	  card_exist,
    flutterwave_token,
    transaction_id,
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
})(Summary);
