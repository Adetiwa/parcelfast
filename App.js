import React from "react";
import { View,StatusBar } from "react-native";
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './js/reducers';
import logger from 'redux-logger';
import App from "./js/App";


export default class App1 extends React.Component {
  /*constructor() {
    super();
    this.state = {
      isReady: false
    };
  }*/

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));
    return (
      <Provider store = {store}>
        <View style = {{
          flex: 1,
        }}>
        <StatusBar backgroundColor='#009AD5' barStyle='light-content' />
         
          <App/>
        </View>
      </Provider>
    )
  }
}
