import React, { Component } from "react";
import { Image, View,Platform,Animated,Easing, ActivityIndicator, StatusBar,AsyncStorage,Text, Dimensions } from "react-native";
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

const image = require("../../../img/logomydrawing.png");
const text = require("../../../img/parcelfastieejtext.png");

const USER_TOKEN = "user_token";


class SplashPage extends Component {

    state = {
      isLoggedIn: false
    }


    getToken() {

    }

    getCOlor(shit) {
      if (shit === 'ios') {
        return '#FFFFFF';
      } else {
        return '#0397dd';
      }
    }

   componentWillMount() {
    if (Platform.OS !== 'ios') {
      this.animatedValue = new Animated.Value(0);
    } 
  }

  async componentDidMount() {

        var navigator = this.props.navigator;
        if (Platform.OS === 'ios') {
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
        } else {
          setTimeout (() => {
            this.callanimate();
          }, 1800);
        
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

              


          }, 2000);
      }
      
     
    }

    callanimate() {
      Animated.timing(this.animatedValue, {
        toValue: 2000,
        duration: 2000,
        easing: Easing.bounce,
        //easing: Easing.inOut(Easing.ease),
      }).start();
    }
    render () {
        const animatedStyle = {
          transform: [
            { translateX: this.animatedValue },
          ]
        }
        return (
            <View style={{flex: 1, backgroundColor: this.getCOlor(Platform.OS), alignItems: 'center', justifyContent: 'center'}}>
              <StatusBar backgroundColor='#0397dd' barStyle='light-content' />
              {(Platform.OS !== 'ios') && 
              <View
              style = {{
                 
                  flexDirection: 'column'
                }} >
                
                <Animated.View  
                style = {[{
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  marginLeft: '17%',
                }, animatedStyle]}>
                <Image
                style = {{
                  resizeMode: 'contain',
                
                }}
                source={image}/>
                </Animated.View>
                
                <View  style = {{
                  alignContent: 'center',
                  justifyContent: 'center',
                }} >
                <Image
                style = {{
                  resizeMode: 'contain',
                
                }}
                source={text}/>
                </View>

                
                </View>
                }
                {(Platform.OS === 'ios') && 
                  <View style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFF',
                    zIndex: 100000000,

                  }}>
                  <ActivityIndicator color="#444" style = {{zIndex: 12}} size='large' />
                
                  
                </View>
                }
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