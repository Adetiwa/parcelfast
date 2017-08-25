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
        } from '../../actions/Map';
import Prediction from '../../../node_modules/react-native-google-place-autocomplete/lib/Prediction';
import AndroidBackButton from "react-native-android-back-button";

import { View, Image, Dimensions,ScrollView, Animated, PermissionsAndroid,
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


                    <ScrollView style = {{
                      flex: 1,
                      backgroundColor: '#FFF',
                      marginTop: 110,

                    }}>
                    <AndroidBackButton
                        onPress={() => this.props.input_everything()}
                       />
                    <List

                    						dataArray={datas}
                    						renderRow={data =>
                    							<ListItem button noBorder onPress={() => this.select_suggest(data.description)}>
                    									<Text>
                    										{data.description}
                    									</Text>

                    							</ListItem>}
                    					/>


                    </ScrollView>



    );
  }
}




const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup,
    current_hover,
     vehicle, error,predictions,
     prediction_error,
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
    pickup_location,
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
  geocodeTheAddress_dest,
  input_everything,
  getDistance,
  getRoute,

})(Location);
