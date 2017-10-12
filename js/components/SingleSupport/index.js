import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  Switch,
  TextInput,
  ScrollView,
  StatusBar,

} from 'react-native';
import { connect } from 'react-redux';
import {  destinationChanged,
          select_vehicle,
          hoverondesc,
          getCurrentLocation,
          get_name_of_loc,
          update_region,
          fetchPrice,
          getDistance,
          calculatePrice,
          StorePrice,
          StoreKm,
          StoreHr,
          save_summary_state,
          getHistory,
          getThisHistory,

        } from '../../actions/Map';
        import {
          Container,
          Header,
          Title,
          Content,
          Button,
          Icon,
          Card,
          CardItem,
          List,
          ListItem,
          Text,
          Thumbnail,
          TabHeading,
          Left,
          Body,
          Tabs,
          Tab,
          Right,
          IconNB
        } from "native-base";
import {
          Cell,
          Section,
          TableView,
        } from 'react-native-tableview-simple';
import AndroidBackButton from "react-native-android-back-button";
import UserAvatar from 'react-native-user-avatar';

//import { Card, Button } from 'react-native-material-design';
import Communications from 'react-native-communications';

import TimeAgo from 'react-native-timeago';
import TabOne from "../tab/tabOne";
import TabTwo from "../tab/tabTwo";
import TabThree from "../tab/tabThree";
import * as Animatable from 'react-native-animatable';

//import Button from 'react-native-button';

const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;


const datas = [];
const maxlimit = 20;
const thissingle = [];
class SingleSupport extends Component {

componentWillMount(){
  //this.props.getThisHistory(this.props.selected_support);

  var chose = this.props.selected_support;

  var a = this.props.support;

  var aFiltered = a.filter(function(elem, index){
    return elem.s_id == chose;
  });
  thissingle = aFiltered
  
}



componentDidMount() {
 // this.haha();
 //props.history[0] = props.history[0];
 //console.log("RETETEGRBFGFF "+JSON.stringify(thissingle));

}

  render () {
      //  const { params } = this.props.navigation.state;

    return (

        <Container style={styles.container}>

        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
          <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Support')}
         />

        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#0397dd"}}>
          <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('Support')}>
          <Icon  style = {{color: '#FFF'}} name="arrow-back" />
        </Button>
          </Left>
          <Body>
            <Title  style = {{color: '#FFF', fontWeight: '100'}}> { ((thissingle[0].title).length > maxlimit) ?
                                              (((thissingle[0].title).substring(0,maxlimit-3)) + '...') :
                                              thissingle[0].title }
                                               </Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
        {thissingle === '' &&
                <ActivityIndicator style = {{
                justifyContent: 'center',
                alignItems: 'center',
              }} />
            }
            <Animatable.View animation='bounceIn'>
              <View style={{flex: 1}}>
              <Text>{thissingle[0].message}
              </Text>
              </View>

                                   </Animatable.View>

    </Content>
</Container>
    );
  }
}


const trame = require("../../../img/TRAME.png");

const menu = require("../../../img/MENU.png");


const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    estimated_price,
    distanceInKM,
    selected_support,
    distanceInHR,
    prices,
    support,
    done,
    support_single,
    error, region, user, distance_info, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    distanceInKM,
    distanceInHR,
    hoveron,
    distance_info,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    selected_support,
    latitudeDelta,
    longitudeDelta,
    emergency,
    prices,
    done,
    estimated_price,
    support_single,
    support,
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
  calculatePrice,
  StorePrice,
  getHistory,
  getThisHistory,
})(SingleSupport);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',

  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  },
  card: {
    width: 300
  }
});
