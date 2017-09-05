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
//import { Card, Button } from 'react-native-material-design';
import TimeAgo from 'react-native-timeago';
import TabOne from "../tab/tabOne";
import TabTwo from "../tab/tabTwo";
import TabThree from "../tab/tabThree";
import * as Animatable from 'react-native-animatable';

//import Button from 'react-native-button';

import styless from "./styles";
const pickup = require("../../../img/pickup.png");
const deviceHeight = Dimensions.get("window").height;


const datas = [];
const maxlimit = 20;
const thissingle = [];
class History extends Component {

componentWillMount(){
  //this.props.getThisHistory(this.props.selected);

  var chose = this.props.selected;
  
  var a = this.props.history;
  
  var aFiltered = a.filter(function(elem, index){
    return elem.o_id == chose;
  });
  thissingle = aFiltered
  console.log(thissingle[0].url);
  
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
          onPress={() => this.props.navigation.navigate('History')}
         />

        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('History')}>
          <Icon  style = {{color: '#888'}} name="arrow-back" />
        </Button>
          </Left>
          <Body>
            <Title  style = {{color: '#888'}}> Trip details </Title>
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
                    					 <Card 
                               style={styles.mb}>
                                  
                                   <CardItem cardBody>
                                     <Image
                                       style={{
                                         resizeMode: "cover",
                                         width: null,
                                         height: 200,
                                         flex: 1
                                       }}
                                       source={{uri: thissingle[0].url}}
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
                                          justifyContent: 'flex-start',
                                        }}
                                          ></View>
                                          <Text style = {{textAlign: 'left'}}>
                                         {thissingle[0].user_from }</Text>
                                     </Button>
                                       <Button iconLeft transparent>
                                       <View style = {{
                                            width: 10,
                                            height: 10,
                                            //borderRadius: 10,
                                            backgroundColor: 'red',
                                            marginRight: 10,
                                          }}
                                            ></View>
                                            <Text>
                                           {thissingle[0].user_to }</Text>
                                       </Button>
                                       <View style = {{
                                         
                                       }}
                                         >

                                         </View>
                                     </Body>
                                     
                                   </CardItem>
                                   
                                   </Card>
                                   {thissingle[0].order_status === 'pending' &&
                                    
                                    <Card 
                                      style={styles.mb}>
    
                                    <TableView>
                                      <Cell cellStyle="RightDetail" title="A driver is yet to be assigned"/>
                                   
                                
                                    
                                  </TableView>
                                    
                                   </Card>
                                   
                                   }

                                   {thissingle[0].order_status !== 'pending' &&
                                    
                                    <Card 
                                      style={styles.mb}>
    
                                    <TableView>
                                      <Cell cellStyle="RightDetail" title={`${thissingle[0].driver} with plate number ${thissingle[0].driver_plate_number} `}/>
                                   
                                
                                    
                                  </TableView>
                                    
                                   </Card>
                                   
                                   }


                                   <Card 
                                    style={styles.mb}>
   
                                   <TableView>
                                  <Section header="PARCELFAST RECEIPT" footer={`₦ ${thissingle[0].amount}`}>
                                    <Cell cellStyle="RightDetail" title="Base Fair" leftDetailColor="#6cc644" detail={`₦ ${thissingle[0].base}`}/>
                                    <Cell cellStyle="RightDetail" title="Distance" detail={`${thissingle[0].km} km`} />
                                    <Cell cellStyle="RightDetail" title="Time" detail={`${thissingle[0].min} min`} />
                                    <Cell cellStyle="RightDetail" title="Toll" detail={`₦ ${thissingle[0].toll}`} />
                                    <Cell cellStyle="RightDetail" title="Emergency" detail={`₦ ${thissingle[0].emergency_cost}`} />
                                    <Cell cellStyle="RightDetail" title="Vehicle" detail={thissingle[0].vehicle} />
                                    <Cell
                                      cellStyle="RightDetail"
                                      accessory="Checkmark"
                                      title="CASH"
                                     />
                                    
                                    <Cell cellStyle="RightDetail" title="Total" detail={`₦ ${thissingle[0].amount}`} />
                                    
                                    
                                  </Section>
        
                               
                                  
                                </TableView>
                                   
                                   </Card>

                     
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
    selected,
    distanceInHR,
    prices,
    history,
    done,
    history_single,
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
    selected,
    latitudeDelta,
    longitudeDelta,
    emergency,
    prices,
    done,
    estimated_price,
    history_single,
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
  getThisHistory,
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
