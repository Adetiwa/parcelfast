
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

//import Button from 'react-native-button';

import styless from "./styles";
const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;


const datas = [];
const maxlimit = 20;
class Orders extends Component {

componentWillMount(){
  this.props.getHistory(this.props.user.userid);
  
}

componentDidMount() {
  this.haha();
  //console.log("Data is "+ JSON.stringify(datas));
}

selectHis(data) {
  this.props.selectHistory(data);
  
  this.props.navigation.navigate('Single');
}

haha() {
        datas = [];
        for (var key in this.props.history) {
          if (this.props.history.hasOwnProperty(key)) {
            datas.push(this.props.history[key]);
          }
        }
}
  
  render () {
    return (
        
        
        <Container style={styles.container}>
          <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Map')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
        <Left>
          <TouchableOpacity
              transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Image source = {menu}/>
            </TouchableOpacity>
        </Left>
        <Body>
          <Title style = {{color: '#888'}}>Historyy</Title>
        </Body>
        <Right />
      </Header>
  
      <Content padder>
      {this.props.history === '' &&
              <ActivityIndicator style = {{
              justifyContent: 'center',
              alignItems: 'center',
            }} />
          }

 
                      <List

                    						dataArray={this.props.history}
                    						renderRow={data =>
                    					 <Card 
                               style={styles.mb}>
                                  <TouchableOpacity
                                  onPress={() =>  this.selectHis(data.o_id)}
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
                                            backgroundColor: 'red',
                                            marginRight: 10,
                                          }}
                                            ></View>
                                            <Text style = {{color: '#444'}}>
                                            ₦{data.amount }</Text>

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
                                         ><TimeAgo time={data.date} /></Text>
                                     </Right>
                                   </CardItem>
                                   </TouchableOpacity>
                                 </Card>

                    							}
                    					/>
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
    distanceInHR,
    prices,
    done,
    history,
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
    latitudeDelta,
    longitudeDelta,
    emergency,
    prices,
    done,
    estimated_price,
    history,
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
  selectHistory,
})(Orders);

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
