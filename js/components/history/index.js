
//import React, { Component } from "react";
//import { View, Image, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  NetInfo,
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
          selectHistory,
          getHistory,
          network_change,
          cancelTrip,

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
import AndroidBackButton from "react-native-android-back-button";
//import { Card, Button } from 'react-native-material-design';
import TimeAgo from 'react-native-timeago';
import TabOne from "../tab/tabOne";
import TabTwo from "../tab/tabTwo";
import TabThree from "../tab/tabThree";
import Communications from 'react-native-communications';
//import Button from 'react-native-button';
import * as Animatable from 'react-native-animatable'
import Route from "../route/";

import styless from "./styles";
const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;


const datas = [];
const maxlimit = 20;
const hold = true;
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      status: true,
    }
  
  }
componentWillMount(){
  this.props.getHistory(this.props.user.userid);

  NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
  
      NetInfo.isConnected.fetch().done(
        (isConnected) => {  this.props.network_change(isConnected); }
      );
}

componentDidMount() {
  this.haha();
  }
//
selectHis(data, okay) {
  this.props.selectHistory(data);
  if ((okay == 'null') || (okay == 'complete')) {
    this.props.navigation.navigate('Single');
  } else {
    this.props.navigation.navigate('Route');
  }
  
}

haha() {
        datas = [];
        for (var key in this.props.history) {
          if (this.props.history.hasOwnProperty(key)) {
            datas.push(this.props.history[key]);
          }
        }
}

componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
       // this.setState({ status: isConnected });
        this.props.network_change(isConnected);
        //console.log(`is connected: ${this.state.status}`);
}


getColor(status) {
  let color = "";
  if (status === "pending") {
    color = "red";
  } else {
    color = "green";
  }
  return color;
}



