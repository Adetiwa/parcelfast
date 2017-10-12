import { NavigationActions } from 'react-navigation';
import update from "react-addons-update";
import Geocoder from 'react-native-geocoding';
import RNGooglePlaces from "react-native-google-places";
//import RNFetchBlob from 'react-native-fetch-blob';
import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
Geocoder.setApiKey('AIzaSyCCcOcMglhvXnRsniygV44jmi5QzMdfyVI'); // use a valid API key


import {
   DESTINATION_INPUT,
   SELECT_VEHICLE,
   GET_USER_LOCATION,
   LOGIN_USER_SUCCESS,
   HOVER_ON_DESTINATION,
   PICKUP_INPUT,
   INPUT_DONE,
   UPDATE_REGION,
   GET_SUGGESTIONS,
   GET_SUGGESTIONS_EMPTY,
   SET_SUGGETION_PICKUP,
   SET_SUGGETION_DEST,
   GEOCODE_ADDRESS_PICKUP,
   GEOCODE_ADDRESS_DEST,
   ERROR_GEOCODING,
   FETCHING_PRICES,
   FETCH_PRICE_GOOD,
   FETCH_PRICE_BAD,
   FETCHING_HISTORY_SINGLE,
   FETCH_HISTORY_GOOD_SINGLE,
   FETCH_HISTORY_EMPTY_SINGLE,
   FETCH_HISTORY_BAD_SINGLE,
   EDIT_NO_INPUT,
   EDITTING_USER,
   EDIT_USER_SUCCESS,
   EDIT_USER_ERROR,
   GETTING_DISTANCE,
   DISTANCE_FETCH_SUCCESS,
   DISTANCE_FETCH_ERROR,
   GETTING_PRICE,
   STORE_PRICE,
   STORE_KM,
   STORE_HR,
   DRAW_ROUTE,
   DRAWING_ROUTE,
   DRAWING_ROUTE_ERROR,
   PICKUP_LONG_LAT_RESET,
   GET_NAME_OF_LOCATION,
   GET_NAME_OF_LOCATION_ERROR,
   SAVE_USER_INFO,
   DROPOFF_LONG_LAT_RESET,
   DISTANCE_FETCH,
   TIME_FETCH,
   SAVE_STATE,
   ORDER_SUBMIT_SUCCESS,
   ERROR_OVERALL,
   RESET,
   CLEAR_MAP_DATA,
   FETCHING_HISTORY,
   FETCH_HISTORY_GOOD,
   FETCH_HISTORY_EMPTY,
   FETCH_HISTORY_BAD,
   SCREEN_SHOT,
   DRAW_ROUTE_RAW,
   STATIC_IMAGE,
   STATIC_IMAGE_SUCCESS,
   STATIC_IMAGE_ERROR,
   SELECT_HISTORY,
   LOGOUT,
   MATCH_ALERT_ERROR,
   MATCH_ALERT,
   NO_NEW_MATCH,
   SCHEDULE,
   CONNECTING_DRIVER,
   NO_DRIVER,
   DRIVER_AVAILABLE,
   ERROR_NETWORK_DRIVER,
   EMERGENCY,
   CHARGE_TYPE,
   ONPAYMENT,
   CARD_UPDATE,
   VERYFYING_CARD,
   BAD_VERIFY,
   GOOD_VERIFY,
   ERROR_VERIFY,
   CARD_EXIST,
   NO_CARD,
   ERROR_GETTING_CARD,
   CHANGE_TYPE,
   GETTING_PRICE_ON,
   FETCH_PRICE_ERROR,
   FROM_PAYMENT,
   CHANGE_TOKEN,
   NETWORK,
   SELECT_SUPPORT,
   FETCHING_SUPPORT,
   FETCH_SUPPORT_GOOD,
   FETCH_SUPPORT_EMPTY,
   EMPTY_PREDICTIONS,
   GETTING_PREDICTION,
  } from '../types';


  
  export const empty_predictions = (val) => {
    return {
      type: EMPTY_PREDICTIONS,
      payload: val
    };
};

  export const from_where = (val) => {
    return {
      type: FROM_PAYMENT,
      payload: val
    };
};

