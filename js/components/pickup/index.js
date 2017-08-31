import React, { Component } from "react";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getStaticImage,
          getDistance,
          calculatePrice,
          StorePrice,
          StoreKm,
          StoreHr,
          save_summary_state,

        } from '../../actions/Map';

import { View, Image, TextInput, KeyboardAvoidingView,  Dimensions, Platform , StatusBar , TouchableOpacity} from "react-native";
import AndroidBackButton from "react-native-android-back-button";
import { KeyboardAwareScrollView, Form } from 'react-native-form-generator'

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


} from "native-base";

import styles from "./styles";

const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;
/*
  <Image style = {styles.footer} source = {trame}/>
  */

class Pickup extends Component {

  constructor(props) {
  super(props);
  this.state = {
    pick_up_name: this.props.user.fullname,
    pick_up_tel: this.props.user.tel,
    drop_off_name: this.props.order_info.drop_off_name,
    drop_off_tel: this.props.order_info.drop_off_tel,
    extra: this.props.order_info.extra,
  }

}

  componentDidMount() {
    if (this.props.pickup !== '' && this.props.destination !== '' && this.props.route_set) {
      this.props.getDistance(this.props.pickup, this.props.destination);
      this.props.getStaticImage(this.props.raw);
    }


  }

componentWillUnmount() {
  this.props.fetchPrice(this.props.vehicle, this.props.emergency);

  var a = this.props.distance_info;
  var distance = a[0].elements[0].distance.value;
  var time = a[0].elements[0].duration.value;

  var km = Number(distance/1000);
  var time = Number(time/3600);


  this.calculatePriceThe(km, time, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);
}

 calculatePriceThe (km, hr, price_per_km, price_per_hr, emergency, base) {
      var km_num = Number(km);
      var hr_num = Number(hr);
      var num_price_per_km = Number(price_per_km);
      var num_price_per_hr = Number(price_per_hr);
      var num_emergency = Number(emergency);
      var num_base = Number(base);

      var price = (km_num * num_price_per_km) + (hr_num * num_price_per_hr) + num_emergency + num_base;
      //dispatch({ type: GETTING_PRICE });
      var pricee= Math.ceil(price);
      this.props.StorePrice(pricee);
      this.props.StoreKm(Math.ceil(km_num));
      this.props.StoreHr(Math.ceil(hr_num*60));
      console.log("Price is "+price);

}

handleFormChange(formData){
    //formData will be a json object that will contain
    // refs of every field
    //formData.first_name
    //formData.last_name
    this.setState({formData:formData})
}

sendData() {
  this.props.save_summary_state(this.state);
  this.props.navigation.navigate('Summary');
}







  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />

        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Map')}>
              <Icon style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#888'}}> Pickup <Image source = {pickup}/></Title>
          </Body>
          <Right />
        </Header>


        <KeyboardAvoidingView  style ={styles.mainContainer}>
          <View style ={styles.firstText}>
            <Text style = {{color: "#CCC"}}>
                ENTER THE PICK-UP ADDRESS
            </Text>
          </View>
          <Form
            style = {styles.forms}
            label="Personal Information">

          <TextInput
             placeholder="Name of Pickup collector"
             underlineColorAndroid= 'transparent'
             value={this.state.pick_up_name}
             onSubmitEditing= {() => this.tel.focus()}
             returnKeyType = "next"
             onChangeText = {(input)=>this.setState({pick_up_name: input})}
             placeholderTextColor="#CCC"
             style={styles.names}
             ref='pickup_collector'
             //ref= {(input) => this.lastname = input}
           />
          <TextInput
           placeholder="Telephone"
           value={this.state.pick_up_tel}
           onChangeText = {(input)=>this.setState({pick_up_tel: input})}
           underlineColorAndroid= 'transparent'
           placeholderTextColor="#CCC"
           onSubmitEditing= {() => this.refs.dropoff_collector.focus()}
           returnKeyType = "next"
           style={styles.names}
           ref='pickup_collector_tel'

        />
          <TextInput
             placeholder="Name of Drop-off collector"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.refs.dropoff_collector_tel.focus()}
             returnKeyType = "next"
             value={this.state.drop_off_name}
             onChangeText = {(input)=>this.setState({drop_off_name: input})}
             placeholderTextColor="#CCC"
             style={styles.names}
             ref='dropoff_collector'

          />

          <TextInput
             placeholder="Drop-off Collector Number"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.refs.tel.extra_shit()}
             returnKeyType = "next"
             value={this.state.drop_off_tel}
             onChangeText = {(input)=>this.setState({drop_off_tel: input})}
             placeholderTextColor="#CCC"
             style={styles.names}
             //ref= {(input) => this.lastname = input}
             ref='dropoff_collector_tel'

          />
          <TextInput
             placeholder="Extra comments"
             underlineColorAndroid= 'transparent'
             onSubmitEditing= {() => this.tel.focus()}
             returnKeyType = "next"
             onChangeText = {(input)=>this.setState({extra: input})}
             placeholderTextColor="#CCC"
             value={this.state.extra}
             style={styles.names}
             //ref= {(input) => this.lastname = input}
             ref='extra_shit'

          />

          <TouchableOpacity style = {styles.continue}
            onPress = {() => this.sendData()} >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>NEXT</Text>
            </View>
          </TouchableOpacity>
          <Text
            style = {{
              fontSize: 15,
              marginTop: 10,
              alignSelf: 'center',
              color: '#f62e2e',
            }}>{this.props.edit_error}</Text>

        </Form>




        </KeyboardAvoidingView>

      </Container>
    );
  }
}
const trame = require("../../../img/TRAME.png");
//this.props.navigation.navigate('Summary')
const menu = require("../../../img/MENU.png");

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    prices,
    error, region, user,
    route_set,
    raw,
    distance_info,
    proceed,
    order_info,
    edit_error, loading,emergency, status } = map;
  return {
    destination, pickup,
    vehicle,
    error,
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
    order_info,
    prices,
    edit_error,
    route_set,
    raw,
    proceed,
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
  getStaticImage,
  calculatePrice,
  StorePrice,
  StoreKm,
  StoreHr,
  save_summary_state,
})(Pickup);
