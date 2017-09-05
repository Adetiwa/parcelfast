import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getDistance,
          getRoute,
          calculatePrice,
          StorePrice,
          StoreKm,
          StoreHr,
          saveScreenShot,
          getStaticImage,
          setDate,
          getNewMatch,
        } from '../../actions/Map';
import Pulse from 'react-native-pulse';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, Image, Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,AsyncStorage, StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import mapStyle from './mapStyle';
import Header_Search from './header_search';
import Location from "./location_result";

import BackgroundJob from "react-native-background-job";

//import GooglePlacesAutocomplete from 'react-native-google-places-autocomplete';
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
  Footer,
  FooterTab,
  Text
} from "native-base";
import { ViewShot } from "react-native-view-shot";
import isEqual from 'lodash/isEqual';
//import PushNotification from 'react-native-push-notification';
/*

compile(project(':react-native-maps')){
        exclude group: 'com.google.android.gms', module: 'play-services-base'
        exclude group: 'com.google .android.gms', module: 'play-services-maps'
    }
    compile 'com.google.android.gms:play-services-base:10.0.1'
    compile 'com.google.android.gms:play-services-maps:10.0.1'
*/
import styles from "./style";
import SearchBox from "../searchbar"
import * as Animatable from 'react-native-animatable'

const STORAGE_KEY = "user_access_token";
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Lagos Island
const LATITUDE = 6.4549;
const LONGITUDE = 3.4246;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const USER_TOKEN = "user_token";



const regularJobKey = "regularJobKey";
const exactJobKey = "exactJobKey";
const foregroundJobKey = "foregroundJobKey";

//run only on android
if(Platform.OS == 'android') {
  const lol = '';
  
  //const data = 0;
  // This has to run outside of the component definition since the component is never
  // instantiated when running in headless mode
  BackgroundJob.register({
    jobKey: regularJobKey,
    job: () => console.log(`Background Job fired!. Key = ${regularJobKey}`)
  });
  BackgroundJob.register({
    jobKey: exactJobKey,
    job: () => {
     //console.log(`${new Date()}Exact Job fired!. Key = ${exactJobKey}`);
      //this.props.
      //this.props.getNewMatch(this.props.user.userid);
      fetch('https://project.stackonly.com/app/api/new-order', {
        
                method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: lol,
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  if (responseJson.status === 'null') {
                    //dispatch({ type: NO_NEW_MATCH, payload: true });
                    console.log("Response is "+ JSON.stringify(responseJson));
                  } else {
                    //dispatch({ type: MATCH_ALERT, payload: responseJson });
                    //dispatch({ type: NO_NEW_MATCH, payload: false });
                    //console.log(JSON.stringify(responseJson));
                    console.log("Response is "+ JSON.stringify(responseJson));
                    var dest = responseJson.user_to;
  
  
                    PushNotification.localNotification({
                      /* Android Only Properties */
                      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                      ticker: "Delivery assigned", // (optional)
                      autoCancel: false, // (optional) default: true
                      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                      bigText: "Delivery to "+dest+" has been assigned to a "+responseJson.driver+" "+responseJson.driver_plate_number+" "+responseJson.vehicle, // (optional) default: "message" prop
                      subText: "Delivery matched to "+responseJson.driver, // (optional) default: none
                      color: "#009AD5", // (optional) default: system default
                      vibrate: true, // (optional) default: true
                      vibration: 500, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                      //tag: 'some_tag', // (optional) add tag to message
                      //group: "group", // (optional) add group to message
                      ongoing: false, // (optional) set whether this is an "ongoing" notification
                  
                      /* iOS only properties */
                    //  alertAction: // (optional) default: view
                    // category: // (optional) default: null
                      //userInfo: // (optional) default: null (object containing additional notification data)
                  
                      /* iOS and Android properties */
                      title: "Delivery assigned", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
                      message: "Your delivery has been assigned", // (required)
                      playSound: false, // (optional) default: true
                      //soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                      number: responseJson.count, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                      //repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
                      actions: '["Call", "Message"]',  // (Android only) See the doc for notification actions to know more
                  });
  
                  }
                })
                .catch((error) => {
                  console.log("Error is "+error);
                  //dispatch({ type: MATCH_ALERT_ERROR, payload: "An error occured while getting match background" })
                })
            
  
      //console.log("DATA IS "+lol);
      //gec();
      //fool();
     
    }
  });
  
}

