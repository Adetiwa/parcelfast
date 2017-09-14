import { AsyncStorage } from "react-native";

import { EMAIL_CHANGED,
   PASSWORD_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_ERROR,
   LOGIN_USER,
   NO_INPUT,
   REGISTERING,
   NEW_USER_SUCCESS,
   NEW_USER_ERROR
 } from '../../actions/types';

const INITIAL_STATE =
  {
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null,
    status: false,
    loadingReg: false,
    errorReg: '',
    statusReg: false,
  }

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch(action.type) {
    case REGISTERING:
      return { ...state, loadingReg: true, errorReg: '' };
    case NEW_USER_SUCCESS:
      return { ...state,
        ...INITIAL_STATE,
         user: action.payload,
         statusReg: true,

      };
    case NEW_USER_ERROR:
      return { ...state, errorReg: action.payload, loadingReg: false };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
    //AsyncStorage.setItem('user_access_token', action.payload.token);
      return { ...state,
          ...INITIAL_STATE,
           user: action.payload,
           status: true,

        };
    case LOGIN_USER_ERROR:
      return { ...state, error: "Authentication Failed", password: '',loading: false, }
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case NO_INPUT:
      return {...state, loading: false, error: 'Input something'};

    default:
      return state;
  }
}
