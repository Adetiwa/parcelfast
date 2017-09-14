import React, { Component } from "react";
import { View, StatusBar, ActivityIndicator, TouchableOpacity} from "react-native";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions/Login';
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

      <TouchableOpacity style = {styles.continue}
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
        <Header style = {{borderBottomColor: "#FFF", backgroundColor: "#FFF"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style = {{color: '#888'}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style = {{color: '#888'}}> Login</Title>
          </Body>
          <Right />
        </Header>

        <Content style = {{
          padding: 20,
        }}>
         
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                //ref= {(el) => { this.username = el; }}
                //onChangeText={(username) => this.setState({username})}
                value={this.props.email}
                onChangeText = {this.onEmailChange.bind(this)}
             />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
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
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, status } = auth;
  return {
    email,
    password,
    error,
    loading,
    status
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(Login);