export const network_change = (val) => {
  return {
    type: NETWORK,
    payload: val
  };
};

export const destinationChanged = (text) => {
  return {
    type: DESTINATION_INPUT,
    payload: text
  };
};

export const charge_method = (val) => {
  return {
    type: CHARGE_TYPE,
    payload: val
  };
};

export const save_summary_state = (data) => {
    if ((data.pick_up_name === '') || (data.pick_up_tel === '') || (data.drop_off_name === '') || (data.drop_off_tel === '') || (data.extra === '')) {
        return (dispatch) => {
        dispatch({ type: EDIT_NO_INPUT, payload: null });

        }
    } else {
        return (dispatch) => {
        dispatch({ type: SAVE_STATE, payload: data });
        dispatch(NavigationActions.navigate({ routeName: 'Summary' }));
        }
    }
}

export const clearEverything = () => {
  return {
    type: LOGOUT,
    payload: true
  };
};

export const pickupChanged = (text) => {
  return {
    type: PICKUP_INPUT,
    payload: text
  };
};


export const select_vehicle = (type) => {
  return {
    type: SELECT_VEHICLE,
    payload: type
  };
}
export const saveScreenShot = (uri) => {
  return {
    type: SCREEN_SHOT,
    payload: uri,
  }
}

export const hoverondesc = () => {
  return {
    type: HOVER_ON_DESTINATION,
    payload: true,
  };
}


export const selectHistory = (history_id) => {
  return {
    type: SELECT_HISTORY,
    payload: history_id,
  };
}


export const selectSupport = (support_id) => {
  return {
    type: SELECT_SUPPORT,
    payload: support_id,
  };
}



export const setUser = (user) => {
  return {
    type: SAVE_USER_INFO,
    payload: user,
  };
}

export const setDate = (date) => {
  return {
    type: SCHEDULE,
    payload: date,
  };
}

export const input_everything = () => {
  return {
    type: INPUT_DONE,
    payload: true,
  }
}

export const update_region = (region) => {
  return {
    type: UPDATE_REGION,
    payload: region,
  }
}

export const set_suggestion_dest = (suggestion) => {
  return {
    type: SET_SUGGETION_DEST,
    payload: suggestion,
  }
}
export const set_suggestion_pick = (suggestion) => {
  return {
    type: SET_SUGGETION_PICKUP,
    payload: suggestion,
  }
}

export const clearSomethings = () => {
  return {
    type: CLEAR_MAP_DATA,
    payload: null,
  }
}

export const getCurrentLocation = () => {
  return(dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
          console.log("Current pos is "+position);
          dispatch({
            type: GET_USER_LOCATION,
            payload: position
          })
          /*dispatch({
            type: UPDATE_REGION,
            payload: position
          })
          dispatch({type: GET_NAME_OF_LOCATION, payload: address })
          */
        },
      (error) => console.log(error.message),
      {enableHighAccuracy: false,
         timeout: 20000,
         maximumAge: 1000
       }
    )
  }
}


export const get_name_of_loc = (lat, long) => {
  //Required parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: NETWORK, payload: true });
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          var a = responseJson.results;
          var address = a[0].formatted_address;

          dispatch({type: GET_NAME_OF_LOCATION, payload: address })
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: GET_NAME_OF_LOCATION_ERROR, payload: "" });
        }

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: GET_NAME_OF_LOCATION, payload: "" })
      })
  }
}



export const geocodeTheAddress_pickup = (address) => {
  //edRequired parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&region=NG&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: NETWORK, payload: true });
        
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          //dispatch({ type: GEOCODE_ADDRESS_PICKUP, payload: responseJson.results});
          var a = responseJson.results;
          var long_lat = a[0].geometry.location;
          console.log('NEw - Long - Lat - is -'+ JSON.stringify(long_lat));

          dispatch({type: PICKUP_LONG_LAT_RESET, payload: long_lat });
        } else {
          dispatch({ type: ERROR_GEOCODING, payload: responseJson.status });
        }

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: ERROR_GEOCODING, payload: "ERROR GEOCODING" })
      })
  }
}

