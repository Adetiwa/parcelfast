import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { destinationChanged,
          select_vehicle,
          hoverondesc,
          set_suggestion_dest,
          set_suggestion_pick,
          geocodeTheAddress_pickup,
          geocodeTheAddress_dest,
          input_everything,
          getDistance,
          getRoute,
          empty_predictions,
        } from '../../actions/Map';
import Prediction from '../../../node_modules/react-native-google-place-autocomplete/lib/Prediction';
import AndroidBackButton from "react-native-android-back-button";

import { View, Image,ActivityIndicator, Dimensions,ScrollView, Animated, PermissionsAndroid,
  Platform, TextInput, StyleSheet,
  LayoutAnimation,
  StatusBar, TouchableWithoutFeedback, TouchableOpacity} from "react-native";

  import {
  	Content,
  	Text,
  	List,
  	ListItem,
  	Icon,
  	Container,
  	Left,
  	Right,
  	Badge,
    Button,
    StyleProvider,
  	getTheme,
  	variables,
  } from "native-base";

import isEqual from 'lodash/isEqual';

import styles from "./style";
import SearchBox from "../searchbar"
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

const datas = [];



class Location extends Component {

  componentDidMount() {

  }

  componentWillUpdate() {

    this.haha();
  }


  select_suggest(suggestion) {
      if (this.props.current_hover === 'destination') {
        this.props.set_suggestion_dest(suggestion);


      } else {
            this.props.set_suggestion_pick(suggestion);

        }
        this.inputter();
  }




      inputter() {
        if ((this.props.pickup != '') && (this.props.destination !== '')) {
          this.props.geocodeTheAddress_dest(this.props.destination);
          this.props.geocodeTheAddress_pickup(this.props.pickup);
          this.props.getDistance(this.props.pickup, this.props.destination);
          this.props.getRoute(this.props.pickup, this.props.destination);
          this.props.input_everything();
        }
      }

    haha() {

      datas = [];
      for (var key in this.props.predictions) {
        if (this.props.predictions.hasOwnProperty(key)) {
          //console.log("Thisss!!! "+JSON.stringify(this.props.predictions[key]));
          datas.push(this.props.predictions[key]);
        }

      }
      //console.log(this.props.predictions);

    }

  render() {
    return (


                    <Animatable.View animation='bounceIn' style = {{
                      flex: 1,
                      backgroundColor: '#FFF',
                      marginTop: 150,

                    }}>
                    <ScrollView>
                    <AndroidBackButton
                        onPress={() => this.props.input_everything()}
                       />
                       {this.haha()}
                  
                       {this.props.loading_prediction === false ?
                       
                    <List

                    						dataArray={datas}
                    						renderRow={data =>
                    							<ListItem button  onPress={() => this.select_suggest(data.description)}>
                    									<Text style = {{fontSize: 13, flex: 10, flexDirection: 'row'}}>
                                      
                                      <Icon style = {{color: '#888', marginRight: 15, flex: 2, fontSize: 17}} name="pin" /> {data.description}
                    									</Text>

                    							</ListItem>}
                    					/>

                              :

                              <View style={{
                                width: '100%',
                                height: '100%',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#FFF',
                                zIndex: 10,
                      
                              }}>
                              <ActivityIndicator style = {{zIndex: 12,}}size='small' />
                              </View>

                                }


                    </ScrollView>
                    </Animatable.View>



    );
  }
}




const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup,
    current_hover,
     vehicle, error,predictions,
     prediction_error,loading_prediction,
     pickup_location,
     destination_location,
     error_geoecoding,
    loading, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    hoveron,
    loading,
    current_hover,
    status,
    predictions,
    prediction_error,
    pickup_location, loading_prediction,
    destination_location,
    error_geoecoding,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  hoverondesc,
  select_vehicle,
  set_suggestion_dest,
  set_suggestion_pick,
  geocodeTheAddress_pickup,
  empty_predictions,
  geocodeTheAddress_dest,
  input_everything,
  getDistance,
  getRoute,

})(Location);
