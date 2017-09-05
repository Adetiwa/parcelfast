import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { destinationChanged,
          select_vehicle,
          hoverondesc,
          pickupChanged,
          input_everything,
          get_name_of_loc,
          getAddressPrediction,
          geocodeTheAddress_pickup,
          geocodeTheAddress_dest,
          getDistance,
          getRoute,
        } from '../../actions/Map';
import { View, Image, Dimensions, Animated, PermissionsAndroid,
  Platform, TextInput, StyleSheet,
  LayoutAnimation,
  StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
  import AndroidBackButton from "react-native-android-back-button";

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

import styles from "./style";
import SearchBox from "../searchbar";

import * as Animatable from 'react-native-animatable'

const transitionProps = {
  hoverbar: ['top', 'left', 'height', 'width', 'shadowRadius'],
  square: ['top', 'left'],
  destinationBox: ['left', 'height', 'opacity'],
  sourceBox: ['top', 'opacity'],
  destination: ['top', 'left', 'fontSize', 'color', 'opacity'],
  sourceText: ['top', 'opacity'],
  verticalBar: ['top', 'left', 'opacity'],
  dot: ['top', 'left', 'opacity'],
}

const SQUARE_SIZE = 6

const AnimatableTouchable = Animatable.createAnimatableComponent(TouchableWithoutFeedback)

const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width/ height;


class Header_Search extends Component {
  componentWillMount() {
    }

  componentWillUpdate() {
    //Animated.spring(height, {toValue: 300, friction: 0.8}).start()
    //LayoutAnimation.linear();
  }


  onDestChange(text) {
    this.props.destinationChanged(text);
    this.props.getAddressPrediction(text);
    //this.props.geocodeTheAddress_dest(this.props.destination);

  }

  onPickupChange(text) {
    this.props.pickupChanged(text);
    this.props.getAddressPrediction(text);
    //this.props.geocodeTheAddress_pickup(this.props.destination);
  }


  onDestHover() {
    //this.props.get_name_of_loc(this.props.latitude, this.props.longitude);
    this.props.hoverondesc();
  }
  choose(type) {
    //const { email, password } = this.props;
    this.props.select_vehicle(type);
  }

  inputter() {
    if ((this.props.pickup != '') && (this.props.destination !== '')) {
      this.props.geocodeTheAddress_dest(this.props.destination);
      this.props.geocodeTheAddress_pickup(this.props.pickup);
      this.props.getDistance(this.props.pickup, this.props.destination);
      this.props.getRoute(this.props.pickup, this.props.destination);


      this.props.input_everything();
    } else {
      if(this.props.pickup != '') {
        this.refs.pickupInput.focus();
      } else {
        this.refs.destInput.focus();
      }
    }
  }
  backJob() {
    this.props.goBacktoMap();
  }



  getAnimatableStyles = () => {
    const {width: windowWidth} = Dimensions.get('window')
    const width = windowWidth - 24 * 2


    return {
      names: {
        //14px 28px
        //padding: 20,
        marginTop: this.props.hoveron ? 50 : 0,
        height: 40,
        right: this.props.hoveron ? 15 : 25,
        left: this.props.hoveron ? 15 : -15,
        zIndex: 6000,
        backgroundColor: '#FFF',
        width: this.props.hoveron ? 0.95 * width : 0.95 * width,
        borderColor: this.props.hoveron ? '#CCC' : '#fff',
        shadowColor: this.props.hoveron ? '#FFF' : '#888',
        shadowOffset: this.props.hoveron ? { width: 0, height: 0} : { width: 5, height: 5},
        shadowOpacity: this.props.hoveron ? 0 : 0.7,
        elevation: this.props.hoveron ? 0: 10,
        color: '#111',
        fontSize: 12,
        //fontWeight: 0,
        marginBottom: this.props.hoveron ? 0 : 5,
        borderWidth: this.props.hoveron ? 1 : 2,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: this.props.hoveron ? "center" : "auto",
      },
      names1: {
        //14px 28px
        height: 40,
        right: this.props.hoveron ? 15 : 25,
        left: this.props.hoveron ? 15 : -15,
        zIndex: 6000,
        backgroundColor: '#FFF',
        width: this.props.hoveron ? 0.95 * width : 0.95 * width,
        borderColor: this.props.hoveron ? '#CCC' : '#fff',
        shadowColor: this.props.hoveron ? '#FFF' : '#888',
        shadowOffset: this.props.hoveron ? { width: 0, height: 0} : { width: 5, height: 5},
        shadowOpacity: this.props.hoveron ? 0 : 0.7,
        elevation: this.props.hoveron ? 0: 10,
        color: '#111',
        fontSize: 12,
        //fontWeight: 0,
        marginBottom: this.props.hoveron ? 10 : 0,
        marginTop: this.props.hoveron ? 5 : 0,
        borderWidth: this.props.hoveron ? 1 : 2,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        //opacity: !this.props.hoveron && !this.props.input_done ? 1 : 0,
        opacity: (this.props.hoveron || this.props.input_done) ? 1 : 0,
        alignSelf: this.props.hoveron ? "center" : "auto",

      },

      hoverbar: {
        top: this.props.hoveron ? 20 : 96,
        left: this.props.hoveron ? 0 : 24,
        height: this.props.hoveron ? 136 : 56,
        width: this.props.hoveron ? windowWidth : width,
        shadowRadius: this.props.hoveron ? 10 / 2 : 60 / 2,
      },
      square: {
        top: this.props.hoveron ? 109 : 96 + 56 / 2 - SQUARE_SIZE / 2,
        left: this.props.hoveron ? 29 : 24 + 22,
      },
      destinationBox: {
        position: "absolute",
        elevation: this.props.hoveron ? 2: 0,
        backgroundColor: this.props.hoveron ? '#FFF': 'transparent',
        top: this.props.hoveron ? 0 : 60,
        left: this.props.hoveron ? 0 : 50,
        justifyContent: "center",
        borderWidth: this.props.hoveron ? 2 : 0,
        width: this.props.hoveron ? windowWidth : width,
        borderBottomColor:  this.props.hoveron ? '#CCC' : 'transparent',
        borderColor: this.props.hoveron ? '#CCC' : 'transparent',
        shadowColor: '#CCC',
        shadowOffset: this.props.hoveron ? { width: 5, height: 5} : { width: 0, height: 0},
        shadowOpacity: this.props.hoveron ? 0.7 : 0,

      },

      destinationText: {
        left: this.props.hoveron ? 65 : 75,
        top: this.props.hoveron ? 103 : 112,
        fontSize: this.props.hoveron ? 10 : 15,
        color: this.props.hoveron ? '#A4A4AC' : '#525760',
        opacity: (this.props.hoveron && this.props.destination.length !== 0) ? 0 : 1,
      },
      sourceBox: {
        left: 56,
        right: 24,
        height: 32,
        top: this.props.hoveron ? 56 : 96,
        opacity: this.props.hoveron ? 1 : 0,
      },
      sourceText: {
        left: 65,
        top: this.props.hoveron ? 64 : 76,
        opacity: this.props.hoveron ? 1 : 0,
      },
      verticalBar: {
        top: this.props.hoveron ? 78 : 78 + 22 - 5,
        left: this.props.hoveron ? 32 : 32 + 22 - 5,
        opacity: this.props.hoveron ? 1 : 0,
      },
      dot: {
        //top: this.props.hoveron ? 69 : 69 + 22 - 5,
        //left: this.props.hoveron ? 29.5 : 29.5 + 22 - 5,
       // opacity: this.props.hoveron ? 1 : 1,
        //padding: 0,
        zIndex: 10000,
        position : 'absolute',
        top: this.props.hoveron ? 62 : 15,
        left: this.props.hoveron ? 22 : 12,
        width: 10,
        height: 10,
        borderRadius: this.props.hoveron ? 0 : 10,
        backgroundColor: '#009AD5',
        marginRight: 10,
      },
      searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
       
     },
     line: {
        position: 'absolute',
        //color: 'red',
        flexDirection: 'row',
        width: 1,
        height: 40,
        flexDirection: 'row',
        zIndex: 10,
        backgroundColor: '#888',
        marginRight: 10,
        top: this.props.hoveron ? 72 : 0,
        left: this.props.hoveron ? 27 : 0,
        opacity: this.props.hoveron ? 1 : 0,
     },
     dot2: {
      //top: this.props.hoveron ? 69 : 69 + 22 - 5,
      //left: this.props.hoveron ? 29.5 : 29.5 + 22 - 5,
     // opacity: this.props.hoveron ? 1 : 1,
      //padding: 0,
      zIndex: 10000,
      position : 'absolute',
      top: this.props.hoveron ? 15 : 15,
      left: this.props.hoveron ? 22 : 12,
      width: 10,
      height: 10,
      opacity: (this.props.hoveron || this.props.destination !== '') ? 1 : 0,
      borderRadius: this.props.hoveron ? 0 : 10,
      backgroundColor: 'black',
      marginRight: 10,
    },
    searchSection2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
     
   },
    backButton: {
      
    },
    }
  }

  render() {
    const animatableStyles = this.getAnimatableStyles()

    
    return (



                    <Animated.View animation='flipInY'  style = {animatableStyles.destinationBox}>
                      <AndroidBackButton
                          onPress={() => this.props.input_everything()}
                         />
                         <Button 
                         style = {{position: 'absolute',
                          left: -5,
                          top: 10,
                          //marginTop: -10,
                          opacity: this.props.hoveron ? 1 : 1,
                          }}
                        transparent
                        onPress={() => this.props.input_everything()}>
                          <Icon style = {{color: '#888'}} name="arrow-back" />
                        </Button>
                         <View style={animatableStyles.searchSection}>
                          <View style={animatableStyles.dot}/>
                          <View style={animatableStyles.line}/>
                          <TextInput
                            placeholder="Pick up Address"
                            value = {this.props.pickup}
                            ref='pickupInput'
                            underlineColorAndroid= 'transparent'
                            placeholderTextColor="#CCC"
                            returnKeyType = "go"
                            onFocus = {this.onDestHover.bind(this)}
                            onChangeText = {this.onPickupChange.bind(this)}
                            onSubmitEditing= {() => this.inputter()}
                            style={animatableStyles.names}
                          ></TextInput>
                        </View>
                        <View style={animatableStyles.searchSection2}>
                            <View style={animatableStyles.dot2}/>
                            <TextInput
                            placeholder="Drop off Address"
                            ref='destInput'
                            value = {this.props.destination}
                            underlineColorAndroid= 'transparent'
                            placeholderTextColor="#CCC"
                            returnKeyType = "go"
                            onFocus = {this.onDestHover.bind(this)}
                            onChangeText = {this.onDestChange.bind(this)}
                            //onChangeText ={(val) => this.setState({firstname: val})}
                            onSubmitEditing= {() => this.inputter()}
                            style={animatableStyles.names1}
                          />
                        </View>

                  </Animated.View>



    );
  }
}




const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle, error,
    input_done,
     loading,
     region,
     user,
     status,
     latitude,
     longitude,
     latitudeDelta,
     longitudeDelta,
     predictions,
     prediction_error,
     pickup_location,
     destination_location,
     error_geoecoding,
   } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    input_done,
    hoveron,
    loading,
    status,
    region,
    user,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    predictions,
    prediction_error,
    pickup_location,
    destination_location,
    error_geoecoding,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  hoverondesc,
  select_vehicle,
  pickupChanged,
  input_everything,
  get_name_of_loc,
  getAddressPrediction,
  geocodeTheAddress_pickup,
  geocodeTheAddress_dest,
  getDistance,
  getRoute,

})(Header_Search);