export const geocodeTheAddress_dest = (address) => {
  //Required parameters
    return(dispatch) => {
    var api_key = "AIzaSyBh4rucFuUaLSmWD2SLoRwxdM3WFQbsyyM";
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&region=NG&key='+api_key, {

      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({ type: NETWORK, payload: true });
        
        let status = responseJson.status;
        if (status === 'OK') {
          //responseJson.predictions.fi
          //dispatch({ type: GEOCODE_ADDRESS_PICKUP, payload: responseJson.results});
          var a = responseJson.results;
          var long_lat = a[0].geometry.location;
          dispatch({type: DROPOFF_LONG_LAT_RESET, payload: long_lat })
          //this.props.navigation.navigate('Profile', {name: 'Lucy'})
          //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
        } else {
          dispatch({ type: ERROR_GEOCODING, payload: responseJson.status });
        }

      })
      .catch((error) => {
        dispatch({ type: NETWORK, payload: false });
        dispatch({ type: ERROR_GEOCODING, payload: "Error geocoding" })
      })
  }
}

function cleanString(input) {
  input = input.replace(/ /g, '-'); // Replaces all spaces with hyphens.

   return input.replace(/[^A-Za-z0-9\-]/g, ''); // Removes special chars.
}

/***** Predictions *****/

export const getAddressPrediction = (input) => {
        return(dispatch) => {
          dispatch({ type: GETTING_PREDICTION, payload: true });
          //dispatch({ type: EMPTY_PREDICTIONS, payload: true });
          
          //Required parameters
          var api_key = "AIzaSyCCcOcMglhvXnRsniygV44jmi5QzMdfyVI";
          fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+cleanString(input)+'&libraries=places&region=NG&language=pt_BR&key='+api_key, {

            method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            })
            .then((response) => response.json())
            .then((responseJson) => {
              dispatch({ type: NETWORK, payload: true });
              dispatch({ type: GETTING_PREDICTION, payload: false });
              
              let status = responseJson.status;
              if (status !== 'ZERO_RESULTS') {
                //responseJson.predictions.fi
                dispatch({ type: GET_SUGGESTIONS, payload: responseJson.predictions });
                //this.props.navigation.navigate('Profile', {name: 'Lucy'})
                //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
              } else {
                dispatch({ type: GET_SUGGESTIONS_EMPTY, payload: responseJson.predictions });
              }

            })
            .catch((error) => {
              dispatch({ type: NETWORK, payload: false });
              dispatch({ type: GET_SUGGESTIONS_EMPTY, payload: "Error" })
            })
        }
      }
    


/***** End ****/







export const loginUser = ({ email, password }) => {
  if (email === '' || password === '') {
      return (dispatch) => {
        dispatch({ type: NO_INPUT, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: LOGIN_USER });
        fetch('http://parcelfast.ng/app/admin/api/user', {

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
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseJson.status;
            if (status === 'success') {
              dispatch({ type: LOGIN_USER_SUCCESS, payload: responseJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: LOGIN_USER_ERROR, payload: responseJson })
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: LOGIN_USER_ERROR, payload: "Error login in" })
          })


    }

  }

};


export const getHistory = (userid) => {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_HISTORY });
        fetch('http://parcelfast.ng/app/admin/api/history', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: userid,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'null') {
              dispatch({ type: FETCH_HISTORY_EMPTY, payload: responseJson });
            } else {
              dispatch({ type: FETCH_HISTORY_GOOD, payload: responseJson });
            }
          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: FETCH_HISTORY_BAD, payload: "Error occured getting history" })
          })
      }
  };


  export const getsupport = () => {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_SUPPORT });
        fetch('http://parcelfast.ng/app/admin/api/support', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             // userid: userid,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'null') {
              dispatch({ type: FETCH_SUPPORT_EMPTY, payload: responseJson });
            } else {
              dispatch({ type: FETCH_SUPPORT_GOOD, payload: responseJson });
            }
          })
          .catch((error) => {
            dispatch({ type: FETCH_SUPPORT_BAD, payload: "Error occured getting history" });
            dispatch({ type: NETWORK, payload: false });
       
          })
      }
  };



  export const getThisHistory = (id) => {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_HISTORY_SINGLE });
        fetch('http://parcelfast.ng/app/admin/api/singlehistory', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            if (responseJson.status === 'null') {
              dispatch({ type: FETCH_HISTORY_EMPTY_SINGLE, payload: responseJson });
            } else {
              dispatch({ type: FETCH_HISTORY_GOOD_SINGLE, payload: responseJson });
              //console.log(JSON.stringify(responseJson));
            }
          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: FETCH_HISTORY_BAD_SINGLE, payload: "History error" })
          })
      }
  };





