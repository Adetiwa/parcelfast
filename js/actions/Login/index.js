import { AsyncStorage } from 'react-native'

import { NavigationActions } from 'react-navigation';

import { EMAIL_CHANGED,
      PASSWORD_CHANGED,
      LOGIN_USER_SUCCESS,
      LOGIN_USER_ERROR,
      LOGIN_USER,
      NO_INPUT,
      REGISTERING,
      NEW_USER_SUCCESS,
      NEW_USER_ERROR,
      CANCEL_ERROR_MSG,
     } from '../types';


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};



export const register = (firstname, lastname, tel, email, password) => {
  return (dispatch) => {
      //login user
      dispatch({ type: REGISTERING });
      fetch('https://project.stackonly.com/app/api/register', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname: firstname+ ' ' +lastname,
            tel: tel,
            email: email,
            password: password,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 'success') {
            dispatch({ type: NEW_USER_SUCCESS, payload: responseJson });
            //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
          } else {
            dispatch({ type: NEW_USER_ERROR, payload: responseJson.msg });
            
          } 
        })
        .catch((error) => {
          console.log("Error is "+error);
          dispatch({ type: NEW_USER_ERROR, payload: "An error occured while getting match background" })
        })
    }
};



export const loginUser = ({ email, password }) => {
    
  if (email === '' || password === '') {
      return (dispatch) => {
        dispatch({ type: NO_INPUT, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: LOGIN_USER });
        fetch('https://project.stackonly.com/app/api/user', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            if (status === 'success') {
              //AsyncStorage.setItem('user_access_token', responseJson.token);
              //var t = AsyncStorage.getItem('user_access_token')
              //console.log("The realest token is "+t);
              dispatch({ type: LOGIN_USER_SUCCESS, payload: responseJson });
              dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: LOGIN_USER_ERROR, payload: responseJson })
            }

          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: LOGIN_USER_ERROR, payload: responseJson })
          })


    }

  }

};
