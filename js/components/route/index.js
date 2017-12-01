import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          cancelTrip,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getDistance,
          getRoute,
          calculatePrice,
          StorePrice,
          StoreKm,
          charge_method,
          StoreHr,
          getCard,
          saveScreenShot,
          getStaticImage,
          setDate,
          getNewMatch,
          setEmergency,
          change_type,from_where,
          onPayment,
          onChangeToken,
          network_change,
          getNewByDriver,
          resetCancelMessage,
        } from '../../actions/Map';
        import UserAvatar from 'react-native-user-avatar';
        
import * as firebase from "firebase";
import Communications from 'react-native-communications';
import { View, Image, NetInfo,ActivityIndicator,  Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput,AsyncStorage,Easing, StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SnackBar from 'react-native-snackbar-component';

import Spinner from 'react-native-loading-spinner-overlay';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  List,
	ListItem,
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

import styles from "./style";
import * as Animatable from 'react-native-animatable'

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const thissingle = [];

class Route extends Component {
  constructor(props) {
    super(props);

    console.ignoredYellowBox = [
      'Setting a timer'
  ];
    
    this.state = {

    latitude: this.props.latitude,
    longitude: this.props.longitude,
    latitudeDelta: this.props.latitudeDelta,
    longitudeDelta: this.props.longitudeDelta,
    vehicle: '',
    ETA: '',
    distance: '',
    active: true,
    msg: '',
    status: '',
  
    drivers: [],
    bounceValue: new Animated.Value(100),
    buttonText: "GET ESTIMATE",
    isDateTimePickerVisible: false,
    mapSnapshot: null,
    map_ready: false,
    expanded: false,
    state: 'Money',
    visible: this.props.cancelling
    
  }
 
  }



 componentWillMount() {
      var chose = this.props.selected;
    
      var a = this.props.history;
    
      var aFiltered = a.filter(function(elem, index){
        return elem.o_id == chose;
      });
      thissingle = aFiltered
      //console.log(thissingle[0].url);
      this.props.resetCancelMessage(true);
    
   
}

 componentDidMount() {
    
  if (thissingle.length > 0) {
    if (!firebase.apps.length) {
    
  
  firebase.initializeApp({
    apiKey: "AIzaSyCwSgfOqkH4rr5sAll9yH9keLvWOk0VB-4",
    authDomain: "parcelfast-cdf6f.firebaseapp.com",
    databaseURL: "https://parcelfast-cdf6f.firebaseio.com",
    projectId: "parcelfast-cdf6f",
    storageBucket: "parcelfast-cdf6f.appspot.com",
    messagingSenderId: "659317790301"
  })
    }
  //console.log("state "+JSON.stringify(this.state));
  //if (thissingle.length > 0) {
    console.log('FCM event id is '+thissingle[0].event_id);
    
    conn = firebase.database().ref('drivers').child(thissingle[0].event_id.replace('.',''));
    //conn = firebase.database().ref('adetiwa1gmailcom');
    //conn = firebase.database().ref(driver.event_id);
      conn.on('value', snapshot => {
        let result = snapshot.val();
        
        if (result !== null) {
         
        let lat = this.state.latitude;
        let lng = this.state.longitude;

            
            this.setState({latitude: result.latitude })
            this.setState({longitude: result.longitude })
            this.setState({active: result.active })
            this.setState({distance: result.distance })
            this.setState({ETA: result.ETA })
            this.setState({vehicle: result.vehicle })
            this.setState({status: result.status })
            

        
          
      }
        console.log("state "+JSON.stringify(this.state));
        
      })
    //}
  
}
  }



  theContinueButtons() {
    if (thissingle.length > 0) {
      
        return (
          <TouchableOpacity style = {styles.continue}
            onPress = {() => this.props.cancelTrip(thissingle[0].o_id, this.props.user.userid, thissingle[0].d_id)} >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>CANCEL TRIP</Text>
            </View>
          </TouchableOpacity>
        )
      }
   
  }


  

  componentWillUpdate() {
    
    var chose = this.props.selected;
    
        var a = this.props.history;
    
        var aFiltered = a.filter(function(elem, index){
          return elem.o_id == chose;
        });
        thissingle = aFiltered;
    
     }
      



  renderProps() {
      return (
        <Animatable.View animation='bounceIn' style={styles.map}>

        <MapView.Animated
        ref={ref => { this.map = ref; }}
        onMapReady ={(e) => this.updateState()}

        //ref={component => this._map = component}
        customMapStyle={mapStyle}
        style={{ flex: 1,
                  zIndex: -1,
                }}
        provider={PROVIDER_GOOGLE}
        //region={this.props.region}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
        loadingEnabled={true}
        zoomEnabled={true}

        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
       >
        <MapView.Marker.Animated
        coordinate={{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        }}
        image={require('../../../img/caaar.png')}//onSelect={(e) => log('onSelect', e)}  <Pulse color='blue' numPulses={1} diameter={80} speed={40} duration={2000} />

           // onDrag={(e) => log('onDrag', e)}
          //  onDragStart={(e) => log('onDragStart', e)}
         //   onDragEnd={this.onRegionChange.bind(this)}
        //onPress={(e) => log('onPress', e)}
        >
        </MapView.Marker.Animated> 
      

         </MapView.Animated>
    </Animatable.View>
      )
    }
  
    getWord(w) {
      str = "";
      if (w == 'null') {
        str = "NULL";
      } else if (w == 'pickup') {
        str = "on pickup";
      }  else if (w == 'dropoff') {
        str = "on dropoff";
      }  else if (w == 'complete') {
        str = "completed";
      }
      return str;
    }



  renderButtons() {
    if (thissingle.length > 0) {
      
  return (
          <View style = {styles.iconss}>
            <UserAvatar
            style = {{ marginRight: 20, 
                  }}

              name={thissingle[0].driver}  src={thissingle[0].driver_pic} size={30} />
							
            
              
                <Text
                 style = {{color: '#555',
                  paddingRight: 20, 
                  fontSize: 17}}>
                    {thissingle[0].driver}
                    </Text>
             

              <TouchableOpacity
              onPress={() => Communications.phonecall(thissingle[0].driver_tel, true)}
              >
                <Icon style = {{color: '#555', paddingRight: 10, fontSize: 20}}
                name = "call" />
              </TouchableOpacity>



              <TouchableOpacity
              onPress={() => Communications.text(thissingle[0].driver_tel)}
              >
                <Icon style = {{color: '#555', paddingRight: 10, fontSize: 20}}
                name = "text" />
                </TouchableOpacity>
          </View>
        );
      }
      
     
    }
  


  render() {
 
    return (

      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#0397dd"}}>
        <Left>
        <Button transparent onPress={() => this.props.navigation.navigate('History')}>
        <Icon  style = {{color: '#FFF'}} name="arrow-back" />
      </Button>
        </Left>
        <Body>
          <Title  style = {{color: '#FFF', fontWeight: '100'}}> Trip  {(thissingle.length > 0) && this.getWord(this.state.status)}</Title>
        </Body>
        <Right />
      </Header>
      {this.props.cancelling && (thissingle.length > 0) &&
        <View style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: 100000000,

        }}>
        <ActivityIndicator style = {{zIndex: 12,}}size='large' />
        <Text style = {{
          fontSize: 14,
          color: '#444'
        }}>cancelling trip...</Text>
        </View>
        }

          
      {
        ((this.state.status === 'null') || (this.state.status === 'complete')) && this.props.navigation.navigate('Map')
      }


          {this.renderProps()}

           
             


      
  {thissingle.length > 0 &&
    
  <View style={styles.checks}>
              <Text
                style = {{
                  textAlign: 'center',
                  color: this.state.vehicle === 'TRUCK' ? '#27D9A1' : '#009AD5',
                  marginTop: 15,
                  fontSize: 15,
                }}>
               {`${this.state.vehicle.toUpperCase()} ${thissingle[0].driver_plate_number.toUpperCase()}`}</Text>

              {this.renderButtons()}

              <View style = {{
                zIndex: 10,
                width: '100%',
                height: '20%',
                backgroundColor: '#FFF',
                borderColor: '#CCC',
                borderWidth: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
            }}>

              <View style = {{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  alignSelf: 'center',
                  padding: 5,
                  borderRightWidth: 1,
                  borderRightColor: '#CCC',


                  //flexDirection: 'row',
              }}>
                <TouchableOpacity
                style = {{
                  flexDirection: 'row',

                }}>
                <Icon style = {{color: '#27D9A1', paddingRight: 10, fontSize: 20}}
                name = "clock" /> 
                  <Text style = {{
                    color: '#43496A', fontSize: 13
                  }}>
                    {`${this.state.distance} KM`}
                  </Text>
                </TouchableOpacity>
                </View>
                <View style = {{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',

                  alignSelf: 'center',
                  padding: 5,

                  //flexDirection: 'row',
              }}>
              <TouchableOpacity
              style = {{
                flexDirection: 'row',

              }}>
              <Icon style = {{color: '#009AD5', paddingRight: 10, fontSize: 20}}
              name = "person" />
             
                <Text style = {{
                  color: '#43496A', fontSize: 17
                }}>
                  {this.getWord(this.state.status)}
                </Text>
              </TouchableOpacity>
                </View>

            </View>


              {this.theContinueButtons()}
              


                </View>
  }

        
{this.props.cancel_msg !== '' &&
      <SnackBar visible={true}
         textMessage={this.props.cancel_msg}
          //actionHandler={()=>{console.log("snackbar button clicked!")}}
          //actionText="let's go"
        />
      }
               

        

      </Container>
    );
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType,
};
const check = require("../../../img/success.png");


