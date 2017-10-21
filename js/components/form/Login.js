import React, { Component } from "react";
import { View, Image, NetInfo, StatusBar, ActivityIndicator, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, network_change } from '../../actions/Login';
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

import styles from "./styles";

class Login extends Component {

  componentWillMount(){
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


/*
 <View style =  {styles.buttons}>

          <TouchableOpacity style={styles.login}>

            <Icon style={{color: '#FFF'}} name="logo-facebook" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.register}>

            <Icon style={{color: '#FFF'}} name="logo-googleplus" />
          </TouchableOpacity>


          </View>
  */
 onEmailChange(text) {
   this.props.emailChanged(text);
 }

 onPasswordChange(text) {
   this.props.passwordChanged(text);
 }

onButtonPress() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}

renderButt() {
  if (this.props.loading) {
      return (
        <ActivityIndicator style = {{
        justifyContent: 'center',
        alignItems: 'center',
      }} />
    );
  } else {
    return (

      <TouchableOpacity style = {{
        marginTop: 40,
      }}
        onPress={this.onButtonPress.bind(this)}
         >
        <View style={styles.buttonContainer}>
          <Text style = {styles.continueText}>SIGN IN</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

checkForLog() {
  if (this.props.status) {
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
         <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#0397dd"}}>
         <Left>
           <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
             <Icon style = {{color: '#FFF'}} name="arrow-back" />
           </Button>
         </Left>
         <Body>
           <Title style = {{color: '#FFF', fontWeight: '100'}}> Login</Title>
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
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                editable={this.props.loading ? false : true}
                //ref= {(el) => { this.username = el; }}
                //onChangeText={(username) => this.setState({username})}
                value={this.props.email}
                onChangeText = {this.onEmailChange.bind(this)}
             />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                autoCapitalize="none"
                editable={this.props.loading ? false : true}
                //ref= {(pass) => { this.password = pass; }}
                //onChangeText={(password) => this.setState({password})}
                value={this.props.password}
                secureTextEntry={true}
                onChangeText = {this.onPasswordChange.bind(this)}
             />
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
            }}>{this.props.error}</Text>


        </Content>
        </View>
  
      </Container>
    );
  }
}
const head = require("../../../img/head-logo.png");


const mapStateToProps = ({ auth }) => {
  const { email, password, error,network_connected, loading, status } = auth;
  return {
    email,
    password,
    error,
    loading,
    status,
    network_connected,
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  network_change,
})(Login);
