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
          getNewMatch,

        } from '../../actions/Map';
import PushNotification from 'react-native-push-notification';
        
class Jobs extends Component {


     async componentDidMount() {
        
      setInterval (() => {
        this.props.getNewMatch(this.props.user.userid);
        if (this.props.match_alert !== null) {
          var responseJson = this.props.match_alert;
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
      
    
      }, 10000);
    }
    render () {
        return (
           <View></View>
        );
    }
}
const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    no_new_match,
    longitudeDelta,
    match_alert,
    match_error,
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
    no_new_match,
    match_alert,
    match_error,
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
  getNewMatch,
  setUser,

})(Jobs);