export const fetchPrice = (vehicle, emergency) => {
  if (vehicle === '' || emergency === '') {
      //return (dispatch) => {
      //  dispatch({ type: NO_INPUT, payload: null });
      //}

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: FETCHING_PRICES });
        fetch('http://parcelfast.ng/app/admin/api/price', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              vehicle: vehicle,
              emergency: emergency,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseJson.status;
            if (status === 'success') {
              dispatch({ type: FETCH_PRICE_GOOD, payload: responseJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
              //dispatch(NavigationActions.navigate({ routeName: 'Map' }));
            } else {
              dispatch({ type: FETCH_PRICE_BAD, payload: responseJson })
            }

          })
          .catch((error) => {
            dispatch({ type: FETCH_PRICE_ERROR, payload: true })
            dispatch({ type: NETWORK, payload: false });
            
          })


    }

  }

};


export const editUser = (fullname, email, tel, password, token, userid) => {
  if ((email === '') || (fullname === '') || (tel === '') || (password === '') || (token === '') || (userid === '')) {
      return (dispatch) => {
        dispatch({ type: EDIT_NO_INPUT, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: EDITTING_USER });
        fetch('http://parcelfast.ng/app/admin/api/edit', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullname: fullname,
              tel: tel,
              email: email,
              password: password,
              token: token,
              userid: userid,
            })
          })
          .then((responsee) => responsee.json())
          .then((responseeJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseeJson.status;
            if (status === 'success') {
              dispatch({ type: EDIT_USER_SUCCESS, payload: responseeJson });
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
            } else {
              dispatch({ type: EDIT_USER_ERROR, payload: responseeJson })
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            dispatch({ type: EDIT_USER_ERROR, payload: "Error editting" })
          })


    }

  }

};


export const getDistance = (pickup, destination) => {

    return (dispatch) => {
        //login user
        dispatch({ type: GETTING_DISTANCE, payload: true });
        var api_keey = "AIzaSyAOV8tYnxNbd37Ds9NmwF6mSjpy78kFdkg";

        fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+pickup+'&destinations='+destination+'&mode=driving&region=NG&fare=NGN&language=en-EN&key='+api_keey, {
          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },

          })
          .then((response) => response.json())
          .then((responseJson) => {
            let status = responseJson.status;
            if (status === 'OK') {
              dispatch({ type: NETWORK, payload: true });
              
              dispatch({ type: DISTANCE_FETCH_SUCCESS, payload: responseJson.rows });
              var a = responseJson.rows;
              var distance = a[0].elements[0].distance.value;
              var time = a[0].elements[0].duration.value;
              dispatch({ type: DISTANCE_FETCH, payload: Math.ceil(Number(distance/1000)) });
              dispatch({ type: TIME_FETCH, payload: Math.ceil(Number(time/60)) });

            } else {
              dispatch({ type: DISTANCE_FETCH_ERROR, payload: responseJson })
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            
            dispatch({ type: DISTANCE_FETCH_ERROR, payload: "Error getting distance" })
          })


    }
};



export const getStaticImage = (route) => {

      return (dispatch) => {
          //login user
          var api_key = "AIzaSyDz8hAJiNiqCVaoNaNcJC8GyxgU_2u6tXA";
          url = 'https://maps.googleapis.com/maps/api/staticmap?size=960x400&path=enc:'+route+'&key='+api_key;

          dispatch({ type: STATIC_IMAGE_SUCCESS, payload: url });

       }
  };





