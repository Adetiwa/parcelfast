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
import SnackBar from 'react-native-snackbar-dialog';
import {  selectSupport,
          getsupport,
          network_change,

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

import styless from "./styles";
const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;


const datas = [];
const maxlimit = 20;
const hold = true;
class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      status: true,
    }
  
  }
componentWillMount(){
  if (this.props.support === null) {
    this.props.getsupport();
  }
  NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
  
      NetInfo.isConnected.fetch().done(
        (isConnected) => {  this.props.network_change(isConnected); }
      );
}

componentDidMount() {
  this.haha();
  }
//
selectHis(data) {
  this.props.selectSupport(data);

  this.props.navigation.navigate('SingleSupport');
}

haha() {
        datas = [];
        for (var key in this.props.support) {
          if (this.props.support.hasOwnProperty(key)) {
            datas.push(this.props.support[key]);
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
          <Title style = {{color: '#FFF', fontWeight: '100'}}>Support</Title>
        </Body>
        <Right />
        {this.props.support === {} &&
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
    
      {this.props.support_empty === false && !this.props.fetching &&

      <Content padder>


        <Animatable.View animation='pulse'>
          
                      <List

                    						dataArray={this.props.support}
                    						renderRow={data =>
                    					 
                               <ListItem
                               button 
                               onPress={() =>  this.selectHis(data.s_id)}>
                 
                                 <Text>{data.title}</Text>
                                
                 
                             </ListItem>
                             

                    							}
                    					/>
                              </Animatable.View>
                              </Content>
      }
      {this.props.support_empty === true && !this.props.fetching &&
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
                                }}> YOU HAVE NO support </Text>
                              </View>

                              </View>
      }
      {!this.props.network_connected &&
        SnackBar.show('Network Unavailable', {
        confirmText: 'Retry',
        duration: 100000,
        onConfirm: () => {
          //console.log('Thank you')
          //
          NetInfo.isConnected.fetch().done(
            (isConnected) => {  this.props.network_change(isConnected); }
          );
        }
      })
      }
      {this.props.network_connected && SnackBar.dismiss()}
     
</Container>
    );
  }
}


const trame = require("../../../img/TRAME.png");
const empty = require("../../../img/empty-folder.png");

const menu = require("../../../img/MENU.png");
const menu_white = require("../../../img/MENU_WHITE.png");


const mapStateToProps = ({ map }) => {
  const { network_connected,
    user,
    estimated_price,support_empty,
    fetching,
    support } = map;
  return {
    network_connected,
    fetching,
    user,
    estimated_price,support_empty,
    support,
  };
};

export default connect(mapStateToProps, {
  network_change,
  getsupport,
  selectSupport,
})(Support);

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
