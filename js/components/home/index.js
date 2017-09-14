'use strict';

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Examples, NavigationBar, Button, Icon, Title } from '@shoutem/ui';
import styless from "./styles";
import { connect } from 'react-redux';

import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          editUser,
          clearEverything,

        } from '../../actions/Map';

var TopScreen = require('./TopScreen');
var BottomScreen = require('./BottomScreen');

class Home extends Component {
  
  componentWillMount() {
    this.props.clearEverything();
  }

  render() {
    return (
      <View style={styles.container}>
      
        <BottomScreen style={styles.viewpager}/>

        <View style = {styless.buttons}>
					<TouchableOpacity style = {styless.login}
						onPress = {() => this.props.navigation.navigate('Login')} >
						<Text style = {{color: '#009AD5'}}>SIGN IN</Text>
					</TouchableOpacity>
					<TouchableOpacity style = {styless.register}
						onPress = {() => this.props.navigation.navigate('Register')} >
						<Text style = {styless.registerText}>REGISTER</Text>
					</TouchableOpacity>
				</View>

      </View>
    )
  }
}




var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  viewpager: {
    flex: 1,
  },

});


const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    edit_progress,
    error, region,
    edit_error, user, loading, status } = map;
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
    edit_progress,
    edit_error,
  };
};

export default connect(mapStateToProps, {
  destinationChanged,
  getCurrentLocation,
  hoverondesc,
  select_vehicle,
  get_name_of_loc,
  clearEverything,
  update_region,
  editUser,

})(Home);