export const calculatePrice = (km, hr, price_per_km, price_per_hr, emergency) => {
  return (dispatch) => {

    dispatch({ type: GETTING_PRICE_ON, payload: price });
    var km_num = Number(km);
    var hr_num = Number(hr);
    var num_price_per_km = Number(price_per_km);
    var num_price_per_hr = Number(price_per_hr);
    var num_emergency = Number(emergency);

    var price = (km_num * num_price_per_km) + (hr_num + num_price_per_hr) + num_emergency;
    dispatch({ type: GETTING_PRICE, payload: price });
    dispatch({ type: STORE_KM, payload: Math.ceil(km_num) });
    dispatch({ type: STORE_HR, payload: Math.ceil(hr_num*60) });
  }
}

export const updateCard = (card) => {
  return {
    type: CARD_UPDATE,
    payload: card,
  }
}

export const StorePrice = (price) => {
  return {
    type: STORE_PRICE,
    payload: price,
  }
}

export const onPayment = (val) => {
  return {
    type: ONPAYMENT,
    payload: val,
  };
};

export const StoreKm = (km) => {
  return {
    type: STORE_KM,
    payload: km,
  }
}
export const StoreHr = (hr) => {
  return {
    type: STORE_HR,
    payload: hr,
  }
}

export const reset = () => {
  return {
    type: RESET,
    payload: null,
  }
}
export const change_type = (val) => {
  return {
    type: CHANGE_TYPE,
    payload: val,
  }
}
export const setEmergency = (data) => {
  return {
    type: EMERGENCY,
    payload: data,
  }
}




//get ROutes


function decode (t,e) {
  for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;
    while(a>=32);
    n=1&i?~(i>>1):i>>1,h=i=0;
    do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}



export const getRoute = (pickup, destination) => {
  return (dispatch) => {
  dispatch({ type: DRAWING_ROUTE });
  const mode = 'driving'; // 'walking';
  //const origin = pickup;
  //const destination = destination;
  const APIKEY = 'AIzaSyAOV8tYnxNbd37Ds9NmwF6mSjpy78kFdkg';
  const url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+pickup+'&destination='+destination+'&region=NG&key='+APIKEY+'&mode='+mode;
  //const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

  fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        dispatch({ type: NETWORK, payload: true });
        
          if (responseJson.routes.length) {
              dispatch({type: DRAW_ROUTE_RAW, payload: responseJson.routes[0].overview_polyline.points });
              dispatch({ type: DRAW_ROUTE, payload: decode(responseJson.routes[0].overview_polyline.points) }); // definition below

          }
      }).catch(e => {
        //console.warn(e);
        dispatch({ type: NETWORK, payload: false });
        
        dispatch({ type: DRAWING_ROUTE_ERROR });

      }
    );
  }
}




export const submitOrder = (user, pickup, destination, emergency, order_info, pickup_coords, dropoff_coords, type, scheduled, amount, km, min, screenshot, base, toll, emergency_cost, vehicle, charge_type, flutterwave_token, transaction_id) => {
  if ((pickup === '') || (destination === '') || (pickup_coords === '') || (dropoff_coords === '') || (amount === 0) || (order_info === '')) {
      return (dispatch) => {
        dispatch({ type: ERROR_OVERALL, payload: null });
      }

  } else {
    return (dispatch) => {
        //login user
        dispatch({ type: EDITTING_USER });
        fetch('http://parcelfast.ng/app/admin/api/submit-orders', {

          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
              pickup: pickup,
              destination: destination,
              emergency: emergency,
              pickup_coords_lat: pickup_coords.lat,
              dropoff_coords_lat: dropoff_coords.lat,
              pickup_coords_lng: pickup_coords.lng,
              dropoff_coords_lng: dropoff_coords.lng,
              type: type,
              scheduled: scheduled,
              amount: amount,
              pickup_tel: order_info.pick_up_tel,
              dropoff_tel: order_info.drop_off_tel,
              pickup_name: order_info.pick_up_name,
              dropoff_name: order_info.drop_off_name,
              extra: order_info.extra,
              km: km,
              min: min,
              screenshot: screenshot,
              base: base,
              toll: toll,
              emergency_cost: emergency_cost,
              vehicle:vehicle,
              charge_type: charge_type,
              flutterwave_token:flutterwave_token,
              transaction_id: transaction_id


            })
          })
          .then((responsee) => responsee.json())
          .then((responseeJson) => {
            dispatch({ type: NETWORK, payload: true });
            
            let status = responseeJson.status;
            if (status === 'Successful') {
              dispatch({ type: ORDER_SUBMIT_SUCCESS, payload: responseeJson });
              console.log(JSON.stringify(responseeJson));
              //this.props.navigation.navigate('Profile', {name: 'Lucy'})
            } else {
              dispatch({ type: ERROR_OVERALL, payload: responseeJson });
              console.log(JSON.stringify(responseeJson));
            }

          })
          .catch((error) => {
            dispatch({ type: NETWORK, payload: false });
            
            
            dispatch({ type: ERROR_OVERALL, payload: "error submitting order" })
          })
        }

  }

};

