import React, { Component } from "react";
import { Image, View,Platform, StatusBar,AsyncStorage,Text, Dimensions } from "react-native";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          setUser,

        } from '../../actions/Map';
import PubNub from 'pubnub';
const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const image = require("../../../img/flashscreen.png");
const text = require("../../../img/parcelfasttext.png");

const USER_TOKEN = "user_token";


class SplashPage extends Component {

    state = {
      isLoggedIn: false
    }


    getToken() {

    }

  async componentDidMount() {

        var navigator = this.props.navigator;
        setTimeout (() => {
          const user = AsyncStorage.getItem(USER_TOKEN)
          .then((data)=> {
            if (data !== null) {
              // We have data!!

             // console.log("Data saved is "+JSON.stringify(data));

                this.props.setUser(JSON.parse(data));
                this.props.navigation.navigate('Map');
            } else {
              try {
                this.props.navigation.navigate('Home');
               //   await AsyncStorage.setItem(USER_TOKEN, JSON.stringify(this.props.user));
              } catch (error) {
                  // Error saving data
              }
            }
          })


          //load = async () => {
            //const token = AsyncStorage.getItem('user_access_token');
            //console.log("TOken is "+JSON.stringify(token));
            //if (token == null) {
              //this.props.navigation.navigate('Home');
            //} else {
             // this.props.setUser(token);
             // this.props.navigation.navigate('Map');
            //}
            /*
                <Text style = {{
                  fontWeight: '800',
                  fontSize: 50,
                  fontFamily: 'open-sans bold',
                  color: '#FFF',
                  textAlign: 'center',
                }}> ParcelFast </Text>

                */


          //}
        }, 2000);
    }
    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#0397dd', alignItems: 'center', justifyContent: 'center'}}>
              <StatusBar backgroundColor='#0397dd' barStyle='light-content' />
              <View
              style = {{
                  alignContent: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }} >
                <View  style = {{
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                  marginLeft: SCREEN_WIDTH/20,
                }} >
                <Image
                style = {{
                  resizeMode: 'contain',
                
                }}
                source={image}/>
                </View>

                
                </View>
                </View>


        );
    }
}

const parcelfast = require("../../../img/MENU.png");

const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    error, region, user, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    emergency,
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
  setUser,

})(SplashPage);
