import React, { Component } from "react";
import { Image, View, StatusBar,AsyncStorage, Dimensions } from "react-native";
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
const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const image = require("../../../img/logo1.png");
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
               

          //}
        }, 2000);
    }
    render () {
        return (
            <View style={{flex: 1, backgroundColor: '#009AD5', alignItems: 'center', justifyContent: 'center'}}>
              <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
              <Image source={image}></Image>
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
