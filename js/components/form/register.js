import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator, TouchableOpacity} from "react-native";

import { connect } from 'react-redux';
import { register } from '../../actions/Login';

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
*/

  sendData() {
    this.setState({error: ""});
    if ((this.state.firstname === '') || (this.state.lastname === '') || (this.state.email === '') || (this.state.tel === '') || (this.state.password === '')) {
      this.setState({error: "All inputs are required"});
    } else {
    //  this.props.save_summary_state(this.state);
      this.props.register(this.state.firstname, this.state.lastname, this.state.tel, this.state.email, this.state.password);
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
            onPress = {() => this.sendData()} >
            <View style={styles.buttonContainer}>
              <Text style = {styles.continueText}>REGISTER</Text>
            </View>
          </TouchableOpacity>
      );
    }
  }
  
  checkForLog() {
    if (this.props.statusReg) {
      this.props.navigation.navigate('Map');
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
        <AndroidBackButton
          onPress={() => this.props.navigation.navigate('Home')}
         />
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#888'}}> Register</Title>
          </Body>
          <Right />
        </Header>
        
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
                onSubmitEditing= {() => this.tel.focus()}
                returnKeyType = "next"
                onChangeText = {(input)=>this.setState({password: input})}
                placeholderTextColor="#CCC"
                ref='password' />
            </Item>
            {this.renderButt()}
            {this.checkForLog()}
       
            
          
          </Form>
            
          <Text
            style = {{
              fontSize: 15,
              marginTop: 10,
              alignSelf: 'center',
              color: '#f62e2e',
            }}>{this.state.error || this.props.errorReg}</Text>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, errorReg, loadingReg, statusReg } = auth;
  return {
    email,
    password,
    errorReg,
    loadingReg,

    statusReg,
  };
};

export default connect(mapStateToProps, {
  register
})(Register);