const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");


mapStyle = [
  {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "hue": "#ff0000"
          }
      ]
  }
]




const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    type,
    longitude,
    latitudeDelta,
    route,
    estimated_price,selected,
    longitudeDelta,
    error, region,prices,charge_type,
    no_new_match,
    distanceInKM,
    card_exist,
    scheduled,
    match_alert, 
    distance_error,
    network_connected,
    getting_distance,
    fetching_prices,
    history,
    fetch_error,fcm_token,
    distanceInHR,
    nearbydriver,
    locationGotten,
    driversGotten,
    cancelling,
    cancel_msg,
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
    dropoff_coords,history,
    latitudeDelta,fcm_token,
    longitudeDelta,
    estimated_price,
    emergency,route_set,
    type,
    distanceInKM,
    scheduled,
    distanceInHR,
    prices,
    match_alert,
    network_connected,
    charge_type,
    raw,
    no_new_match,
    card_exist,selected,
    distance_error,
    getting_distance,
    fetching_prices,
    fetch_error,
    nearbydriver,
    locationGotten,
    driversGotten,
    cancelling,
    cancel_msg,
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
  getCard,
  setDate,
  network_change,
  StoreKm,
  saveScreenShot,
  charge_method,
  StoreHr,
  getStaticImage,
  getNewMatch,
  setEmergency,from_where,
  change_type,
  onChangeToken,
  onPayment,
  getNewByDriver,
  cancelTrip,
  resetCancelMessage

})(Route);