function gec() {
  console.log("I love olumide "+ this.props.route_set);

  if (this.props.route_set) {
    console.log("No match fool");
  } else {
    console.log("HAHA");
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {

      region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    bounceValue: new Animated.Value(100),
    buttonText: "GET ESTIMATE",
    isDateTimePickerVisible: false,
    mapSnapshot: null,
  }
  }



  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    var t = new Date( date );
    //var formatted = t.format("dd.mm.yyyy hh:MM:ss");
    console.log('A date has been picked: ', t);
    this.props.setDate(date);
    this._hideDateTimePicker();
  };


 fool () {
    console.log('HAHA');
 }

  async componentWillMount() {
    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
    const region = await this.props.getCurrentLocation()
    ///.then(() => {
     // this.props.update_region(this.props.region);
    //})
    //.then(() => {
      this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
      
    //})
    
    const user = await AsyncStorage.getItem(USER_TOKEN);
    if (user !== null) {
      // We have data!!
      //console.log(JSON.parse(user));
    } else {
      try {
          await AsyncStorage.setItem(USER_TOKEN, JSON.stringify(this.props.user));
      } catch (error) {
          // Error saving data
      }
    }
    /*if(Platform.OS == 'android') {
      BackgroundJob.schedule({
        jobKey: exactJobKey,
        period: 10000,
        exact: true,
        allowExecutionInForeground: true,
      });
    }*/
    
  }

  componentWillUpdate() {
    if(!this.props.route_set) {
      //this.props.getCurrentLocation();
      //this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
      
    } 
  }


  componentDidMount() {
   // this.props.getCurrentLocation();
   lol = this.props.user.userid;
   this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
   
     
    if(!this.props.route_set) {
      this.props.getCurrentLocation();
     
    } else {
      
      this.calculatePriceThe(this.props.distanceInKM, this.props.distanceInHR, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);
     }
     setInterval (() => {
      //this.props.getNewMatch(this.props.user.userid);
      //console.log("Ran!!!!");
    
  
    }, 10000);

  }

  animateMap () {
    this._map.animateToCoordinate(tempCoords, 1);
  }
  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
    
  }



  onDestChange(text) {
    this.props.destinationChanged(text);
  }

