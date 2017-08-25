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
        } from '../../actions/Map';
import Pulse from 'react-native-pulse';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, Image, Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,AsyncStorage, StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
//import mapStyle from './mapStyle';
import Header_Search from './header_search';
import Location from "./location_result";

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
import isEqual from 'lodash/isEqual';
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
  }
  }



  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  _toggleSubview() {
    this.setState({
      buttonText: !isHidden ? "GET ESTIMATE" : "CONFIRM"
    });

    var toValue = 100;

    if(isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isHidden = !isHidden;
  }



  componentWillMount() {
    //this.props.getCurrentLocation();
  }


  componentDidMount() {
    //this.animateMap();
    //this.refs._map.fitToElements(true);
    this.props.fetchPrice(this.props.vehicle, this.props.emergency);
    if(this.props.route_set === false) {
      this.props.getCurrentLocation();
    }
    if (this.props.route_set) {
      this.calculatePriceThe(this.props.distanceInKM, this.props.distanceInHR, this.props.prices.per_km, this.props.prices.per_hr, this.props.prices.emergency, this.props.prices.base_price);
    }

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
      <View style={styles.map}>
        <MapView.Animated

        ref={component => this._map = component}
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
        showsUserLocation={true}
        //coordinates= {this.props.route}
        >
      <MapView.Polyline
        coordinates={this.props.route}
        strokeWidth={3}
        strokeColor="#555"
        fillColor="rgba(255,0,0,0.5)"
      />


             <MapView.Marker
               coordinate={{
                 latitude: this.props.latitude,
                 longitude: this.props.longitude,
               }}
               title="Pick-up"
                           />
             <MapView.Marker
                coordinate={{
                 latitude: this.props.dropoff_coords.lat,
                 longitude: this.props.dropoff_coords.lng,
                 }}
               title="Drop-off"
             />
      </MapView.Animated>
      </View>

      )
    } else {
      return (
        <View style={styles.map}>

        <MapView.Animated
        ref={component => this._map = component}
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
        showsUserLocation={true}
        //coordinates= {this.props.route}

      >
        <MapView.Marker
        coordinate={{
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        }}
        title="Pick-up"
        />

    </MapView.Animated>
    </View>
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

                      <Icon style = {{color: '#FFF', backgroundColor: "transparent",}} name = "time"></Icon>
                    </TouchableOpacity>

                  }

                      <Header_Search/>




      {!this.props.route_set && 
        <View style = {styles.okayokay}>

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
              {this.props.estimated_price !== null &&
                <Text
                style = {{
                  textAlign: 'center',
                  color: "#555",
                  fontSize: 10,
                }}>
                Estimated Pricee is ₦ {this.props.estimated_price}</Text>
              }
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
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

      </Container>
    );
  }
}
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
    distanceInKM,
    distanceInHR,
    user, dropoff_coords,loading,emergency,route_set, status } = map;
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
    distanceInHR,
    prices,
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
  StoreKm,
  StoreHr,

})(Map);
