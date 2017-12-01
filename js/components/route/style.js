const React = require("react-native");
import { Dimensions } from "react-native";
var { width, height } = Dimensions.get('window');
const { StyleSheet } = React;

export default {
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFF',
  },
  menubar: {
    position: 'absolute',
    left: 20,
    top: 30,
  },
  delivery: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  map: {
    flex: 1,
    backgroundColor: '#CCC',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    shadowColor: '#888',
    borderColor:  '#CCC',
    borderBottomWidth: 3,
    shadowOffset:{ width: 5, height: 5},
    shadowOpacity:0.7,
  },
  checks: {
    flex: 0.6,
    backgroundColor: '#FFF',
    elevation: 1,


  },
  okayokay: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    left: 0,
    right: 0,
    //alignItems: 'center',
    justifyContent: 'space-between',

  },

  okayokayyy: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFF',
    borderTopWidth:1,
    borderTopColor: '#777',
    zIndex: 1000,
    top: height/2.7,
    bottom:0,
    left: 0,
    right: 0,
    height: 190,
    //alignItems: 'center',
    justifyContent: 'space-between',

  },
  iconss: {
    margin: 5,
    padding: 5,
    width: '100%',
    flexDirection: "row",
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
  },
  iconssRoute: {
    margin: 30,
    padding: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#009AD5',
    width: "70%",
    padding: 10,
  },
  continue: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 15,
  },
  continueText: {
    color: '#FFF',
  },
  search: {
    zIndex: 100,
    marginTop: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: "#007AFF",
  },
  container: {
      zIndex: 1,
  },
    hoverbar: {
      position: 'absolute',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      zIndex: 1,
    },
    target: {
      flex: 1,
    },
    square: {
      position: 'absolute',
      width: 6,
      height: 6,
      backgroundColor: 'black',
      zIndex: 2,
    },
    dot: {
      position: 'absolute',
      width: 6,
      height: 6,
      borderRadius: 6 / 2,
      backgroundColor: '#A4A4AC',
      zIndex: 2,
    },
    destinationBox: {
      position: 'absolute',
      backgroundColor: '#EDEDED',
      borderRadius: 4,
      zIndex: 3,
      left: 20,
      top: 40,
    },
    destinationText: {
      position: 'absolute',
      left: 20,
      top: 40,
      zIndex: 4,
      backgroundColor: 'transparent',
    },
    sourceText: {
      position: 'absolute',
      zIndex: 4,
      color: '#525760',
      backgroundColor: 'transparent',
    },
    sourceBox: {
      position: 'absolute',
      backgroundColor: '#F9F9F9',
      borderRadius: 4,
      zIndex: 3,
    },
    verticalBar: {
      position: 'absolute',
      height: 28,
      width: 1,
      backgroundColor: '#A4A4AC',
      zIndex: 2,
    },
    input: {
      //flex: 1,
      color: 'black',
      backgroundColor: 'transparent',
      zIndex: 10,
      fontSize: 15,
      paddingHorizontal: 10,
      left: 20,
      top: 40,
      position: 'absolute',
    },
    welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


};
