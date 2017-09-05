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
import { Switch } from 'react-native-switch';
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
  Label,



} from "native-base";
import * as Animatable from 'react-native-animatable'

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
    emergency: false,
    error: '',
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
  if ((this.state.pick_up_name === '') || (this.state.pick_up_tel === '') || (this.state.drop_off_name === '') || (this.state.drop_off_tel === '') || (this.state.extra === '')) {
    this.setState({error: "All inputs are required"});
  } else {
    this.props.save_summary_state(this.state);
    this.props.navigation.navigate('Summary');
  }
  //console.log(JSON.stringify(this.state));
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
            <Button
             transparent onPress={() => this.props.navigation.navigate('Map')}>
              <Icon style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{fontSize: 15, color: '#888'}}> <Image source = {pickup}/> Pickup Info </Title>
          </Body>
          <Right />
        </Header>


        <Animatable.View animation='pulse'  style ={styles.mainContainer}>
          
          <Form
            style = {styles.forms}
            label="Personal Information">

            <Item floatingLabel>
              <Input
              placeholder="Name of Pickup collector"
              underlineColorAndroid= 'transparent'
              value={this.state.pick_up_name}
              style = {{
              fontSize: 15,
              //fontWeight: 0,
              borderBottomColor: '#CCC',
              }}
              //onSubmitEditing= {() => this.tel.focus()}
              returnKeyType = "next"
              onChangeText = {(input)=>this.setState({pick_up_name: input})}
              placeholderTextColor="#CCC"
              ref='pickup_collector'
              />
            </Item>
          

            <Item floatingLabel>
              <Input
              placeholder="Telephone"
              underlineColorAndroid= 'transparent'
              onSubmitEditing= {() => this.tel.focus()}
              returnKeyType = "next"
              style = {{
              fontSize: 15,
              //fontWeight: 0,
              borderBottomColor: '#CCC',
              }}
              value={this.state.pick_up_tel}
              onChangeText = {(input)=>this.setState({pick_up_tel: input})}
              placeholderTextColor="#CCC"
              ref='pickup_collector_tel'
              //onSubmitEditing= {() => this.refs.dropoff_collector.focus()}
           
              />
            </Item>

            <Item floatingLabel>
              <Input
              placeholder="Name of Drop-off collector"
              underlineColorAndroid= 'transparent'
              //onSubmitEditing= {() => this.tel.focus()}
              returnKeyType = "next"
              style = {{
              fontSize: 15,
              //fontWeight: 0,
              borderBottomColor: '#CCC',
              }}
              value={this.state.drop_off_name}
              onChangeText = {(input)=>this.setState({drop_off_name: input})}
              placeholderTextColor="#CCC"
              ref='dropoff_collector'
              
              />
            </Item>

            <Item floatingLabel>
              <Input
              placeholder="Drop-off Collector Number"
              underlineColorAndroid= 'transparent'
              //onSubmitEditing= {() => this.tel.focus()}
              returnKeyType = "next"
              style = {{
              fontSize: 15,
              //fontWeight: 0,
              borderBottomColor: '#CCC',
              }}
              value={this.state.drop_off_tel}
              onChangeText = {(input)=>this.setState({drop_off_tel: input})}
              placeholderTextColor="#CCC"
              ref='dropoff_collector_tel'
              //onSubmitEditing= {() => this.refs.dropoff_collector.focus()}
           
              />
            </Item>

            <Item floatingLabel>
              <Input
              placeholder="Extra comments"
              underlineColorAndroid= 'transparent'
              //onSubmitEditing= {() => this.tel.focus()}
              returnKeyType = "next"
              style = {{
              fontSize: 15,
              //fontWeight: 0,
              borderBottomColor: '#CCC',
              }}
              onChangeText = {(input)=>this.setState({extra: input})}
              placeholderTextColor="#CCC"
              value={this.state.extra}
              ref='extra_shit'
              //onSubmitEditing= {() => this.refs.dropoff_collector.focus()}
           
              />
            </Item>
            
            <Switch
              value={true}
              onValueChange={(val) => this.setState({emergency: val})}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              backgroundActive={'#009AD5'}
              backgroundInactive={'gray'}
              circleActiveColor={'#FFF'}
              circleInActiveColor={'#009AD5'}
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
            }}>{this.state.error}</Text>

        </Form>


            
        </Animatable.View>


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