export const getCard = (user) => {
  //var array = card.expiry.split('/');
  return (dispatch) => {
      //login user
      fetch('http://parcelfast.ng/app/admin/api/get-card', {
        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.has_card) {
            dispatch({ type: CARD_EXIST, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          } else {
            dispatch({ type: NO_CARD, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          
          dispatch({ type: ERROR_GETTING_CARD, payload: "An error occured while getting card" })
        })
    }
};


export const verifyCard = (card, user) => {
  //var array = card.expiry.split('/');
  return (dispatch) => {
      //login user
      dispatch({ type: VERYFYING_CARD });
      fetch('http://parcelfast.ng/app/admin/api/tokenize', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            number: card.values.number,
            expiry: card.values.expiry,
            cvc: card.values.cvc,
            name: card.values.name,
            user: user,
            type: card.values.type
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.status !== 'success') {
            dispatch({ type: BAD_VERIFY, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          } else {
            dispatch({ type: GOOD_VERIFY, payload: responseJson });
            console.log(JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          
          dispatch({ type: ERROR_VERIFY, payload: "An error occured while verifying card" })
        })
    }
};

export const getNewMatch = (id) => {
  return (dispatch) => {
      //login user
      //dispatch({ type: FETCHING_HISTORY_SINGLE });
      fetch('http://parcelfast.ng/app/admin/api/new-order', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.status === 'null') {
            dispatch({ type: NO_NEW_MATCH, payload: true });
            console.log(JSON.stringify(responseJson));
          } else {
            dispatch({ type: MATCH_ALERT, payload: responseJson });
            dispatch({ type: NO_NEW_MATCH, payload: false });
            console.log(JSON.stringify(responseJson));
          }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          dispatch({ type: MATCH_ALERT_ERROR, payload: "An error occured while getting match background" })
        })
    }
};

export const getDriver = (id) => {
  return (dispatch) => {
      //login user
      dispatch({ type: CONNECTING_DRIVER, payload: "Connecting you to an available driver!" });
      fetch('http://parcelfast.ng/app/admin/api/driver', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          if (responseJson.status === 'null') {
            dispatch({ type: NO_DRIVER, payload: "NO DRIVER IS AVAILABLE AT THE MOMENT :(" });
             } else {
            dispatch({ type: DRIVER_AVAILABLE, payload: responseJson });
             }
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          dispatch({ type: ERROR_NETWORK_DRIVER, payload: "AN ERROR OCCURED. PROBABLY YOUR NETWORK" })
        })
    }
};



export const onChangeToken = (user, token) => {
  return (dispatch) => {
      //login user
      dispatch({ type: CHANGE_TOKEN, payload: token });
      fetch('http://parcelfast.ng/app/admin/api/fcm-change-token', {

        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
            token: token,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({ type: NETWORK, payload: true });
          
          console.log("Good!");
        })
        .catch((error) => {
          dispatch({ type: NETWORK, payload: false });
          //dispatch({ type: ERROR_NETWORK_DRIVER, payload: "AN ERROR OCCURED. PROBABLY YOUR NETWORK" })
        })
    }
};
