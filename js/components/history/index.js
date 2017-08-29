
//import React, { Component } from "react";
//import { View, Image, TextInput,  Dimensions, Platform , TouchableOpacity} from "react-native";

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  
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
          Text,
          Thumbnail,
          Left,
          Body,
          Right,
          IconNB
        } from "native-base";
import AndroidBackButton from "react-native-android-back-button";
//import { Card, Button } from 'react-native-material-design';



//import Button from 'react-native-button';

import styless from "./styles";
const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;


const datas = [];
const logo = require("../../../img/logo.png");
const cardImage = require("../../../img/drawer-cover.png");

class History extends Component {

componentWillMount(){
  this.props.getHistory(this.props.user.userid);
  
}

componentDidMount() {
  this.haha();
}

objectifythys() {
  return JSON.stringify(this.props.history);
}

haha() {
  
        datas = [];
        for (var key in this.props.history) {
          if (this.props.history.hasOwnProperty(key)) {
            //console.log("Thisss!!! "+JSON.stringify(this.props.predictions[key]));
            datas.push(this.props.history[key]);
          }
  
        }
        //console.log(this.props.predictions);
  
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
          <Title style = {{color: '#888'}}>History</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
      <Card style={styles.mb}>
       

        <CardItem cardBody>
          <Image
            style={{
              resizeMode: "cover",
              width: null,
              height: 200,
              flex: 1
            }}
            source={{uri: "https://maps.googleapis.com/maps/api/staticmap?size=960x400&path=enc:gxkf@ez%7CSdBsGJ%5BkD%7D@%7BCw@gQqE_Ba@%5DEU?WDi@P_@VMROb@%7DErRw@dDaDhMaC~J%5DrBMfAQnDBvCFlAH~@NnA%5ClBp@tCl@%60CfB~EjBdExCxFlAnBlJbPlEpHZjA%5C%60BHxAAtBCrCGzAMhAOt@c@dBE%60@_@jAWlAQtAQfDSjHMjCQhBYjB%5D%60BYjAc@tAUp@e@n@%5Db@g@d@g@%5CeAf@wCbAyAj@aBt@yAt@mCdBeAx@aA~@gB%7CB%7B@nA_AfBi@xAe@zA_@pBYtBWbE?vBJfCRzCVvBb@rBAP@%5CXtAh@nBFh@@f@C%5EGb@O%5EUXk@%60@%5DNSPAHyGrC_JrD_@VSPWj@Gf@Dr@nAlDNf@Lj@JrAAn@IjAq@fFU%60Ae@rAm@vAG%60@CLo@Iu@%5DuCeAo@Ee@Fk@Le@%5CQTSd@En@CbACRMX%5B%5Ec@TeA%5CYTqBh@qDxAmAl@%7BA~@iBlAoAnA%7B@bAuAhBoJvMeJvMiB~BY%5Cc@VaDbDURsCxBmDxB_EtBGHwEdBsBf@i@NiFtAmHhBkKhCs@RQA%5DDaKhCwAV%7BARgBJwBDmBE_BIiDc@YEU%60B%5DnDe@nC?Nq@~C%7D@vDu@xCWfAKLIHo@zC%5BhAyCnMUbAa@rAi@lAWZ%7DA%60D%5Dt@OPUJMDIJEJ?NBLHJLFN?LCJG@ArFpAdAPzDRhAHz@L%60B%5EZHu@fCGVEh@Ax@l@tAZv@Pj@Lt@Bj@rA%5Dz@WBtD?%7CBrC@Ar@@JDJJFvABA%7CIG%7C@u@tDWxBIfA@zL?vDCfBCpAIr@Kd@Yl@O%60@El@IjCM~BYdEAhG?xAIzB@hB?fCCdAMx@QViAj@i@Z&key=AIzaSyDz8hAJiNiqCVaoNaNcJC8GyxgU_2u6tXA"}}
          />
        </CardItem>

        <CardItem style={{ paddingVertical: 0 }}>
          
          <Body>
            <Button iconLeft transparent>
              <Text>89 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
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
