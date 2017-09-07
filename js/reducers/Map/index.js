import {
  DESTINATION_INPUT,
  SELECT_VEHICLE,
  GET_USER_LOCATION,
  HOVER_ON_DESTINATION,
  PICKUP_INPUT,
  LOGIN_USER_SUCCESS,
  INPUT_DONE,
  GET_NAME_OF_LOCATION,
  GET_NAME_OF_LOCATION_ERROR,
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
  EDIT_NO_INPUT,
  EDITTING_USER,
  EDIT_USER_ERROR,
  EDIT_USER_SUCCESS,
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
  FETCHING_HISTORY_SINGLE,
  FETCH_HISTORY_GOOD_SINGLE,
  FETCH_HISTORY_EMPTY_SINGLE,
  FETCH_HISTORY_BAD_SINGLE,
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
} from '../../actions/types';

import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const INITIAL_STATE =
  {
    destination: '',
    pickup: '',
    hoveron: false,
    userLocation: null,
    vehicle: 'scooter',
    input_done: false,
    loading: false,
    error: '',
    latitude: 6.4549,
    longitude: 3.4246,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    user: null,
    status: false,
    region: {},
    location_name: '',
    current_hover: '',
    predictions: null,
    prediction_error: '',
    pickup_location: '',
    destination_location: '',
    error_geoecoding: '',
    fetching_prices: false,
    per_km: 0,
    per_hr: 0,
    emergency_cost: 0,
    toll_gate: 0,
    base_price: 0,
    fetch_error: '',
    emergency: false,
    edit_progress: false,
    edit_error: '',
    edit_success: false,
    getting_distance: false,
    distance_info: {},
    distance_error: false,
    estimated_price: null,
    distanceInKM: 0,
    distanceInHR: 0,
    route: [],
    route_set: false,
    pickup_coords: {},
    dropoff_coords: {},
    type: 'normal',
    order_info: {
      drop_off_name: '',
      drop_off_tel: '',
      extra: '',
    },
    prices: {
      base_price: null,
      per_km:null,
      per_hr: null,
    },
    proceed: false,
    order_success: false,
    error_submitting_order: false,
    scheduled: null,
    done: false,
    history: {},
    //history_single,
    fetching: false,
    history_empty: false,
    history_error: false,
    screenshot: null,
    raw: null,
    selected: null,
    history_single: null,
    history_empty_single: null,
    match_alert: null,
    no_new_match: true,
    match_error: '',
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case MATCH_ALERT:
      return { ...state, match_alert: action.payload };
    case MATCH_ALERT_ERROR:
      return { ...state, match_error: action.payload };
    case NO_NEW_MATCH:
      return { ...state, no_new_match: action.payload };
    case DESTINATION_INPUT:
      return { ...state,
        current_hover: 'destination',
        destination: action.payload };
    case SCHEDULE:    
        return { ...state, scheduled: action.payload, type: 'scheduled'  };
    case SELECT_VEHICLE:
      return { ...state, vehicle: action.payload };
    case HOVER_ON_DESTINATION:
      return { ...state, hoveron: true, route_set: false };
    case PICKUP_INPUT:
      return { ...state,
        pickup: action.payload,
        predictions: null,
        current_hover: 'pickup',
      };
    case LOGIN_USER_SUCCESS:
      return { ...state,
            ...INITIAL_STATE,
             user: action.payload,
             status: true,
           };
    case INPUT_DONE:
      return {...state, hoveron: false, input_done: true };
    case GET_USER_LOCATION:
     return {
       ...state,
         latitude: action.payload.coords.latitude,
         longitude: action.payload.coords.longitude,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,

         region: {
           latitude: action.payload.coords.latitude,
           longitude: action.payload.coords.longitude,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         }

       };
    case GET_NAME_OF_LOCATION:
      return { ...state,
        location_name: action.payload,
        pickup: action.payload,
        //pickup: action.payload,
      };
    case SAVE_USER_INFO:
      return { ...state, user: action.payload };
    case GET_NAME_OF_LOCATION_ERROR:
    return { ...state,
      location_name: action.payload,
      pickup: action.payload,
      //pickup: action.payload,
    };
    case UPDATE_REGION:
      return { ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta,
        region: action.payload,
    };
    case GET_SUGGESTIONS:
      return { ...state, predictions: action.payload };
    case GET_SUGGESTIONS_EMPTY:
      return {...state,
              predictions: {},
              prediction_error: "no location found"
            };
    case SET_SUGGETION_PICKUP:
      return { ...state,
              pickup: action.payload,
            };
    case SET_SUGGETION_DEST:
      return { ...state,
              destination: action.payload,
            };
    case GEOCODE_ADDRESS_PICKUP:
      return {
              ...state,
              pickup_location: action.payload,
            };
    case GEOCODE_ADDRESS_DEST:
      return {
            ...state,
            destination_location: action.payload,
          };
    case ERROR_GEOCODING:
        return {
            ...state,
            error_geoecoding: 'Error geocoding data',
          };

  case FETCHING_PRICES:
          return { ...state,
            fetching_prices: true
          };
    case FETCH_PRICE_GOOD:
          return { ...state,
            per_km: action.payload.per_km,
            per_hr: action.payload.per_hr,
            emergency_cost: action.payload.emergency,
            toll_gate: action.payload.toll_gate,
            base_price: action.payload.base_price,
            prices: action.payload,
            fetch_error: "",
          };
    case FETCH_PRICE_BAD:
          return {
            ...state,
            per_km: action.payload.per_km,
            per_hr: action.payload.per_hr,
            emergency_cost: action.payload.emergency,
            toll_gate: action.payload.toll_gate,
            base_price: action.payload.base_price,
            fetch_error: "error fetching price",
          };
    case SAVE_STATE:
          return {
            ...state,
            order_info: action.payload,
            edit_error: '',
            proceed: true,
    };
    case EDIT_NO_INPUT:
        return { ...state, edit_error: 'All inputs are required' };
    case EDITTING_USER:
        return {...state,
          edit_error: '',
          edit_progress: true };
    case EDIT_USER_ERROR:
        return {...state,
          edit_success: false,
           edit_progress: false,
          edit_error: action.payload.status };
    case EDIT_USER_SUCCESS:
        return {...state,
            edit_success: true,
            edit_progress: false,
            user: action.payload,
            edit_error: '',
           };

    case GETTING_DISTANCE:
      return { ...state, getting_distance: true };
    case DISTANCE_FETCH_SUCCESS:
      return { ...state,
        distance_info: action.payload
       };
    case DISTANCE_FETCH_SUCCESS:
      return { ...state,
        distance_info: action.payload,
        distance_error: true,
      };
    case GETTING_PRICE:
      return { ...state,
        estimated_price: action.payload };
    case STORE_PRICE:
      return {...state, estimated_price: action.payload };
    case STORE_KM:
      return {...state, distanceInKM: action.payload };
    case STORE_HR:
        return {...state, distanceInHR: action.payload };
    case DRAW_ROUTE:
        return { ...state, route: action.payload, route_set: true };
    case DRAWING_ROUTE:
        return { ...state, route: action.payload};
    case DRAWING_ROUTE_ERROR:
        return { ...state, route: action.payload };
    case PICKUP_LONG_LAT_RESET:
        return { ...state,
          latitude: action.payload.lat,
          longitude: action.payload.lng,
          pickup_coords: action.payload,

    };
    case DISTANCE_FETCH:
      return { ...state, distanceInKM: action.payload };
    case TIME_FETCH:
      return { ...state,  distanceInHR: action.payload };
    case DROPOFF_LONG_LAT_RESET:
    return { ...state,
      dropoff_coords: action.payload,
    };
    case ORDER_SUBMIT_SUCCESS:
        return { ...state, order_success: true,
           error_submitting_order: false,
           edit_progress: false,
          };
    case ERROR_OVERALL:
      return { ...state,
        edit_progress: false,
        error_submitting_order: true };
    case RESET:
      return { ...state, error_submitting_order: false };
    case CLEAR_MAP_DATA:
      return { ...state,
        destination: '',
        pickup: '',
        hoveron: false,
        distance_info: {},
        route_set: false,
        destination: '',
        pickup: '',
        per_km: 0,
        distanceInHR: 0,
        distanceInKM: 0,
        raw: null,
        base_price: '',
        per_hr: 0,
        route: [],
        done: false,
        estimated_price: null,
        pickup_coords: {},
        dropoff_coords: {},
        order_info: {},
        order_success: false,
        error_submitting_order: false,
        done: true,
        proceed: false,
        screenshot: null,
        order_success: false,
        raw: null,
        selected: null,
        
      };
    case SCREEN_SHOT: 
      return {...state, screenshot: action.payload };
     
    case DRAW_ROUTE_RAW: 
      return { ...state, raw: action.payload };
    case STATIC_IMAGE_SUCCESS:
      return { ...state, screenshot: action.payload };
    case STATIC_IMAGE_ERROR:  
      return { ...state, screenshot: action.payload };
    case FETCHING_HISTORY:
      return { ...state, fetching: true };
    case FETCH_HISTORY_GOOD:
      return { ...state, history: action.payload };
    case FETCH_HISTORY_EMPTY:
      return { ...state, history_empty: true };
    case FETCH_HISTORY_BAD:
      return { ...state, history_error: true };
    case FETCHING_HISTORY_SINGLE:
      return { ...state, fetching: true };
    case FETCH_HISTORY_GOOD_SINGLE:
      return { ...state, history_single: action.payload };
    case FETCH_HISTORY_EMPTY_SINGLE:
      return { ...state, history_empty_single: true };
    case FETCH_HISTORY_BAD_SINGLE:
      return { ...state, history_error: true };
    case SELECT_HISTORY:
      return { ...state, selected: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
          return state;
    }
  console.log(state);
}