textRenderer(text, data) {
  if (data === 'cancelled') {
    return (
      <View style = {{
        backgroundColor: '#f62e2e',
        padding: 5,
      }}>
      <Text style = {{
        fontSize: 12, color: '#FFF'
      }}>TRIP CANCELLED</Text>
    </View>
    )
  } else {
  if (text === 'null') {
    return (
      <View style = {{
        backgroundColor: '#009AD5',
        padding: 5,
      }}>
      <Text style = {{
        fontSize: 12, color: '#FFF'
      }}>Dispatcher yet to commence trip</Text>
    </View>
    )
  } else if(text === 'pickup') {
    return (
      <View style = {{
        backgroundColor: '#009AD5',
        padding: 5,
      }}>
      <Text style = {{
        fontSize: 12, color: '#FFF'
      }}>Dispatcher heading to pickup</Text>
    </View>
    )
  }  else if(text === 'dropoff') {
    return (
      <View style = {{
        backgroundColor: '#43496A',
        padding: 5,
      }}>
      <Text style = {{
        fontSize: 12, color: '#FFF'
      }}>Dispatcher heading to dropoff</Text>
    </View>
    )
  }  else if(text === 'complete') {
    return (
      <View style = {{
        backgroundColor: '#27D9A1',
        padding: 5,
      }}>
      <Text style = {{
        fontSize: 12, color: '#FFF'
      }}>Delivery completed!</Text>
    </View>
    )
  }
}
}
  render () {
    return (


        <Container style={styles.container}>

        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#009AD5"}}>
        <Left>
          <TouchableOpacity
              transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Image source = {menu_white}/>
            </TouchableOpacity>
        </Left>
        <Body>
          <Title style = {{color: '#FFF', fontWeight: '100'}}>History</Title>
        </Body>
        <Right />
        {this.props.history === null &&
        <Image style = {{position: 'absolute',
         top: 50, height: 10,}} source={require('../../../img/17.gif')} />
        }
      </Header>
      {this.props.fetching &&
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
     {this.props.cancelling && 
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
    
      {this.props.history_empty === false && !this.props.fetching &&

      <Content padder>


        <Animatable.View animation='pulse'>
          
                      <List

                    						dataArray={this.props.history}
                    						renderRow={data =>
                    					 <Card
                               style={styles.mb}>
                                  <TouchableOpacity
                                  onPress={() =>  this.selectHis(data.o_id, data.driver_status)}
                                  >

                                   <CardItem cardBody>
                                     <Image
                                       style={{
                                         resizeMode: "cover",
                                         width: null,
                                         height: 100,
                                         flex: 1
                                       }}
                                       source={{uri: data.url}}
                                     />
                                   </CardItem>

                                   <CardItem style={{ paddingVertical: 0 }}>

                                     <Body>
                                       <Button iconLeft transparent>
                                       <View style = {{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 10,
                                            backgroundColor: this.getColor(data.order_status),
                                            marginRight: 10,
                                          }}
                                            ></View>
                                            <Text style = {{color: '#444'}}>
                                            ₦{data.amount}</Text>

                                            <Text>
                                           { ((data.user_to).length > maxlimit) ?
                                              (((data.user_to).substring(0,maxlimit-3)) + '...') :
                                              data.user_to }</Text>
                                       </Button>
                                     </Body>
                                     <Right>
                                       <Text
                                       style = {{
                                         fontSize: 10,color: '#444'
                                       }}
                                         >{data.timeago}</Text>
                                     </Right>

                                   </CardItem>
                                   </TouchableOpacity>
                                   <View style = {{
                                     paddingBottom: 5,
                                     paddingLeft: 5,
                                     flexDirection: 'row',
                                     justifyContent: 'space-between'
                                   }}>
                                   
                                   {this.textRenderer(data.driver_status, data.order_status)}
                                   
                                   {data.driver !== "null" && data.order_status !== 'cancelled' &&
                                   <View style = {{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 10,
                                   }}>
                                   <TouchableOpacity
                                     onPress={() => Communications.phonecall(data.driver_tel, true)}>
                                     <Icon style = {{color: '#555', paddingRight: 10, fontSize: 20}}
                                     name = "call" />
                                   </TouchableOpacity>
                                   <TouchableOpacity
                                     onPress={() => Communications.text(data.driver_tel)}>
                                     <Icon style = {{color: '#555', paddingRight: 10, fontSize: 20}}
                                     name = "text" />
                                   </TouchableOpacity>
                                   </View>
                                   }
                                  {data.order_status !== 'cancelled' &&
                                      <TouchableOpacity style = {{
                                        justifyContent: "center",
                                        alignItems: 'center',
                                      //  padding: 5,
                                      }}
                                      onPress = {() => this.props.cancelTrip(data.o_id, this.props.user.userid, 0)} >
                                      <View style={{
                                          justifyContent: "center",
                                          alignItems: 'center',
                                          backgroundColor: '#f62e2e',
                                          padding: 10,
                                          marginRight: 5,
                                        //  width: "70%",
                                        }}>
                                        <Text style = {{
                                            color: '#FFF',
                                          }}>cancel trip</Text>
                                      </View>
                                    </TouchableOpacity>
                                   }
                                 </View>

                                  
                                 </Card>

                    							}
                    					/>
                              </Animatable.View>
                              </Content>
      }
      {this.props.history_empty === true && !this.props.fetching &&
                              <View
                              style = {{
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FFF',
                                flex: 1,

                              }}>
                              <View>
                                <Image source = {empty}/>
                              </View>
                              <View>
                                <Text
                                style = {{
                                  color: '#888',
                                  fontSize: 14,
                                }}> YOU HAVE NO HISTORY </Text>
                              </View>

                              </View>
      }
    
</Container>
    );
  }
}


const trame = require("../../../img/TRAME.png");
const empty = require("../../../img/empty-folder.png");

const menu = require("../../../img/MENU.png");
const menu_white = require("../../../img/MENU_WHITE.png");


const mapStateToProps = ({ map }) => {
  const { destination, hoveron,
    pickup, vehicle,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    estimated_price,
    distanceInKM,
    network_connected,
    distanceInHR,
    prices,history_empty,
    done,fetching,
    history,
    cancelling,
    cancel_msg,
    error, region, user, distance_info, loading,emergency, status } = map;
  return {
    destination,
    pickup,
    vehicle,
    error,
    distanceInKM,
    distanceInHR,
    network_connected,
    hoveron,
    distance_info,fetching,
    loading,
    region,
    user,
    status,
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    emergency,
    prices,
    done,
    estimated_price,history_empty,
    history,
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
  calculatePrice,
  StorePrice,
  network_change,
  cancelTrip,
  getHistory,
  selectHistory,
})(History);

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