dist() {
    if (this.props.pickup !== '' && this.props.destination !== '') {
      this.props.getDistance(this.props.pickup, this.props.destination);
    }
  }
  onDestHover() {
    this.props.hoverondesc();
  }

  choose(type, emergency) {
    //const { email, password } = this.props;
    this.props.select_vehicle(type);
    this.props.fetchPrice(type, emergency);
    this.calculatePriceThe(this.props.distanceInKM, this.props.distanceInHR, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);

  }


  storeToken(token) {
    AsyncStorage.removeItem(token);
    // console.log(token);
    //this.getToken();

  }

  getToken() {
    const token = AsyncStorage.getItem('user_access_token');
    console.log("TOken is "+token);

  }

   calculatePriceThe (km, hr, price_per_km, price_per_hr, emergency, base) {
        var km_num = Number(km);
        var hr_num = Number(hr/60);
        var num_price_per_km = Number(price_per_km);
        var num_price_per_hr = Number(price_per_hr);
        var num_emergency = Number(emergency);
        var num_base = Number(base);

        var price = (km_num * num_price_per_km) + (hr_num * num_price_per_hr) + num_emergency + num_base;
        //dispatch({ type: GETTING_PRICE });
        var pricee= Math.ceil(price);
        this.props.StorePrice(pricee);
        //console.log("Price is "+price);

  }

  renderProps() {
    if(this.props.route_set !== false) {
      return (
      <Animatable.View animation='pulse' style={styles.map}>
        <MapView.Animated
        //provider={this.props.provider}
        ref={ref => { this.map = ref; }}
        //ref={component => this._map = component}
        customMapStyle={mapStyle}
        style={{ flex: 1,
                  zIndex: -1,
                }}
        provider={PROVIDER_GOOGLE}
        //region={this.props.region}
        region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta * 10,
          longitudeDelta: this.props.longitudeDelta  * 10,
        }}
        //onRegionChange={this.onRegionChange.bind(this)}
        //loadingEnabled={true}
        zoomEnabled={true}
        minZoomLevel={1}
        maxZoomLevel={5}
        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta * 10,
          longitudeDelta: this.props.longitudeDelta  * 10,
        }}
        //loadingEnabled={true}
        //showsUserLocation={true}
        //coordinates= {this.props.route}
        >
        {this.props.route_set &&
            <MapView.Polyline
              coordinates={this.props.route}
              strokeWidth={3}
              strokeColor="#555"
              fillColor="black"
            />
          }

            
             <MapView.Marker
               coordinate={{
                 latitude: this.props.latitude,
                 longitude: this.props.longitude,
               }}
              >
              <View style = {{
                width: 30,
                height: 30,
                borderRadius: 30,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#009AD5',
              }}
                ><View style = {{
                width: 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: '#FFF',
              }}
                ></View>
                </View>
                </MapView.Marker>

            {this.props.dropoff_coords.lat &&
             <MapView.Marker
                coordinate={{
                 latitude: this.props.dropoff_coords.lat,
                 longitude: this.props.dropoff_coords.lng,
                 }}
               title="Drop-off"
             >
                <View style = {{
                width: 30,
                height: 30,
                borderRadius: 30,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}
                ><View style = {{
                width: 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: '#888',
              }}
                ></View>
                </View>
            </MapView.Marker>
            }
      </MapView.Animated>
      </Animatable.View>
      )
    } else {
      return (
        <Animatable.View animation='bounceIn' style={styles.map}>

        <MapView.Animated
        ref={ref => { this.map = ref; }}
        //ref={component => this._map = component}
        customMapStyle={mapStyle}
        style={{ flex: 1,
                  zIndex: -1,
                }}
        provider={PROVIDER_GOOGLE}
        //region={this.props.region}
        region={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta
        }}
        onRegionChange={this.onRegionChange.bind(this)}
        //loadingEnabled={true}
        zoomEnabled={true}

        initialRegion={{
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta
        }}

        //loadingEnabled={true}
        //showsUserLocation={true}
        //coordinates= {this.props.route}

      >
      
        <MapView.Marker
        coordinate={{
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        }}
        //onSelect={(e) => log('onSelect', e)}  <Pulse color='blue' numPulses={1} diameter={80} speed={40} duration={2000} />
  
           // onDrag={(e) => log('onDrag', e)}
          //  onDragStart={(e) => log('onDragStart', e)}
         //   onDragEnd={this.onRegionChange.bind(this)}
        //onPress={(e) => log('onPress', e)}
        draggable
        >
        <View style = {{
            width: 30,
            height: 30,
            borderRadius: 30,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#009AD5',
           }}
            ><View style = {{
            width: 5,
            height: 5,
            borderRadius: 5,
            backgroundColor: '#FFF',
           }}
            ></View>
            </View>

        </MapView.Marker>

    </MapView.Animated>
    </Animatable.View>
      )
    }
  }

  /*setInterval (() => {
    //load = async () => {
         this.props.getCurrentLocation();

    //}
  }, 1000);
  <MapView.Marker
     draggable
      //onDragEnd={this.onUserPinDragEnd.bind(this)}
      title={'Your location'}
      onDragEnd={this.onRegionChangeCompleted.bind(this)}
      {this.props.pickup !== '' &&
        coordinate={this.props.region}
      }
      style={{opacity:1}}
    >
      <Pulse color='rgba(0, 122, 255, 0.5)' numPulses={1} diameter={100} speed={20} duration={2000} />
      <View style = {styles.marker}>
      </View>



  </MapView.Marker>

  {!this.props.hoveron &&
                  <TouchableOpacity
                     style ={styles.delivery}
                      transparent
                      onPress={this._showDateTimePicker}
                    >

                      <Icon style = {{color: '#FFF', backgroundColor: "transparent",}} name = "time"></Icon>
                    </TouchableOpacity>

                  }

   */

  onRegionChange(region) {
    this.props.update_region(region);
    this.props.get_name_of_loc(this.props.latitude, this.props.longitude)

    //console.log("This region is "+ JSON.stringify(region));
  }


  onRegionChangeCompleted(region) {
    this.props.update_region(region);
    this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
  }





  renderButtons() {
    if (!this.props.route_set) {

      if (this.props.vehicle === "scooter") {
        return (
          <View style = {styles.iconssRoute}>
              
              <TouchableOpacity
                style = {{
                  borderWidth:1,
                  borderColor:'rgba(0,0,0,0.2)',
                  alignItems:'center',
                  justifyContent:'center',
                  width:80,
                  height:80,
                  backgroundColor:'#fff',
                  borderRadius:80,
                  shadowColor: '#AAA',
                  elevation: 2,
                  borderColor:  '#DDD',
                  borderBottomWidth: 1,
                  shadowOffset:{ width: 7, height: 2},
                  shadowOpacity:0.7,
                }}
                onPress={()=>this.choose('scooter', this.props.emergency)}
                
                >
                <Image style = {{marginRight: 7}} source = {require("../../../img/scooter_active.png")}/>
              </TouchableOpacity>
               
              <TouchableOpacity
              style = {{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:80,
                height:80,
                backgroundColor:'#fff',
                borderRadius:80,
                shadowColor: '#AAA',
                elevation: 2,
                borderColor:  '#DDD',
                borderBottomWidth: 1,
                shadowOffset:{ width: 7, height: 2},
                shadowOpacity:0.7,
                }}
                onPress = {()=>this.choose('truck', this.props.emergency)}
                >
                <Image style = {{marginRight: 7}} source = {require("../../../img/truck.png")}/>
              </TouchableOpacity>

          </View>
        );
      } else {
        return (
          <View style = {styles.iconssRoute}>
              <TouchableOpacity
              style = {{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:80,
                height:80,
                backgroundColor:'#fff',
                borderRadius:80,
                shadowColor: '#AAA',
                elevation: 2,
                borderColor:  '#DDD',
                borderBottomWidth: 1,
                shadowOffset:{ width: 7, height: 2},
                shadowOpacity:0.7,
                }}
                onPress={()=>this.choose('scooter')}
                //onPress = {() => this.toggleScooter()}
                >
                <Image style = {{marginRight: 7}} source = {require("../../../img/scooter.png")}/>
              </TouchableOpacity>

              <TouchableOpacity
              style = {{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:80,
                height:80,
                backgroundColor:'#fff',
                borderRadius:80,
                shadowColor: '#AAA',
                elevation: 2,
                borderColor:  '#DDD',
                borderBottomWidth: 1,
                shadowOffset:{ width: 7, height: 2},
                shadowOpacity:0.7,
                }}
                onPress = {()=>this.choose('truck')}
                >
                <Image style = {{marginRight: 7, }} source = {require("../../../img/truck_active.png")}/>
              </TouchableOpacity>
            </View>
        );
      }
    } else {

      if (this.props.vehicle === "scooter") {
        return (
          <View style = {styles.iconss}>

              <TouchableOpacity
                onPress={()=>this.choose('scooter', this.props.emergency)}
                >
                <Image style = {{marginRight: 7}} source = {require("../../../img/scooter_active.png")}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress = {()=>this.choose('truck', this.props.emergency)}
                >
                <Image style = {{marginRight: 7}} source = {require("../../../img/truck.png")}/>
              </TouchableOpacity>

          </View>
        );
      } else {
        return (
          <View style = {styles.iconss}>
              <TouchableOpacity
                onPress={()=>this.choose('scooter')}
                //onPress = {() => this.toggleScooter()}
                >
                <Image style = {{marginRight: 7}} source = {require("../../../img/scooter.png")}/>
              </TouchableOpacity>

              <TouchableOpacity
                onPress = {()=>this.choose('truck')}
                >
                <Image style = {{marginRight: 7, }} source = {require("../../../img/truck_active.png")}/>
              </TouchableOpacity>
            </View>
        );
      }
    }
  }


  render() {

    return (

      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        
      
      
        {!this.props.hoveron ?


          this.renderProps()

            :
            <Location/>
            }
              {!this.props.hoveron &&
                <TouchableOpacity
                   style ={styles.menubar}
                    transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}
                  >

                    <Image source = {menu}/>
                  </TouchableOpacity>
                }
                {!this.props.hoveron &&
                  <TouchableOpacity
                     style ={styles.delivery}
                      transparent
                      onPress={this._showDateTimePicker}
                    >

                      <Icon style = {{color: (this.props.scheduled === null) ? '#FFF': '#009AD5', backgroundColor: "transparent",}} name = "time"></Icon>
                    </TouchableOpacity>

                  }

                      <Header_Search/>




      {!this.props.route_set && !this.props.hoveron  &&
        <View style = {styles.okayokay}>
        {this.renderButtons()}
          </View>
      }


      {!this.props.hoveron && this.props.route_set &&
        <View style={styles.checks}>
              <Text
                style = {{
                  textAlign: 'center',
                  color: "#555",
                  marginTop: 15,
                  fontSize: 15,
                }}>
                PICK-UP OPTIONS</Text>

              {this.renderButtons()}
             
              {(this.props.pickup !== '') && (this.props.destination !== '') &&
                <TouchableOpacity style = {styles.continue}
                  onPress = {() => this.props.navigation.navigate('Pickup')} >
                  <View style={styles.buttonContainer}>
                    <Text style = {styles.continueText}>CONTINUE</Text>
                  </View>
                </TouchableOpacity>
              }

            </View>
        }
        
        <DateTimePicker
          mode = 'datetime'
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

      </Container>
    );
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType,
};


const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");
mapStyle =  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]


const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    route,
    estimated_price,
    longitudeDelta,
    error, region,prices,
    no_new_match,
    distanceInKM,
    scheduled,
    match_alert,
    distanceInHR,
    user, dropoff_coords,loading,emergency,route_set, raw, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    route,
    region,
    user,
    status,
    latitude,
    longitude,
    dropoff_coords,
    latitudeDelta,
    longitudeDelta,
    estimated_price,
    emergency,route_set,
    distanceInKM,
    scheduled,
    distanceInHR,
    prices,
    match_alert,
    raw,
    no_new_match,
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
  getRoute,
  calculatePrice,
  StorePrice,
  setDate,
  StoreKm,
  saveScreenShot,
  StoreHr,
  getStaticImage,
  getNewMatch,

})(Map);
