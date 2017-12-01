import React, { Component } from "react";
import { View,NetInfo, StatusBar, Image, ActivityIndicator, TouchableOpacity} from "react-native";

import { connect } from 'react-redux';
import { register,network_change } from '../../actions/Map';

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
  Text
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import styles from "./styles";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      tel: '',
      password: '',
      error: this.props.errorReg,
    }
  
  }
  componentWillUpdate() {
    this.checkForLog();
  }


/*
{this.props.statusReg && this.getTheFuckOut()}
        
  getTheFuckOut() {
    this.props.navigation.navigate('Map');
  
}
    <Text
            style = {{
              fontSize: 15,
              marginTop: 10,
              alignSelf: 'center',
              color: '#f62e2e',
            }}>{this.state.error || this.props.errorReg}</Text>
       
*/

validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

  sendData() {
    this.setState({error: ""});
    if ((this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') || (this.state.tel === '') || (this.state.password === '')) {
      this.setState({error: "All inputs are required"});
    } else {
      if (!this.validateEmail(this.state.email)) {
        this.setState({error: "Enter a Valid Email Address"});
      } else {
        this.props.register(this.state.firstname, this.state.lastname, this.state.tel, this.state.email, this.state.password);
      }
    } 
    //console.log(JSON.stringify(this.state));
  }
  renderButt() {
    if (this.props.loadingReg) {
        return (
          <ActivityIndicator style = {{
          justifyContent: 'center',
          alignItems: 'center',
        }} />
      );
    } else {
      return (
  
        <TouchableOpacity style = {styles.continue}
            onPress = {() => this.sendData()}
          >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>REGISTER</Text>
            </View>
          </TouchableOpacity>
      );
    }
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    
        NetInfo.isConnected.fetch().done(
          (isConnected) => {  this.props.network_change(isConnected); }
        );
  }
  
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
       // this.setState({ status: isConnected });
        this.props.network_change(isConnected);
        //console.log(`is connected: ${this.state.status}`);
}



  checkForLog() {
    if (this.props.statusReg) {
      this.props.navigation.navigate('Map');
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Home')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#0397dd"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style = {{color: '#FFF'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#FFF', fontWeight: '100'}}> Register</Title>
          </Body>
          <Right />
        </Header>
        <View style = {{
         flex: 1,
         marginTop: 20,
       }}>
        
        <Content style = {{
          padding: 20,
        }}>
          <Form>
            <View style = {styles.names}>
              <Item style = { {width: '45%'} } floatingLabel>
                <Label>Firstname</Label>
                <Input
                underlineColorAndroid= 'transparent'
                disabled = {this.props.loadingReg ? true : false}
                editable={this.props.loadingReg ? false : true}
                value={this.state.firstname}
                //onSubmitEditing= {() => this.tel.focus()}
                returnKeyType = "next"
                onChangeText = {(input)=>this.setState({firstname: input})}
                placeholderTextColor="#CCC"
                ref='firstname'
               />
              </Item>
              <Item style = { {width: '45%'} }  floatingLabel>
                <Label>Lastname</Label>
                <Input
                underlineColorAndroid= 'transparent'
                editable={this.props.loadingReg ? false : true}
                disabled = {this.props.loadingReg ? true : false}
                value={this.state.last}
                //onSubmitEditing= {() => this.tel.focus()}
                returnKeyType = "next"
                onChangeText = {(input)=>this.setState({lastname: input})}
                placeholderTextColor="#CCC"
                ref='lasttname'
                />
              </Item>
            </View>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                underlineColorAndroid= 'transparent'
                value={this.state.email}
                editable={this.props.loadingReg ? false : true}
                keyboardType = "email-address"
                disabled = {this.props.loadingReg ? true : false}
                //onSubmitEditing= {() => this.tel.focus()}
                returnKeyType = "next"
                onChangeText = {(input)=>this.setState({email: input})}
                placeholderTextColor="#CCC"
                ref='email' />
            </Item>
            <Item floatingLabel>
              <Label>Tel</Label>
              <Input
                underlineColorAndroid= 'transparent'
                value={this.state.tel}
                keyboardType = "phone-pad"
                disabled = {this.props.loadingReg ? true : false}
                //onSubmitEditing= {() => this.tel.focus()}
                editable={this.props.loadingReg ? false : true}
                returnKeyType = "next"
                onChangeText = {(input)=>this.setState({tel: input})}
                placeholderTextColor="#CCC"
                ref='tel' />
            </Item>
            
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                underlineColorAndroid= 'transparent'
                disabled = {this.props.loadingReg ? true : false}
                value={this.state.password}
                editable={this.props.loadingReg ? false : true}
                onSubmitEditing= {() => this.tel.focus()}
                returnKeyType = "next"
                onChangeText = {(input)=>this.setState({password: input})}
                placeholderTextColor="#CCC"
                ref='password' />
            </Item>
            {this.renderButt()}
            {this.checkForLog()}
       
            
          
          </Form>
            {this.state.error !== '' && 
            
            <Text
              style = {{
                fontSize: 15,
                marginTop: 10,
                alignSelf: 'center',
                color: '#f62e2e',
              }}>{this.state.error}</Text>


            }
       </Content>
        </View>
      
      </Container>
    );
  }
}
const head = require("../../../img/head-logo.png");

const mapStateToProps = ({ map }) => {
  const { email, password,network_connected, errorReg, loadingReg, statusReg } = map;
  return {
    email,
    password,
    errorReg,
    loadingReg,
    network_connected,
    statusReg,
  };
};

export default connect(mapStateToProps, {
  register,
  network_change
})(Register);
